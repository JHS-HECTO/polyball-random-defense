import Phaser from 'phaser';
import {
  COLORS,
  FIELD,
  FIELD_CENTER_X,
  FIELD_CENTER_Y,
  GAME_HEIGHT,
  GAME_WIDTH,
  PLACE_AREA,
  TRACK,
  TRACK_WAYPOINTS,
} from 'config/game';
import { registry } from 'systems/registry';
import { GameState } from 'systems/gameState';
import { ProjectilePool } from 'systems/projectilePool';
import { UnitEntity } from 'entities/UnitEntity';
import { EnemyEntity } from 'entities/EnemyEntity';
import { Hud } from 'ui/Hud';

const GRADE_PROJ_COLOR: Record<string, number> = {
  common: 0x9aa5b1,
  rare: 0x4da3ff,
  epic: 0xb05cff,
  legendary: 0xffb020,
  hidden: 0xff4d8d,
};

const UNIT_MIN_GAP = 46; // 유닛 겹침 방지 최소 간격

export class GameScene extends Phaser.Scene {
  private hud!: Hud;
  private state!: GameState;
  private projectiles!: ProjectilePool;

  private units: UnitEntity[] = [];
  private enemies: EnemyEntity[] = [];

  private track!: Phaser.Curves.Path;
  private trackLen = 1;

  // 웨이브 (타임드)
  private waveTimeLeft = 0;
  private spawnTimer = 0;
  private spawnInterval = 1000;
  private isGameOver = false;

  // 보스전
  private bossActive = false;
  private bossTimeLeft = 0;
  private bossRef: EnemyEntity | null = null;

  // 드래그/선택
  private draggingUnit: UnitEntity | null = null;
  private dragMoved = false;
  private selectedUnit: UnitEntity | null = null;

  constructor() {
    super({ key: 'Game' });
  }

  create(): void {
    this.state = new GameState();
    this.projectiles = new ProjectilePool(this);
    this.units = [];
    this.enemies = [];
    this.isGameOver = false;
    this.selectedUnit = null;

    this.buildTrack();
    this.drawBackground();
    this.drawField();
    this.drawTrack();
    this.attachInput();

    this.hud = new Hud(this);
    this.hud.mount();
    this.hud.setOnSummon(() => this.trySummon());

    this.startWave(1);
    this.publishHud();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.hud.destroy();
      this.projectiles.clear();
    });
  }

  override update(time: number, delta: number): void {
    if (this.isGameOver) return;
    const dt = delta / 1000;

    // 유닛 idle + 전투 (지원유닛은 공격 안 함)
    for (const u of this.units) {
      if (u === this.draggingUnit) continue;
      u.tickIdle(time, delta);
      if (u.isSupport) continue;
      // buffer 공속 버프 반영
      u.cooldownLeft -= delta * u.spdBuffMul;
      if (u.cooldownLeft <= 0) {
        const target = this.pickTarget(u);
        if (target) {
          this.unitAttack(u, target);
          u.cooldownLeft = u.atkSpeed * 1000;
        }
      }
    }

    // 지원 유닛 효과 적용 (buff/slow) — 매 프레임 재계산
    this.applySupportEffects();

    // 적 트랙 순환
    for (const e of this.enemies) {
      if (!e.alive) continue;
      e.trackDist += e.speed * dt;
      const t = (((e.trackDist % this.trackLen) + this.trackLen) % this.trackLen) / this.trackLen;
      const p = this.track.getPoint(t);
      const p2 = this.track.getPoint((t + 0.01) % 1);
      const heading = Math.atan2(p2.y - p.y, p2.x - p.x);
      e.applyTrackTransform(p.x, p.y, heading, time);
      e.tick(delta, time);
    }

    // healer 회복 (주변 적 hp 회복)
    this.applyHealers(dt);

    this.projectiles.update(delta);

    // 일반몹 스폰 — 보스전에도 계속 (보스는 보스대로, 몹은 몹대로)
    this.spawnTimer -= delta;
    if (this.spawnTimer <= 0) {
      this.spawnEnemy();
      this.spawnTimer = this.spawnInterval;
    }

    if (this.bossActive) {
      // 보스전: 제한시간 내 보스 처치 못하면 게임오버. 몹은 위에서 계속 스폰됨.
      this.bossTimeLeft -= delta;
      if (this.bossTimeLeft <= 0) {
        this.gameOver('boss_timeout');
      }
    } else {
      // 일반 웨이브: 시간 다 가면 다음 웨이브
      this.waveTimeLeft -= delta;
      if (this.waveTimeLeft <= 0) {
        this.nextWave();
      }
    }

    // 게임오버 (생존 몹 100) — 보스전/일반 공통
    if (this.aliveEnemyCount() >= registry.config.gameOverMobCount) {
      this.gameOver('mob_overflow');
    }

    this.publishHud();
  }

  // ─── 그리기 ───────────────────────────────

  private drawBackground(): void {
    // 캔버스 전체 타일 (가장자리 dark 방지)
    const size = 64;
    for (let y = 0; y < GAME_HEIGHT; y += size) {
      for (let x = 0; x < GAME_WIDTH; x += size) {
        this.add.image(x, y, 'tile-grass').setOrigin(0, 0).setDepth(0);
      }
    }
  }

  private drawField(): void {
    const g = this.add.graphics();
    g.setDepth(2);
    g.lineStyle(3, COLORS.fieldBorder, 0.8);
    g.strokeRoundedRect(FIELD.left, FIELD.top, FIELD.right - FIELD.left, FIELD.bottom - FIELD.top, 14);
    // 배치영역 (트랙 안쪽) 가이드 — 유닛은 여기만 배치
    const pa = this.add.graphics();
    pa.setDepth(6);
    pa.fillStyle(0x3dd68c, 0.04);
    pa.fillRoundedRect(PLACE_AREA.left - 10, PLACE_AREA.top - 10, PLACE_AREA.right - PLACE_AREA.left + 20, PLACE_AREA.bottom - PLACE_AREA.top + 20, 12);
    pa.lineStyle(1.5, 0x3dd68c, 0.25);
    pa.strokeRoundedRect(PLACE_AREA.left - 10, PLACE_AREA.top - 10, PLACE_AREA.right - PLACE_AREA.left + 20, PLACE_AREA.bottom - PLACE_AREA.top + 20, 12);
    const t = this.add.text(FIELD_CENTER_X, PLACE_AREA.top - 22, '배치 구역', {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '11px',
      color: '#3dd68c',
    });
    t.setOrigin(0.5);
    t.setDepth(6);
    t.setAlpha(0.5);
  }

  private buildTrack(): void {
    const wp = TRACK_WAYPOINTS;
    const head = wp[0]!;
    this.track = new Phaser.Curves.Path(head.x, head.y);
    for (let i = 1; i < wp.length; i += 1) {
      const p = wp[i]!;
      this.track.lineTo(p.x, p.y);
    }
    this.track.lineTo(head.x, head.y);
    this.trackLen = this.track.getLength();
  }

  private drawTrack(): void {
    const w = 44;
    const line = this.add.graphics();
    line.setDepth(3);
    line.lineStyle(w, 0x2a3340, 0.55);
    this.track.draw(line, 64);
    const guide = this.add.graphics();
    guide.setDepth(3);
    guide.lineStyle(2, 0xff8a3d, 0.35);
    const pts = this.track.getPoints(120);
    for (let i = 0; i < pts.length; i += 4) {
      const a = pts[i];
      const b = pts[i + 1];
      if (!a || !b) continue;
      guide.beginPath();
      guide.moveTo(a.x, a.y);
      guide.lineTo(b.x, b.y);
      guide.strokePath();
    }
    const arrowG = this.add.graphics();
    arrowG.setDepth(3);
    arrowG.fillStyle(0xff8a3d, 0.55);
    for (const tt of [0.12, 0.37, 0.62, 0.87]) {
      const p = this.track.getPoint(tt);
      const p2 = this.track.getPoint((tt + 0.01) % 1);
      const ang = Math.atan2(p2.y - p.y, p2.x - p.x);
      this.drawArrow(arrowG, p.x, p.y, ang);
    }
  }

  private drawArrow(g: Phaser.GameObjects.Graphics, x: number, y: number, ang: number): void {
    const size = 9;
    const tx = x + Math.cos(ang) * size;
    const ty = y + Math.sin(ang) * size;
    const lx = x + Math.cos(ang + 2.4) * size;
    const ly = y + Math.sin(ang + 2.4) * size;
    const rx = x + Math.cos(ang - 2.4) * size;
    const ry = y + Math.sin(ang - 2.4) * size;
    g.fillTriangle(tx, ty, lx, ly, rx, ry);
  }

  // ─── 소환 / 배치 ───────────────────────────────

  private trySummon(): void {
    if (this.isGameOver) return;
    const cost = this.state.summonCost;
    if (this.units.length >= registry.config.maxUnits) {
      this.hud.flashMessage('유닛이 가득 찼습니다');
      return;
    }
    if (!this.state.canAfford(cost)) {
      this.hud.flashMessage('골드가 부족합니다');
      return;
    }
    this.state.spend(cost);
    this.state.purchases += 1;
    const def = registry.rollRandomUnit();
    // 대기 위치 = 필드 중앙 빈 자리 (겹침 회피)
    const pos = this.findHoldingSpot();
    const u = new UnitEntity(this, pos.x, pos.y, def, cost);
    u.placed = true;
    u.setDepth(10);
    u.playSpawn();
    this.units.push(u);
    this.hud.flashMessage(`${def.name} (${def.grade})`);
    this.publishHud();
  }

  // 배치영역(트랙 안쪽) 내 겹치지 않는 자리 (나선형)
  private findHoldingSpot(): { x: number; y: number } {
    const cx = FIELD_CENTER_X;
    const cy = FIELD_CENTER_Y;
    for (let r = 0; r < 200; r += 22) {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (!this.inPlaceArea(x, y)) continue;
        if (!this.overlapsUnit(x, y, null)) return { x, y };
      }
    }
    return { x: cx, y: cy };
  }

  private inPlaceArea(x: number, y: number): boolean {
    return x >= PLACE_AREA.left && x <= PLACE_AREA.right && y >= PLACE_AREA.top && y <= PLACE_AREA.bottom;
  }

  private overlapsUnit(x: number, y: number, except: UnitEntity | null): boolean {
    for (const u of this.units) {
      if (u === except) continue;
      const dx = u.x - x;
      const dy = u.y - y;
      if (dx * dx + dy * dy < UNIT_MIN_GAP * UNIT_MIN_GAP) return true;
    }
    return false;
  }

  // 배치영역(트랙 안쪽 사각)으로 clamp — 길/트랙 진입 차단
  private clampToField(x: number, y: number): { x: number; y: number } {
    return {
      x: Phaser.Math.Clamp(x, PLACE_AREA.left, PLACE_AREA.right),
      y: Phaser.Math.Clamp(y, PLACE_AREA.top, PLACE_AREA.bottom),
    };
  }

  // ─── 입력 (드래그/탭/판매) ───────────────────────────────

  private attachInput(): void {
    this.input.dragDistanceThreshold = 4;
    this.input.topOnly = true; // 겹친 유닛 중 최상단 1개만 (정확한 선택)

    // 유닛 누름 = 즉시 선택(하이라이트+판매바). threshold 무관 항상 발생.
    this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      this.selectUnit(obj);
    });

    this.input.on(Phaser.Input.Events.DRAG_START, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      this.draggingUnit = obj;
      this.dragMoved = false;
      obj.setDepth(40);
      obj.setRangeVisible(true);
    });

    this.input.on(Phaser.Input.Events.DRAG, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, x: number, y: number) => {
      if (!(obj instanceof UnitEntity)) return;
      this.dragMoved = true;
      obj.setPosition(x, y); // 손가락 그대로 따라옴
    });

    this.input.on(Phaser.Input.Events.DRAG_END, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      const u = obj;
      u.setDepth(10);
      this.draggingUnit = null;
      u.setRangeVisible(false);
      if (!this.dragMoved) return; // 안 움직였으면 선택만 (GAMEOBJECT_DOWN에서 처리)
      // 배치영역 clamp + 겹침 회피
      const c = this.clampToField(u.x, u.y);
      u.setPosition(c.x, c.y);
      if (this.overlapsUnit(u.x, u.y, u)) {
        const free = this.findNearbyFree(u.x, u.y, u);
        u.setPosition(free.x, free.y);
      }
      // 놓으면 하이라이트/판매바 해제
      this.deselect();
    });

    // 빈 공간 탭 → 선택 해제
    this.input.on(Phaser.Input.Events.POINTER_DOWN, (_p: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
      const overUnit = currentlyOver.some((o) => o instanceof UnitEntity);
      if (!overUnit) this.deselect();
    });
  }

  private findNearbyFree(x: number, y: number, except: UnitEntity): { x: number; y: number } {
    for (let r = UNIT_MIN_GAP; r < 200; r += 16) {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        const nx = x + Math.cos(a) * r;
        const ny = y + Math.sin(a) * r;
        const c = this.clampToField(nx, ny);
        if (!this.overlapsUnit(c.x, c.y, except)) return c;
      }
    }
    return this.clampToField(x, y);
  }

  private selectUnit(u: UnitEntity): void {
    this.deselect();
    this.selectedUnit = u;
    u.setSelected(true);
    this.openUnitPanel(u);
  }

  // 정보 패널 빌드 (업그레이드 후 갱신에도 재사용)
  private openUnitPanel(u: UnitEntity): void {
    const roleCfg = registry.config.roles[u.def.role];
    const gColor = registry.config.gradeColors[u.def.grade];
    const gLabel = registry.config.gradeLabels[u.def.grade];
    const statLine = u.isSupport
      ? `${roleCfg.badge} ${roleCfg.label} · 범위 ${Math.round(u.supportRadius())}`
      : `${roleCfg.badge} ${roleCfg.label} · ⚔${u.atk} · 사거리 ${u.range} · 공속 ${(1 / u.atkSpeed).toFixed(1)}/s`;
    const cost = u.upgradeCostNext();
    this.hud.showUnitInfo(
      {
        name: u.def.name,
        gradeLabel: gLabel,
        gradeColor: gColor,
        statLine,
        desc: roleCfg.desc,
        refund: u.sellRefund(),
        level: u.level,
        maxLevel: u.maxLevel(),
        canUpgrade: u.canUpgrade(),
        upgradeCost: cost,
        affordable: this.state.canAfford(cost),
        isSupport: u.isSupport,
      },
      () => {
        if (this.selectedUnit) this.sellUnit(this.selectedUnit);
      },
      () => {
        if (this.selectedUnit) this.tryUpgrade(this.selectedUnit);
      },
    );
  }

  private tryUpgrade(u: UnitEntity): void {
    if (!u.canUpgrade()) return;
    const cost = u.upgradeCostNext();
    if (!this.state.canAfford(cost)) {
      this.hud.flashMessage('골드 부족');
      return;
    }
    this.state.spend(cost);
    u.investedGold += cost;
    u.applyUpgrade();
    this.spawnFloatText(u.x, u.y - 24, `Lv${u.level}!`, '#ffe08a');
    this.openUnitPanel(u); // 패널 갱신 (atk·다음비용·MAX)
    this.publishHud();
  }

  private deselect(): void {
    if (this.selectedUnit) {
      this.selectedUnit.setSelected(false);
      this.selectedUnit = null;
    }
    this.hud.hideSellBar();
  }

  private sellUnit(u: UnitEntity): void {
    const refund = u.sellRefund();
    this.state.earn(refund);
    const idx = this.units.indexOf(u);
    if (idx >= 0) this.units.splice(idx, 1);
    if (this.selectedUnit === u) this.deselect();
    this.spawnFloatText(u.x, u.y, `+${refund}`, '#3dd68c');
    u.destroy();
    this.hud.flashMessage(`판매 +${refund}G`);
    this.publishHud();
  }

  // ─── 지원 효과 (buffer/slower) ───────────────────────────────

  private applySupportEffects(): void {
    // 1) buffer → 범위 내 공격유닛 atk/spd 버프 (합연산, cap)
    const buffers = this.units.filter((u) => u.supportKind === 'buff');
    const slowers = this.units.filter((u) => u.supportKind === 'slow');
    const cap = registry.config.support.buffCap;

    for (const u of this.units) {
      if (u.isSupport) continue;
      let atkM = 1;
      let spdM = 1;
      for (const b of buffers) {
        const eff = registry.bufferEffect(b.def.grade);
        const dx = b.x - u.x;
        const dy = b.y - u.y;
        if (dx * dx + dy * dy <= eff.radius * eff.radius) {
          atkM += eff.atkPct;
          spdM += eff.spdPct;
        }
      }
      u.atkBuffMul = Math.min(cap, atkM);
      u.spdBuffMul = Math.min(cap, spdM);
    }

    // 2) slower → 범위 내 적 둔화 (가장 강한 1개만)
    for (const e of this.enemies) {
      if (!e.alive) continue;
      let maxSlow = 0;
      for (const s of slowers) {
        const eff = registry.slowerEffect(s.def.grade);
        const dx = s.x - e.x;
        const dy = s.y - e.y;
        if (dx * dx + dy * dy <= eff.radius * eff.radius) {
          if (eff.slowPct > maxSlow) maxSlow = eff.slowPct;
        }
      }
      if (maxSlow > 0) e.applySlow(maxSlow);
      else e.clearSlow();
    }
  }

  private applyHealers(dtSec: number): void {
    const healers = this.enemies.filter((e) => e.alive && e.kind === 'healer');
    if (healers.length === 0) return;
    const cfg = registry.config.enemyTypes.healer;
    const radius = cfg.healRadius ?? 90;
    const heal = (cfg.healPerSec ?? 10) * dtSec;
    const r2 = radius * radius;
    for (const h of healers) {
      for (const e of this.enemies) {
        if (!e.alive || e === h) continue;
        const dx = h.x - e.x;
        const dy = h.y - e.y;
        if (dx * dx + dy * dy <= r2) e.heal(heal);
      }
    }
  }

  // ─── 전투 ───────────────────────────────

  private pickTarget(u: UnitEntity): EnemyEntity | null {
    const r2 = u.range * u.range;
    let best: EnemyEntity | null = null;
    let bestD = Infinity;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const dx = e.x - u.x;
      const dy = e.y - u.y;
      const d = dx * dx + dy * dy;
      if (d <= r2 && d < bestD) {
        bestD = d;
        best = e;
      }
    }
    return best;
  }

  private unitAttack(u: UnitEntity, target: EnemyEntity): void {
    u.playAttack(target.x, target.y);
    const mult = registry.elementMultiplier(u.def.element, target.def.element);
    const dmg = Math.round(u.atk * u.atkBuffMul * mult);
    const eid = target.eid;
    const splashR = u.splashRadius;
    const splashFrac = u.splashFrac;
    this.projectiles.fire({
      x: u.x,
      y: u.y,
      targetEid: eid,
      getTarget: () => {
        const e = this.enemies.find((en) => en.eid === eid);
        return e && e.alive ? { x: e.x, y: e.y, alive: e.alive } : null;
      },
      damage: dmg,
      color: GRADE_PROJ_COLOR[u.def.grade] ?? 0xffffff,
      speed: u.projSpeed,
      size: u.projSize,
      onHit: (d, hx, hy) => {
        this.damageEnemy(eid, d, mult > 1);
        // 광역(splasher): 적중 지점 반경 내 추가 피해 + 폭발 이펙트
        if (splashR > 0) {
          this.splashDamage(hx, hy, splashR, Math.round(u.atk * splashFrac * mult), eid);
          this.splashFx(hx, hy, splashR, GRADE_PROJ_COLOR[u.def.grade] ?? 0xffffff);
        }
      },
    });
  }

  private splashDamage(cx: number, cy: number, radius: number, dmg: number, exceptEid: number): void {
    const r2 = radius * radius;
    for (const e of [...this.enemies]) {
      if (!e.alive || e.eid === exceptEid) continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      if (dx * dx + dy * dy <= r2) {
        const dead = e.takeDamage(dmg);
        this.spawnFloatText(e.x, e.y - 14, String(dmg), '#ff8a3d');
        if (dead) this.killEnemy(e);
      }
    }
  }

  private splashFx(cx: number, cy: number, radius: number, color: number): void {
    const g = this.add.graphics();
    g.setDepth(22);
    const s = { r: 8, a: 0.6 };
    this.tweens.add({
      targets: s,
      r: radius,
      a: 0,
      duration: 280,
      ease: 'Cubic.easeOut',
      onUpdate: () => {
        g.clear();
        g.fillStyle(color, s.a * 0.5);
        g.fillCircle(cx, cy, s.r);
        g.lineStyle(3, color, s.a);
        g.strokeCircle(cx, cy, s.r);
      },
      onComplete: () => g.destroy(),
    });
  }

  private damageEnemy(eid: number, dmg: number, super_: boolean): void {
    const e = this.enemies.find((en) => en.eid === eid);
    if (!e || !e.alive) return;
    const dead = e.takeDamage(dmg);
    this.spawnFloatText(e.x, e.y - 16, super_ ? `${dmg}!` : String(dmg), super_ ? '#ffb020' : '#ffffff');
    if (dead) this.killEnemy(e);
  }

  private spawnFloatText(x: number, y: number, txt: string, color: string): void {
    const t = this.add.text(x + (Math.random() - 0.5) * 8, y, txt, {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color,
      stroke: '#0e1116',
      strokeThickness: 3,
    });
    t.setOrigin(0.5);
    t.setDepth(35);
    this.tweens.add({
      targets: t,
      y: y - 28,
      alpha: 0,
      scale: 1.1,
      duration: 550,
      ease: 'Quad.easeOut',
      onComplete: () => t.destroy(),
    });
  }

  private killEnemy(e: EnemyEntity): void {
    const idx = this.enemies.indexOf(e);
    if (idx >= 0) this.enemies.splice(idx, 1);
    // 몹 하나 처치 = 2원 (config.goldPerKillFlat)
    this.state.earn(registry.config.goldPerKillFlat);
    this.state.addScore(e.isBoss ? 500 : 25);
    this.spawnCoin(e.x, e.y);
    // splitter 분열 — 죽을 때 작은 적 2마리
    if (e.kind === 'splitter') {
      const tc = registry.config.enemyTypes.splitter;
      const n = tc.childCount ?? 2;
      const childHp = Math.max(1, Math.round(e.hpMax * (tc.childHpMul ?? 0.4)));
      for (let i = 0; i < n; i += 1) {
        const child = new EnemyEntity(this, e.x, e.y, e.def, childHp, e.baseSpeed * 1.2, e.trackDist + (i - 0.5) * 30, 'normal');
        this.enemies.push(child);
      }
    }
    e.playDeath(() => {});
    // 보스 처치 → 일시정지 + 응모권 팝업
    if (e.isBoss && this.bossActive && e === this.bossRef) {
      this.bossActive = false;
      this.bossRef = null;
      this.state.earn(50 + this.state.wave * 5);
      this.state.addScore(1000);
      this.onBossDefeated();
    }
  }

  // 보스 처치 시: 게임 멈춤 + 응모권 1장 지급 팝업 (딤 클릭 무시)
  private onBossDefeated(): void {
    this.deselect();
    this.scene.pause();
    // 폴리볼 부모앱에 응모권 청구 (prefix DEF:)
    this.claimTicket();
    this.hud.showTicketPopup(this.state.wave, () => {
      this.scene.resume();
      if (!this.isGameOver) this.startWave(this.state.wave + 1);
    });
  }

  // 폴리볼 postMessage 브리지 (없으면 무시)
  private claimTicket(): void {
    try {
      const w = window as unknown as { parent?: Window };
      const payload = { type: 'DEF:CLAIM_TICKET', source: 'boss_kill', adWatched: false, wave: this.state.wave };
      w.parent?.postMessage(payload, '*');
    } catch {
      /* standalone — 무시 */
    }
  }

  private spawnCoin(x: number, y: number): void {
    const c = this.add.text(x, y, '🪙', { fontFamily: 'system-ui', fontSize: '15px' });
    c.setOrigin(0.5);
    c.setDepth(25);
    this.tweens.add({
      targets: c,
      y: y - 24,
      x: x + (Math.random() - 0.5) * 18,
      alpha: 0,
      duration: 480,
      ease: 'Quad.easeOut',
      onComplete: () => c.destroy(),
    });
  }

  // ─── 웨이브 (타임드 30초) ───────────────────────────────

  private startWave(wave: number): void {
    this.state.wave = wave;
    const cfg = registry.config;
    const isBoss = wave % cfg.bossEveryNWaves === 0;

    // 일반몹 스폰 간격 — 보스전/일반 공통 (보스전에도 몹 계속 나옴)
    this.spawnInterval = cfg.waveDurationMs / cfg.mobsPerWave; // 300ms
    this.spawnTimer = 200;

    if (isBoss) {
      // 보스전 진입 — 기존 몹 유지 + 보스 1마리 추가 (몹도 계속 스폰)
      this.bossActive = true;
      this.bossTimeLeft = cfg.bossTimeLimitMs;
      this.waveTimeLeft = cfg.bossTimeLimitMs;
      this.state.waveTotal = Math.round(cfg.bossTimeLimitMs / 1000);
      this.spawnBoss(wave);
      this.hud.flashMessage(`보스 등장! ${Math.round(cfg.bossTimeLimitMs / 1000)}초 안에 처치`);
    } else {
      this.bossActive = false;
      this.waveTimeLeft = cfg.waveDurationMs;
      this.state.waveTotal = Math.round(cfg.waveDurationMs / 1000);
      this.hud.flashMessage(`웨이브 ${wave}`);
    }
  }

  private nextWave(): void {
    this.state.earn(registry.config.goldPerWaveClear + this.state.wave * 2);
    this.state.addScore(100);
    this.startWave(this.state.wave + 1);
  }

  private spawnBoss(wave: number): void {
    const cfg = registry.config;
    const bossIndex = Math.floor(wave / cfg.bossEveryNWaves); // 1,2,3...
    const bosses = registry.enemies.filter((e) => e.isBoss);
    const def = bosses[(bossIndex - 1) % bosses.length] ?? bosses[0]!;
    const hp = Math.round(cfg.bossBaseHp * Math.pow(cfg.bossHpPerBoss, bossIndex - 1));
    const speed = cfg.mobSpeed.base * 0.7; // 보스는 느림
    const start = this.track.getPoint(0);
    const e = new EnemyEntity(this, start.x, start.y, def, hp, speed, 0);
    this.bossRef = e;
    this.enemies.push(e);
  }

  private spawnEnemy(): void {
    const cfg = registry.config;
    const wave = this.state.wave;
    const isBerserk = wave % cfg.berserkEveryNWaves === 0;

    const mobs = registry.enemies.filter((e) => !e.isBoss);
    const def = mobs[Math.floor(Math.random() * mobs.length)]!;
    // HP: 10웨이브까지 완만, 11+ 급상승
    let hp = cfg.mobHpByWave.base * Math.pow(cfg.mobHpByWave.perWaveMult, Math.min(wave, 10) - 1);
    if (wave > cfg.waveSpikeFrom - 1) {
      hp *= Math.pow(cfg.waveSpikeHpMult, wave - (cfg.waveSpikeFrom - 1));
    }
    let speed = cfg.mobSpeed.base + cfg.mobSpeed.perWaveAdd * (wave - 1);
    if (wave >= cfg.waveSpikeFrom) speed += cfg.waveSpikeSpeedAdd * (wave - cfg.waveSpikeFrom + 1);
    // 특수 적 유형 (웨이브별 가중)
    const kind = registry.pickEnemyKind(wave);
    const tc = cfg.enemyTypes[kind];
    hp = Math.round(hp * tc.hpMul);
    speed = Math.min(cfg.mobSpeed.maxSpeed, speed * tc.spdMul);
    if (isBerserk) speed = Math.min(cfg.mobSpeed.maxSpeed, speed * cfg.mobSpeed.berserkMult);

    const start = this.track.getPoint(0);
    const e = new EnemyEntity(this, start.x, start.y, def, hp, speed, 0, kind);
    this.enemies.push(e);
  }

  private aliveEnemyCount(): number {
    let n = 0;
    for (const e of this.enemies) if (e.alive) n += 1;
    return n;
  }

  private gameOver(reason: 'mob_overflow' | 'boss_timeout'): void {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.deselect();
    this.cameras.main.shake(300, 0.01);
    const msg = reason === 'boss_timeout' ? '보스 처치 실패!' : '몹이 넘쳤다!';
    this.hud.flashMessage(msg);
    this.time.delayedCall(700, () => {
      this.scene.start('Result', { score: this.state.score, wave: this.state.wave, reason });
    });
  }

  private publishHud(): void {
    const cfg = registry.config;
    const totalMs = this.bossActive ? cfg.bossTimeLimitMs : cfg.waveDurationMs;
    const left = this.bossActive ? this.bossTimeLeft : this.waveTimeLeft;
    const remainSec = Math.max(0, Math.ceil(left / 1000));
    const elapsed = totalMs - left;
    this.hud.update({
      nickname: '게스트',
      wave: this.state.wave,
      waveProgress: Math.round(elapsed / 1000),
      waveTotal: this.state.waveTotal,
      waveRemainSec: remainSec,
      score: this.state.score,
      gold: this.state.gold,
      tickets: 3,
      ticketsCap: 3,
      units: this.units.length,
      unitsMax: registry.config.maxUnits,
      mobs: this.aliveEnemyCount(),
      mobsCap: registry.config.gameOverMobCount,
      summonCost: this.state.summonCost,
      bossActive: this.bossActive,
      bossHpRatio: this.bossRef && this.bossRef.alive ? Math.max(0, this.bossRef.hp / this.bossRef.hpMax) : 0,
    });
    void GAME_WIDTH;
    void GAME_HEIGHT;
  }
}

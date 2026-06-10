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
  private dragStartX = 0;
  private dragStartY = 0;
  private dragPrevX = 0;
  private dragPrevY = 0;
  private selectedUnit: UnitEntity | null = null;
  private sellBtn: Phaser.GameObjects.Container | null = null;
  private sellMode = false;

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
    this.sellMode = false;

    this.buildTrack();
    this.drawBackground();
    this.drawField();
    this.drawTrack();
    this.attachInput();

    this.hud = new Hud(this);
    this.hud.mount();
    this.hud.setOnSummon(() => this.trySummon());
    this.hud.setOnSellMode((v) => {
      this.sellMode = v;
      if (!v) this.deselect();
    });

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

    // 유닛 idle + 전투
    for (const u of this.units) {
      if (u === this.draggingUnit) continue;
      u.tickIdle(time, delta);
      u.cooldownLeft -= delta;
      if (u.cooldownLeft <= 0) {
        const target = this.pickTarget(u);
        if (target) {
          this.unitAttack(u, target);
          u.cooldownLeft = u.atkSpeed * 1000;
        }
      }
    }

    // 적 트랙 순환
    for (const e of this.enemies) {
      if (!e.alive) continue;
      e.trackDist += e.speed * dt;
      const t = (((e.trackDist % this.trackLen) + this.trackLen) % this.trackLen) / this.trackLen;
      const p = this.track.getPoint(t);
      const p2 = this.track.getPoint((t + 0.01) % 1);
      const heading = Math.atan2(p2.y - p.y, p2.x - p.x);
      e.applyTrackTransform(p.x, p.y, heading, time);
      e.tick(delta);
    }

    this.projectiles.update(delta);

    if (this.bossActive) {
      // 보스전: 제한시간 내 보스 처치 못하면 게임오버
      this.bossTimeLeft -= delta;
      if (this.bossTimeLeft <= 0) {
        this.gameOver('boss_timeout');
      }
    } else {
      // 일반 웨이브: 30초 + 100마리 균등 스폰
      this.waveTimeLeft -= delta;
      this.spawnTimer -= delta;
      if (this.spawnTimer <= 0) {
        this.spawnEnemy();
        this.spawnTimer = this.spawnInterval;
      }
      if (this.waveTimeLeft <= 0) {
        this.nextWave();
      }
    }

    // 게임오버 (생존 몹 100) — 보스전/일반 공통
    if (this.aliveEnemyCount() >= registry.config.gameOverMobCount) {
      this.gameOver('mob_overflow');
    }

    // 선택 sell 버튼 위치 추적
    if (this.selectedUnit && this.sellBtn) {
      this.sellBtn.setPosition(this.selectedUnit.x, this.selectedUnit.y - 44);
    }

    this.publishHud();
  }

  // ─── 그리기 ───────────────────────────────

  private drawBackground(): void {
    const size = 64;
    for (let y = FIELD.top; y < FIELD.bottom; y += size) {
      for (let x = FIELD.left; x < FIELD.right; x += size) {
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
    this.input.dragDistanceThreshold = 6;

    this.input.on(Phaser.Input.Events.DRAG_START, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      this.draggingUnit = obj;
      this.dragMoved = false;
      this.dragStartX = obj.x;
      this.dragStartY = obj.y;
      this.dragPrevX = obj.x;
      this.dragPrevY = obj.y;
      obj.setDepth(40);
      obj.setRangeVisible(true);
    });

    this.input.on(Phaser.Input.Events.DRAG, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, x: number, y: number) => {
      if (!(obj instanceof UnitEntity)) return;
      this.dragMoved = true;
      // 드래그 중엔 손가락 그대로 따라옴 (clamp 안함) → 위/구석 배치 자연스러움
      obj.setPosition(x, y);
    });

    this.input.on(Phaser.Input.Events.DRAG_END, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      const u = obj;
      u.setDepth(10);
      this.draggingUnit = null;

      if (!this.dragMoved) {
        // 탭 = 선택 or 판매
        u.setRangeVisible(false);
        if (this.sellMode) {
          this.sellUnit(u);
        } else {
          this.selectUnit(u);
        }
        return;
      }

      // 배치 — 배치영역(트랙 안쪽)으로 clamp + 겹침 체크
      u.setRangeVisible(false);
      const c = this.clampToField(u.x, u.y);
      u.setPosition(c.x, c.y);
      if (this.overlapsUnit(u.x, u.y, u)) {
        const free = this.findNearbyFree(u.x, u.y, u);
        u.setPosition(free.x, free.y);
      }
      this.deselect();
    });

    // 빈 공간 탭 → 선택 해제
    this.input.on(Phaser.Input.Events.POINTER_DOWN, (_p: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
      const overUnit = currentlyOver.some((o) => o instanceof UnitEntity);
      const overSell = currentlyOver.some((o) => o === this.sellBtn || (this.sellBtn && this.sellBtn.list.includes(o as never)));
      if (!overUnit && !overSell) this.deselect();
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
    // 플로팅 판매 버튼
    const c = this.add.container(u.x, u.y - 44);
    c.setDepth(50);
    const g = this.add.graphics();
    g.fillStyle(0xff4d4d, 1);
    g.lineStyle(2, 0x8a2020, 1);
    g.fillRoundedRect(-52, -18, 104, 36, 10);
    g.strokeRoundedRect(-52, -18, 104, 36, 10);
    c.add(g);
    const refund = u.sellRefund();
    const t = this.add.text(0, 0, `판매 +${refund}`, {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    t.setOrigin(0.5);
    c.add(t);
    c.setSize(104, 36);
    c.setInteractive(new Phaser.Geom.Rectangle(-52, -18, 104, 36), Phaser.Geom.Rectangle.Contains);
    c.on('pointerup', () => {
      if (this.selectedUnit) this.sellUnit(this.selectedUnit);
    });
    this.sellBtn = c;
  }

  private deselect(): void {
    if (this.selectedUnit) {
      this.selectedUnit.setSelected(false);
      this.selectedUnit = null;
    }
    if (this.sellBtn) {
      this.sellBtn.destroy();
      this.sellBtn = null;
    }
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
    const dmg = Math.round(u.atk * mult);
    const eid = target.eid;
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
      onHit: (d) => this.damageEnemy(eid, d, mult > 1),
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
    // 몹 하나 처치 = 1원 (config.goldPerKillFlat)
    this.state.earn(registry.config.goldPerKillFlat);
    this.state.addScore(e.isBoss ? 500 : 25);
    this.spawnCoin(e.x, e.y);
    e.playDeath(() => {});
    // 보스 처치 → 보스전 종료 → 다음 웨이브
    if (e.isBoss && this.bossActive && e === this.bossRef) {
      this.bossActive = false;
      this.bossRef = null;
      this.state.earn(50 + this.state.wave * 5);
      this.state.addScore(1000);
      this.hud.flashMessage('보스 처치! 클리어');
      this.time.delayedCall(900, () => {
        if (!this.isGameOver) this.startWave(this.state.wave + 1);
      });
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

    if (isBoss) {
      // 보스전 진입 — 일반몹 전부 제거, 보스 1마리만 등장
      for (const e of this.enemies) {
        if (e.alive) {
          e.alive = false;
          e.playDeath(() => {});
        }
      }
      this.enemies = [];
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
      this.spawnInterval = cfg.waveDurationMs / cfg.mobsPerWave; // 300ms
      this.spawnTimer = 200;
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
    const hp = Math.round(cfg.mobHpByWave.base * Math.pow(cfg.mobHpByWave.perWaveMult, wave - 1));
    let speed = cfg.mobSpeed.base + cfg.mobSpeed.perWaveAdd * (wave - 1);
    if (isBerserk) speed *= cfg.mobSpeed.berserkMult;

    const start = this.track.getPoint(0);
    const e = new EnemyEntity(this, start.x, start.y, def, hp, speed, 0);
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
      sellMode: this.sellMode,
      bossActive: this.bossActive,
      bossHpRatio: this.bossRef && this.bossRef.alive ? Math.max(0, this.bossRef.hp / this.bossRef.hpMax) : 0,
    });
    void GAME_WIDTH;
    void GAME_HEIGHT;
  }
}

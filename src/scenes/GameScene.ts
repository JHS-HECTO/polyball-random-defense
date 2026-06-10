import Phaser from 'phaser';
import {
  BASE_POS,
  BASE_RADIUS,
  COLORS,
  FIELD,
  GAME_HEIGHT,
  GAME_WIDTH,
} from 'config/game';
import { SLOTS, type SlotDef } from 'config/slots';
import { registry } from 'systems/registry';
import { GameState } from 'systems/gameState';
import { ProjectilePool } from 'systems/projectilePool';
import { UnitEntity } from 'entities/UnitEntity';
import { EnemyEntity } from 'entities/EnemyEntity';
import { Hud } from 'ui/Hud';

const GRADE_PROJ_COLOR: Record<string, number> = {
  common: 0xffffff,
  rare: 0x6ec8ff,
  epic: 0xd4a5ff,
  legendary: 0xffd35e,
  hidden: 0xff8c42,
};

export class GameScene extends Phaser.Scene {
  private hud!: Hud;
  private state!: GameState;
  private projectiles!: ProjectilePool;

  // 슬롯 점유 (slotIndex → UnitEntity)
  private slotUnits = new Map<number, UnitEntity>();
  private slotMarkers = new Map<number, Phaser.GameObjects.Graphics>();
  private enemies: EnemyEntity[] = [];

  // 웨이브 상태
  private spawnTimer = 0;
  private spawnInterval = 1000;
  private toSpawnThisWave = 0;
  private spawnedThisWave = 0;
  private killedThisWave = 0;
  private interWave = false;
  private isGameOver = false;

  // 드래그
  private draggingUnit: UnitEntity | null = null;
  private dragFromSlot = -1;

  constructor() {
    super({ key: 'Game' });
  }

  create(): void {
    this.state = new GameState();
    this.projectiles = new ProjectilePool(this);
    this.slotUnits.clear();
    this.slotMarkers.clear();
    this.enemies = [];
    this.isGameOver = false;
    this.interWave = false;

    this.drawBackground();
    this.drawField();
    this.drawBase();
    this.drawSlots();
    this.attachDrag();

    this.hud = new Hud(this);
    this.hud.mount();
    this.hud.setOnSummon(() => this.trySummon());
    this.hud.setOnAutoMerge((v) => {
      this.state.autoMerge = v;
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
    for (const u of this.slotUnits.values()) {
      if (u === this.draggingUnit) continue;
      u.tickIdle(time);
      u.cooldownLeft -= delta;
      if (u.cooldownLeft <= 0) {
        const target = this.pickTarget(u);
        if (target) {
          this.unitAttack(u, target);
          u.cooldownLeft = u.def.atkSpeed * 1000;
        }
      }
    }

    // 적 이동/틱
    for (const e of this.enemies) {
      e.move(dt, time);
      e.tick(delta);
    }

    // 투사체
    this.projectiles.update(delta);

    // 스폰
    if (!this.interWave && this.spawnedThisWave < this.toSpawnThisWave) {
      this.spawnTimer -= delta;
      if (this.spawnTimer <= 0) {
        this.spawnEnemy();
        this.spawnTimer = this.spawnInterval;
      }
    }

    // 웨이브 클리어 체크
    if (
      !this.interWave &&
      this.spawnedThisWave >= this.toSpawnThisWave &&
      this.aliveEnemyCount() === 0
    ) {
      this.clearWave();
    }

    // 게임오버 체크 (생존 몹 수)
    const aliveMobs = this.aliveEnemyCount();
    if (aliveMobs >= registry.config.gameOverMobCount) {
      this.gameOver();
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
    const v = this.add.graphics();
    v.setDepth(1);
    v.fillStyle(0x000000, 0.18);
    v.fillRect(0, 0, GAME_WIDTH, FIELD.top);
    v.fillRect(0, FIELD.bottom, GAME_WIDTH, GAME_HEIGHT - FIELD.bottom);
  }

  private drawField(): void {
    const g = this.add.graphics();
    g.setDepth(2);
    g.fillStyle(0x000000, 0.35);
    g.fillRoundedRect(FIELD.left - 6, FIELD.top - 6, FIELD.right - FIELD.left + 12, FIELD.bottom - FIELD.top + 12, 14);
    g.lineStyle(4, 0x0f1320, 1);
    g.strokeRoundedRect(FIELD.left, FIELD.top, FIELD.right - FIELD.left, FIELD.bottom - FIELD.top, 12);
    g.lineStyle(2, COLORS.fieldBorder, 0.6);
    g.strokeRoundedRect(FIELD.left + 4, FIELD.top + 4, FIELD.right - FIELD.left - 8, FIELD.bottom - FIELD.top - 8, 10);
  }

  private drawBase(): void {
    const x = BASE_POS.x;
    const y = BASE_POS.y;
    const sh = this.add.graphics();
    sh.setDepth(5);
    sh.fillStyle(0x000000, 0.45);
    sh.fillEllipse(x, y + BASE_RADIUS + 6, BASE_RADIUS * 2.4, 16);
    const g = this.add.graphics();
    g.setDepth(6);
    g.fillStyle(COLORS.base, 1);
    g.lineStyle(3, COLORS.baseShadow, 1);
    g.fillRoundedRect(x - BASE_RADIUS, y - BASE_RADIUS, BASE_RADIUS * 2, BASE_RADIUS * 2, 12);
    g.strokeRoundedRect(x - BASE_RADIUS, y - BASE_RADIUS, BASE_RADIUS * 2, BASE_RADIUS * 2, 12);
    g.fillStyle(COLORS.baseRoof, 1);
    g.lineStyle(2, 0x6f2222, 1);
    g.fillTriangle(x - BASE_RADIUS - 6, y - BASE_RADIUS + 4, x + BASE_RADIUS + 6, y - BASE_RADIUS + 4, x, y - BASE_RADIUS - 24);
    g.strokeTriangle(x - BASE_RADIUS - 6, y - BASE_RADIUS + 4, x + BASE_RADIUS + 6, y - BASE_RADIUS + 4, x, y - BASE_RADIUS - 24);
    const t = this.add.text(x, y + 4, '🏰', { fontFamily: 'system-ui', fontSize: '32px' });
    t.setOrigin(0.5);
    t.setDepth(7);
  }

  private drawSlots(): void {
    for (const s of SLOTS) {
      const g = this.add.graphics();
      g.setDepth(4);
      g.setPosition(s.x, s.y);
      this.slotMarkers.set(s.index, g);
      this.redrawSlot(s.index, false);
    }
  }

  private redrawSlot(index: number, highlight: boolean): void {
    const g = this.slotMarkers.get(index);
    if (!g) return;
    g.clear();
    if (this.slotUnits.has(index)) {
      g.fillStyle(0x000000, 0.18);
      g.fillEllipse(0, 22, 48, 14);
      return;
    }
    g.fillStyle(highlight ? 0xffd35e : 0xffffff, highlight ? 0.16 : 0.05);
    g.fillCircle(0, 0, 26);
    g.lineStyle(2, highlight ? 0xffd35e : COLORS.slot, highlight ? 0.8 : 0.4);
    const segs = 18;
    for (let i = 0; i < segs; i += 2) {
      const a1 = (Math.PI * 2 * i) / segs;
      const a2 = (Math.PI * 2 * (i + 1)) / segs;
      g.beginPath();
      g.arc(0, 0, 24, a1, a2, false);
      g.strokePath();
    }
  }

  private refreshAllSlots(highlightEmpty: boolean): void {
    for (const s of SLOTS) {
      this.redrawSlot(s.index, highlightEmpty && !this.slotUnits.has(s.index));
    }
  }

  // ─── 소환 / 배치 ───────────────────────────────

  private firstEmptySlot(): SlotDef | null {
    for (const s of SLOTS) {
      if (!this.slotUnits.has(s.index)) return s;
    }
    return null;
  }

  private trySummon(): void {
    if (this.isGameOver) return;
    const cost = this.state.summonCost;
    if (this.slotUnits.size >= registry.config.maxUnits) {
      this.hud.flashMessage('슬롯이 가득 찼습니다');
      return;
    }
    if (!this.state.canAfford(cost)) {
      this.hud.flashMessage('골드가 부족합니다');
      return;
    }
    const slot = this.firstEmptySlot();
    if (!slot) return;
    this.state.spend(cost);
    this.state.purchases += 1;
    const def = registry.rollRandomUnit();
    const u = new UnitEntity(this, slot.x, slot.y, def, slot.index);
    u.setDepth(10);
    u.playSpawn();
    this.slotUnits.set(slot.index, u);
    this.redrawSlot(slot.index, false);
    if (this.state.autoMerge) this.tryAutoMerge();
    this.publishHud();
  }

  // ─── 합성 ───────────────────────────────

  // 같은 id 3개 자동 합성 (1쌍만 처리 후 재귀)
  private tryAutoMerge(): void {
    const byId = new Map<string, UnitEntity[]>();
    for (const u of this.slotUnits.values()) {
      const arr = byId.get(u.def.id) ?? [];
      arr.push(u);
      byId.set(u.def.id, arr);
    }
    for (const [id, arr] of byId) {
      if (arr.length >= 3) {
        const result = registry.mergeResult([id, id, id]);
        if (result) {
          this.doMerge(arr.slice(0, 3), result);
          // 합성 후 추가 합성 가능성 — 다음 프레임
          this.time.delayedCall(60, () => this.tryAutoMerge());
          return;
        }
      }
    }
  }

  private doMerge(units: UnitEntity[], resultId: string): void {
    const resultDef = registry.unit(resultId);
    if (!resultDef) return;
    // 첫 유닛 슬롯에 결과 배치
    const targetSlotIdx = units[0]!.slotIndex;
    const slot = SLOTS[targetSlotIdx]!;
    // 합성 플래시 — 3유닛 중앙으로 모이며 사라짐
    const cx = slot.x;
    const cy = slot.y;
    for (const u of units) {
      this.slotUnits.delete(u.slotIndex);
      this.tweens.add({
        targets: u,
        x: cx,
        y: cy,
        scaleX: 0.3,
        scaleY: 0.3,
        alpha: 0,
        duration: registry.config.anim.mergeFlashMs,
        ease: 'Quad.easeIn',
        onComplete: () => u.destroy(),
      });
    }
    // 플래시
    const flash = this.add.graphics();
    flash.setDepth(30);
    const fs = { r: 10, a: 0.9 };
    this.tweens.add({
      targets: fs,
      r: 50,
      a: 0,
      duration: registry.config.anim.mergeFlashMs,
      onUpdate: () => {
        flash.clear();
        flash.fillStyle(0xffffff, fs.a);
        flash.fillCircle(cx, cy, fs.r);
      },
      onComplete: () => flash.destroy(),
    });
    // 결과 유닛 팝
    this.time.delayedCall(registry.config.anim.mergeFlashMs, () => {
      const u = new UnitEntity(this, cx, cy, resultDef, targetSlotIdx);
      u.setDepth(10);
      u.playSpawn();
      this.slotUnits.set(targetSlotIdx, u);
      this.refreshAllSlots(false);
      this.hud.flashMessage(`합성! ${resultDef.name}`);
      // 히든 조합 가능 체크
      this.checkHidden();
      if (this.state.autoMerge) this.tryAutoMerge();
    });
  }

  private checkHidden(): void {
    const owned = [...this.slotUnits.values()].map((u) => u.def.id);
    const rec = registry.matchHidden(owned);
    if (rec) {
      this.hud.flashMessage(`히든 제작 가능: ${rec.name}`);
    }
  }

  // ─── 드래그 ───────────────────────────────

  private attachDrag(): void {
    this.input.dragDistanceThreshold = 4;

    this.input.on(Phaser.Input.Events.DRAG_START, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      this.draggingUnit = obj;
      this.dragFromSlot = obj.slotIndex;
      obj.setDepth(40);
      obj.setRangeVisible(true);
      this.refreshAllSlots(true);
    });

    this.input.on(Phaser.Input.Events.DRAG, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, x: number, y: number) => {
      if (!(obj instanceof UnitEntity)) return;
      obj.setPosition(x, y);
    });

    this.input.on(Phaser.Input.Events.DRAG_END, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (!(obj instanceof UnitEntity)) return;
      const unit = obj;
      unit.setDepth(10);
      unit.setRangeVisible(false);
      const from = this.dragFromSlot;
      this.draggingUnit = null;
      this.dragFromSlot = -1;

      const target = this.nearestSlot(unit.x, unit.y, 50);
      if (!target) {
        this.snapToSlot(unit, from);
        this.refreshAllSlots(false);
        return;
      }
      if (target.index === from) {
        this.snapToSlot(unit, from);
        this.refreshAllSlots(false);
        return;
      }
      const occupant = this.slotUnits.get(target.index);
      if (!occupant) {
        // 빈 슬롯 이동
        this.slotUnits.delete(from);
        this.slotUnits.set(target.index, unit);
        unit.slotIndex = target.index;
        this.snapToSlot(unit, target.index);
      } else if (occupant.def.id === unit.def.id) {
        // 같은 유닛 → 수동 합성 (2개) — 3개 규칙이므로 여기선 같은 id 3개 모이는지 체크
        // 수동 드롭으로 같은 id 둘 합쳤을 때 전체 같은id 3+면 합성
        this.snapToSlot(unit, from); // 일단 원위치
        const sameAll = [...this.slotUnits.values()].filter((u) => u.def.id === unit.def.id);
        if (sameAll.length >= 3) {
          const result = registry.mergeResult([unit.def.id, unit.def.id, unit.def.id]);
          if (result) this.doMerge(sameAll.slice(0, 3), result);
        } else {
          this.hud.flashMessage('합성엔 같은 유닛 3개 필요');
        }
      } else {
        // 다른 유닛 → 자리 교환
        this.slotUnits.set(from, occupant);
        occupant.slotIndex = from;
        this.snapToSlot(occupant, from);
        this.slotUnits.set(target.index, unit);
        unit.slotIndex = target.index;
        this.snapToSlot(unit, target.index);
      }
      this.refreshAllSlots(false);
      this.publishHud();
    });

    // 유닛 탭 = 사거리 토글
    this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (_p: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
      if (obj instanceof UnitEntity) {
        // pointerdown에선 표시, drag면 위에서 처리
        obj.setRangeVisible(true);
        this.time.delayedCall(900, () => {
          if (this.draggingUnit !== obj) obj.setRangeVisible(false);
        });
      }
    });
  }

  private snapToSlot(unit: UnitEntity, slotIndex: number): void {
    const s = SLOTS[slotIndex];
    if (!s) return;
    unit.slotIndex = slotIndex;
    this.tweens.add({
      targets: unit,
      x: s.x,
      y: s.y,
      duration: 120,
      ease: 'Quad.easeOut',
    });
  }

  private nearestSlot(x: number, y: number, tol: number): SlotDef | null {
    let best: SlotDef | null = null;
    let bestD = tol * tol;
    for (const s of SLOTS) {
      const dx = s.x - x;
      const dy = s.y - y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    return best;
  }

  // ─── 전투 ───────────────────────────────

  private pickTarget(u: UnitEntity): EnemyEntity | null {
    const r2 = u.def.range * u.def.range;
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
    const dmg = Math.round(u.def.atk * mult);
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
      onHit: (d) => this.damageEnemy(eid, d, mult > 1),
    });
  }

  private damageEnemy(eid: number, dmg: number, super_: boolean): void {
    const e = this.enemies.find((en) => en.eid === eid);
    if (!e || !e.alive) return;
    const dead = e.takeDamage(dmg);
    this.spawnDamageNumber(e.x, e.y - 18, dmg, super_);
    if (dead) this.killEnemy(e);
  }

  private spawnDamageNumber(x: number, y: number, amount: number, super_: boolean): void {
    const txt = amount >= 1000 ? `${(amount / 1000).toFixed(1)}K` : String(amount);
    const t = this.add.text(x + (Math.random() - 0.5) * 8, y, txt, {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: super_ ? '20px' : '15px',
      fontStyle: 'bold',
      color: super_ ? '#ffd35e' : '#ffffff',
      stroke: '#0a0d14',
      strokeThickness: 3,
    });
    t.setOrigin(0.5);
    t.setDepth(35);
    this.tweens.add({
      targets: t,
      y: y - 30,
      alpha: 0,
      scale: 1.15,
      duration: 550,
      ease: 'Quad.easeOut',
      onComplete: () => t.destroy(),
    });
  }

  private killEnemy(e: EnemyEntity): void {
    const idx = this.enemies.indexOf(e);
    if (idx >= 0) this.enemies.splice(idx, 1);
    this.killedThisWave += 1;

    // 골드 + 점수
    const goldKey = e.isBoss ? 'boss' : e.def.element;
    const gpk = registry.config.goldPerKill;
    const gold = e.isBoss ? gpk.boss : (gpk[e.def.element] ?? 5);
    this.state.earn(gold ?? 5);
    this.state.addScore(e.isBoss ? 500 : 25);
    void goldKey;

    // 코인 튀는 연출
    this.spawnCoin(e.x, e.y);
    e.playDeath(() => {
      /* destroyed in entity */
    });
  }

  private spawnCoin(x: number, y: number): void {
    const c = this.add.text(x, y, '🪙', { fontFamily: 'system-ui', fontSize: '16px' });
    c.setOrigin(0.5);
    c.setDepth(25);
    this.tweens.add({
      targets: c,
      y: y - 26,
      x: x + (Math.random() - 0.5) * 20,
      alpha: 0,
      duration: 500,
      ease: 'Quad.easeOut',
      onComplete: () => c.destroy(),
    });
  }

  // ─── 웨이브 ───────────────────────────────

  private startWave(wave: number): void {
    this.state.wave = wave;
    this.interWave = false;
    const cfg = registry.config;
    const isBoss = wave % cfg.bossEveryNWaves === 0;
    // 몹 수
    const baseCount = 8 + Math.floor(wave * 1.5);
    this.toSpawnThisWave = isBoss ? 1 + Math.floor(wave / 3) : baseCount;
    this.spawnedThisWave = 0;
    this.killedThisWave = 0;
    this.state.waveTotal = this.toSpawnThisWave;
    this.state.waveProgress = 0;
    // 스폰 간격
    this.spawnInterval = Math.max(
      cfg.mobSpawnRate.minInterval,
      1000 * Math.pow(cfg.mobSpawnRate.perWaveMult, wave - 1),
    );
    this.spawnTimer = 200;

    this.hud.flashMessage(isBoss ? `보스 웨이브 ${wave}!` : `웨이브 ${wave}`);
  }

  private clearWave(): void {
    this.interWave = true;
    this.state.earn(registry.config.goldPerWaveClear + this.state.wave * 2);
    this.state.addScore(100);
    this.hud.flashMessage(`웨이브 ${this.state.wave} 클리어!`);
    this.time.delayedCall(1400, () => {
      if (!this.isGameOver) this.startWave(this.state.wave + 1);
    });
  }

  private spawnEnemy(): void {
    const cfg = registry.config;
    const wave = this.state.wave;
    const isBossWave = wave % cfg.bossEveryNWaves === 0;
    const isBerserk = wave % cfg.berserkEveryNWaves === 0;

    let def;
    let hp;
    if (isBossWave) {
      const bosses = registry.enemies.filter((e) => e.isBoss);
      def = bosses[Math.floor(Math.random() * bosses.length)]!;
      hp = Math.round(def.hp * Math.pow(1.15, Math.floor(wave / cfg.bossEveryNWaves) - 1));
    } else {
      const mobs = registry.enemies.filter((e) => !e.isBoss);
      def = mobs[Math.floor(Math.random() * mobs.length)]!;
      hp = Math.round(cfg.mobHpByWave.base * Math.pow(cfg.mobHpByWave.perWaveMult, wave - 1));
    }
    let speed = cfg.mobSpeed.base + cfg.mobSpeed.perWaveAdd * (wave - 1);
    if (isBerserk) speed *= cfg.mobSpeed.berserkMult;

    // 가장자리 랜덤 스폰 (상/우/하 라인)
    const edge = Math.floor(Math.random() * 3);
    let sx;
    let sy;
    if (edge === 0) {
      sx = FIELD.left + Math.random() * (FIELD.right - FIELD.left);
      sy = FIELD.top + 10;
    } else if (edge === 1) {
      sx = FIELD.right - 10;
      sy = FIELD.top + Math.random() * (FIELD.bottom - FIELD.top);
    } else {
      sx = FIELD.left + Math.random() * (FIELD.right - FIELD.left);
      sy = FIELD.bottom - 10;
    }

    const e = new EnemyEntity(this, sx, sy, def, hp, speed);
    this.enemies.push(e);
    this.spawnedThisWave += 1;
  }

  private aliveEnemyCount(): number {
    let n = 0;
    for (const e of this.enemies) if (e.alive) n += 1;
    return n;
  }

  private gameOver(): void {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.cameras.main.shake(300, 0.01);
    this.time.delayedCall(600, () => {
      this.scene.start('Result', { score: this.state.score, wave: this.state.wave });
    });
  }

  private publishHud(): void {
    this.state.waveProgress = this.killedThisWave;
    this.hud.update({
      nickname: '게스트',
      wave: this.state.wave,
      waveProgress: this.killedThisWave,
      waveTotal: this.state.waveTotal,
      score: this.state.score,
      gold: this.state.gold,
      tickets: 3,
      ticketsCap: 3,
      units: this.slotUnits.size,
      unitsMax: registry.config.maxUnits,
      mobs: this.aliveEnemyCount(),
      mobsCap: registry.config.gameOverMobCount,
      summonCost: this.state.summonCost,
      autoMerge: this.state.autoMerge,
    });
  }
}

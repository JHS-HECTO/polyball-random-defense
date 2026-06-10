import Phaser from 'phaser';
import { registry, type Enemy, type EnemyKind } from 'systems/registry';

const KIND_TINT: Record<EnemyKind, number | null> = {
  normal: null,
  runner: 0x6ed0a0,
  armored: 0x8a93a6,
  splitter: 0xb05cff,
  healer: 0x3dd68c,
};

// 적 — placeholder: 속성컬러 원. 순환 트랙을 따라 무한히 돈다.
// 좌표/회전은 GameScene이 트랙 path 기반으로 매 프레임 갱신.

const ELEMENT_COLOR: Record<string, number> = {
  fire: 0xe2553f,
  water: 0x4aa3df,
  wind: 0x6ed0a0,
  earth: 0xb08850,
  light: 0xf0e0a0,
  dark: 0x8163b0,
};

let nextEid = 1;

export class EnemyEntity extends Phaser.GameObjects.Container {
  readonly eid: number;
  def: Enemy;
  hp: number;
  hpMax: number;
  speed: number;       // px/sec along track
  baseSpeed: number;   // 둔화 전 원래 속도
  alive = true;
  isBoss: boolean;
  kind: EnemyKind;
  dmgReduction = 0;
  slowedUntil = 0;     // GameScene이 slow 적용 시 갱신

  // 트랙 진행 거리 (px). GameScene이 매 프레임 += speed*dt, 좌표 보간.
  trackDist: number;

  private bodyG: Phaser.GameObjects.Graphics;
  private hpBar: Phaser.GameObjects.Graphics;
  private auraG: Phaser.GameObjects.Graphics | null = null;
  private hitFlashLeft = 0;
  private bobSeed: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    def: Enemy,
    hp: number,
    speed: number,
    startDist: number,
    kind: EnemyKind = 'normal',
  ) {
    super(scene, x, y);
    this.eid = nextEid++;
    this.def = def;
    this.hp = hp;
    this.hpMax = hp;
    this.speed = speed;
    this.baseSpeed = speed;
    this.isBoss = def.isBoss;
    this.kind = kind;
    this.trackDist = startDist;
    this.bobSeed = Math.random() * Math.PI * 2;
    if (!def.isBoss) this.dmgReduction = registry.config.enemyTypes[kind].dmgReduction;

    const shadow = scene.add.image(0, def.isBoss ? 24 : 13, 'shadow');
    shadow.setAlpha(0.35);
    shadow.setScale(def.isBoss ? 0.85 : 0.5);
    this.add(shadow);

    // healer 회복 오라 (연두 링)
    if (kind === 'healer') {
      this.auraG = scene.add.graphics();
      this.add(this.auraG);
    }

    this.bodyG = scene.add.graphics();
    this.add(this.bodyG);
    this.drawBody();

    // 유형 배지
    const badge = registry.config.enemyTypes[kind]?.badge;
    if (badge && !def.isBoss) {
      const b = scene.add.text(13, -13, badge, { fontFamily: 'system-ui', fontSize: '11px' });
      b.setOrigin(0.5);
      this.add(b);
    }

    this.hpBar = scene.add.graphics();
    this.add(this.hpBar);
    this.drawHpBar();

    this.setDepth(def.isBoss ? 14 : 12);
    scene.add.existing(this);
  }

  // healer 오라 갱신 (반경)
  drawAura(radius: number, t: number): void {
    if (!this.auraG) return;
    this.auraG.clear();
    const pulse = 0.7 + Math.sin(t / 300) * 0.3;
    this.auraG.lineStyle(2, 0x3dd68c, 0.3 * pulse);
    this.auraG.strokeCircle(0, 0, radius);
    this.auraG.fillStyle(0x3dd68c, 0.05 * pulse);
    this.auraG.fillCircle(0, 0, radius);
  }

  private drawBody(): void {
    const g = this.bodyG;
    g.clear();
    const tint = KIND_TINT[this.kind];
    const c = tint ?? (ELEMENT_COLOR[this.def.element] ?? 0x888888);
    // armored 약간 큼, runner 약간 작음
    const radius = this.isBoss ? 28 : this.kind === 'armored' ? 18 : this.kind === 'runner' ? 12 : 15;
    const flash = this.hitFlashLeft > 0;
    g.fillStyle(this.darken(c, 0.4), 1);
    g.fillCircle(0, 0, radius);
    g.fillStyle(flash ? 0xffffff : c, 1);
    g.fillCircle(0, -1, radius - 2);
    if (!flash) {
      g.fillStyle(this.lighten(c, 0.3), 0.5);
      g.fillCircle(-radius * 0.3, -radius * 0.35, radius * 0.35);
    }
    g.lineStyle(2, this.darken(c, 0.55), 1);
    g.strokeCircle(0, 0, radius);
    if (!flash) {
      g.fillStyle(0x0a0d14, 1);
      g.fillCircle(-radius * 0.3, -radius * 0.1, radius * 0.12);
      g.fillCircle(radius * 0.3, -radius * 0.1, radius * 0.12);
    }
    if (this.isBoss) {
      g.fillStyle(this.darken(c, 0.55), 1);
      g.fillTriangle(-13, -20, -7, -34, -2, -22);
      g.fillTriangle(13, -20, 7, -34, 2, -22);
    }
  }

  private drawHpBar(): void {
    const g = this.hpBar;
    g.clear();
    const w = this.isBoss ? 46 : 26;
    const h = this.isBoss ? 5 : 3;
    const y = this.isBoss ? -38 : -22;
    const ratio = Math.max(0, this.hp / this.hpMax);
    g.fillStyle(0x000000, 0.6);
    g.fillRect(-w / 2 - 1, y - 1, w + 2, h + 2);
    g.fillStyle(0x3a1414, 1);
    g.fillRect(-w / 2, y, w, h);
    g.fillStyle(this.isBoss ? 0xffd35e : 0x6cd073, 1);
    g.fillRect(-w / 2, y, w * ratio, h);
  }

  takeDamage(amount: number): boolean {
    if (!this.alive) return false;
    // armored 방어 (받는 데미지 감소)
    const dealt = this.dmgReduction > 0 ? amount * (1 - this.dmgReduction) : amount;
    this.hp -= dealt;
    this.hitFlashLeft = registry.config.anim.mobHitFlashMs;
    this.drawBody();
    this.drawHpBar();
    if (this.hp <= 0) {
      this.alive = false;
      return true;
    }
    return false;
  }

  // GameScene이 트랙 좌표 + 진행 방향(heading) 넘겨줌 → 위치/기울기/bob 적용.
  applyTrackTransform(x: number, y: number, headingRad: number, timeMs: number): void {
    if (!this.alive) return;
    const bob = Math.sin(timeMs / 220 + this.bobSeed) * (this.isBoss ? 1.5 : 2);
    this.x = x;
    this.y = y + bob;
    // 진행 방향으로 살짝 기울기 (좌우 이동 시 ±)
    this.rotation = Math.sin(headingRad) * 0.12 + Math.sin(timeMs / 260 + this.bobSeed) * 0.05;
  }

  heal(amount: number): void {
    if (!this.alive) return;
    this.hp = Math.min(this.hpMax, this.hp + amount);
    this.drawHpBar();
  }

  // slow 적용 (GameScene이 매 프레임 호출, slowPct 0~1)
  applySlow(slowPct: number): void {
    this.speed = this.baseSpeed * (1 - slowPct);
  }

  clearSlow(): void {
    this.speed = this.baseSpeed;
  }

  tick(deltaMs: number, timeMs: number): void {
    if (this.hitFlashLeft > 0) {
      this.hitFlashLeft -= deltaMs;
      if (this.hitFlashLeft <= 0) {
        this.hitFlashLeft = 0;
        this.drawBody();
      }
    }
    if (this.kind === 'healer' && this.auraG) {
      const r = registry.config.enemyTypes.healer.healRadius ?? 90;
      this.drawAura(r, timeMs);
    }
  }

  playDeath(onDone: () => void): void {
    const a = registry.config.anim;
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      duration: a.mobDeathMs,
      ease: 'Back.easeIn',
      onComplete: () => {
        onDone();
        this.destroy();
      },
    });
  }

  private lighten(c: number, p: number): number {
    const r = Math.min(255, ((c >> 16) & 0xff) + Math.round(255 * p));
    const g = Math.min(255, ((c >> 8) & 0xff) + Math.round(255 * p));
    const b = Math.min(255, (c & 0xff) + Math.round(255 * p));
    return (r << 16) | (g << 8) | b;
  }

  private darken(c: number, p: number): number {
    const r = Math.max(0, Math.round(((c >> 16) & 0xff) * (1 - p)));
    const g = Math.max(0, Math.round(((c >> 8) & 0xff) * (1 - p)));
    const b = Math.max(0, Math.round((c & 0xff) * (1 - p)));
    return (r << 16) | (g << 8) | b;
  }
}

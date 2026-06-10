import Phaser from 'phaser';
import { registry, type Enemy } from 'systems/registry';

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
  alive = true;
  isBoss: boolean;

  // 트랙 진행 거리 (px). GameScene이 매 프레임 += speed*dt, 좌표 보간.
  trackDist: number;

  private bodyG: Phaser.GameObjects.Graphics;
  private hpBar: Phaser.GameObjects.Graphics;
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
  ) {
    super(scene, x, y);
    this.eid = nextEid++;
    this.def = def;
    this.hp = hp;
    this.hpMax = hp;
    this.speed = speed;
    this.isBoss = def.isBoss;
    this.trackDist = startDist;
    this.bobSeed = Math.random() * Math.PI * 2;

    const shadow = scene.add.image(0, def.isBoss ? 24 : 13, 'shadow');
    shadow.setAlpha(0.35);
    shadow.setScale(def.isBoss ? 0.85 : 0.5);
    this.add(shadow);

    this.bodyG = scene.add.graphics();
    this.add(this.bodyG);
    this.drawBody();

    this.hpBar = scene.add.graphics();
    this.add(this.hpBar);
    this.drawHpBar();

    this.setDepth(def.isBoss ? 14 : 12);
    scene.add.existing(this);
  }

  private drawBody(): void {
    const g = this.bodyG;
    g.clear();
    const c = ELEMENT_COLOR[this.def.element] ?? 0x888888;
    const radius = this.isBoss ? 28 : 15;
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
    this.hp -= amount;
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

  tick(deltaMs: number): void {
    if (this.hitFlashLeft > 0) {
      this.hitFlashLeft -= deltaMs;
      if (this.hitFlashLeft <= 0) {
        this.hitFlashLeft = 0;
        this.drawBody();
      }
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

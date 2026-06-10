import Phaser from 'phaser';
import { BASE_POS } from 'config/game';
import { registry, type Enemy } from 'systems/registry';

// 적 — placeholder: 속성컬러 원 + 라벨. 본거지로 이동 후 주변 orbit.

const ELEMENT_COLOR: Record<string, number> = {
  fire: 0xe2553f,
  water: 0x4aa3df,
  wind: 0x6ed0a0,
  earth: 0xb08850,
  light: 0xf0e0a0,
  dark: 0x8163b0,
};

let nextEid = 1;

export type EnemyState = 'approaching' | 'orbiting';

export class EnemyEntity extends Phaser.GameObjects.Container {
  readonly eid: number;
  def: Enemy;
  hp: number;
  hpMax: number;
  speed: number;
  enemyState: EnemyState = 'approaching';
  alive = true;
  isBoss: boolean;

  private bodyG: Phaser.GameObjects.Graphics;
  private hpBar: Phaser.GameObjects.Graphics;
  private bodyImg: Phaser.GameObjects.Graphics;
  private orbitAngle = 0;
  private orbitRadius = 0;
  private orbitDir = 1;
  private hitFlashLeft = 0;
  private bobSeed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, def: Enemy, hp: number, speed: number) {
    super(scene, x, y);
    this.eid = nextEid++;
    this.def = def;
    this.hp = hp;
    this.hpMax = hp;
    this.speed = speed;
    this.isBoss = def.isBoss;
    this.bobSeed = Math.random() * Math.PI * 2;
    this.orbitDir = Math.random() < 0.5 ? 1 : -1;

    const shadow = scene.add.image(0, def.isBoss ? 26 : 14, 'shadow');
    shadow.setAlpha(0.35);
    shadow.setScale(def.isBoss ? 0.9 : 0.5);
    this.add(shadow);

    this.bodyImg = scene.add.graphics();
    this.add(this.bodyImg);
    this.bodyG = this.bodyImg;
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
    const radius = this.isBoss ? 30 : 16;
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
    // 눈
    if (!flash) {
      g.fillStyle(0x0a0d14, 1);
      g.fillCircle(-radius * 0.3, -radius * 0.1, radius * 0.12);
      g.fillCircle(radius * 0.3, -radius * 0.1, radius * 0.12);
    }
    // 보스 뿔
    if (this.isBoss) {
      g.fillStyle(this.darken(c, 0.55), 1);
      g.fillTriangle(-14, -22, -8, -38, -2, -24);
      g.fillTriangle(14, -22, 8, -38, 2, -24);
    }
  }

  private drawHpBar(): void {
    const g = this.hpBar;
    g.clear();
    const w = this.isBoss ? 50 : 28;
    const h = this.isBoss ? 5 : 3;
    const y = this.isBoss ? -42 : -24;
    const ratio = Math.max(0, this.hp / this.hpMax);
    g.fillStyle(0x000000, 0.6);
    g.fillRect(-w / 2 - 1, y - 1, w + 2, h + 2);
    g.fillStyle(0x3a1414, 1);
    g.fillRect(-w / 2, y, w, h);
    g.fillStyle(this.isBoss ? 0xffd35e : 0x6cd073, 1);
    g.fillRect(-w / 2, y, w * ratio, h);
  }

  // 데미지 적용. true = 사망.
  takeDamage(amount: number): boolean {
    if (!this.alive) return false;
    this.hp -= amount;
    this.hitFlashLeft = registry.config.anim.mobHitFlashMs;
    this.drawBody();
    this.drawHpBar();
    // knockback
    const a = registry.config.anim;
    const dx = this.x - BASE_POS.x;
    const dy = this.y - BASE_POS.y;
    const d = Math.hypot(dx, dy) || 1;
    this.x += (dx / d) * a.mobKnockbackPx;
    this.y += (dy / d) * a.mobKnockbackPx;
    if (this.hp <= 0) {
      this.alive = false;
      return true;
    }
    return false;
  }

  // 이동 갱신. dtSec.
  move(dtSec: number, timeMs: number): void {
    if (!this.alive) return;
    const dx = BASE_POS.x - this.x;
    const dy = BASE_POS.y - this.y;
    const dist = Math.hypot(dx, dy);
    const orbitR = this.isBoss ? 70 : 60;

    if (this.enemyState === 'approaching') {
      if (dist <= orbitR) {
        this.enemyState = 'orbiting';
        this.orbitRadius = orbitR + Math.random() * 24;
        this.orbitAngle = Math.atan2(this.y - BASE_POS.y, this.x - BASE_POS.x);
      } else {
        const v = this.speed * dtSec;
        this.x += (dx / dist) * v;
        this.y += (dy / dist) * v;
        // 진행 방향 기울기 + bob
        this.rotation = Math.sin(timeMs / 250 + this.bobSeed) * 0.09;
      }
    } else {
      // orbit 본거지 주변
      const angVel = (this.speed / this.orbitRadius) * 0.6 * this.orbitDir;
      this.orbitAngle += angVel * dtSec;
      this.x = BASE_POS.x + Math.cos(this.orbitAngle) * this.orbitRadius;
      this.y = BASE_POS.y + Math.sin(this.orbitAngle) * this.orbitRadius;
      this.rotation = Math.sin(timeMs / 200 + this.bobSeed) * 0.08;
    }
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

  // 사망 연출 후 파괴
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

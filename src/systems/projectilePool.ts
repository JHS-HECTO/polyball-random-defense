import Phaser from 'phaser';
import { registry } from './registry';

export type ProjectileHit = (x: number, y: number) => void;

type Proj = {
  g: Phaser.GameObjects.Graphics;
  x: number;
  y: number;
  targetEid: number;
  getTarget: () => { x: number; y: number; alive: boolean } | null;
  damage: number;
  color: number;
  speed: number;
  size: number;
  spin: number;
  onHit: (dmg: number, hx: number, hy: number) => void;
  alive: boolean;
  life: number;
};

// 투사체 매니저 — 단순 호밍.
export class ProjectilePool {
  private scene: Phaser.Scene;
  private list: Proj[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  fire(opts: {
    x: number;
    y: number;
    targetEid: number;
    getTarget: () => { x: number; y: number; alive: boolean } | null;
    damage: number;
    color: number;
    speed?: number;
    size?: number;
    onHit: (dmg: number, hx: number, hy: number) => void;
  }): void {
    const g = this.scene.add.graphics();
    g.setDepth(20);
    this.list.push({
      g,
      x: opts.x,
      y: opts.y,
      targetEid: opts.targetEid,
      getTarget: opts.getTarget,
      damage: opts.damage,
      color: opts.color,
      speed: opts.speed ?? registry.config.anim.projectileSpeed,
      size: opts.size ?? 5,
      spin: 0,
      onHit: opts.onHit,
      alive: true,
      life: 1500,
    });
  }

  update(deltaMs: number): void {
    const dt = deltaMs / 1000;
    for (let i = this.list.length - 1; i >= 0; i -= 1) {
      const p = this.list[i];
      if (!p) continue;
      p.life -= deltaMs;
      const tgt = p.getTarget();
      if (!tgt || !tgt.alive || p.life <= 0) {
        p.g.destroy();
        this.list.splice(i, 1);
        continue;
      }
      const dx = tgt.x - p.x;
      const dy = tgt.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 14) {
        p.onHit(p.damage, p.x, p.y);
        this.impact(p.x, p.y, p.color);
        p.g.destroy();
        this.list.splice(i, 1);
        continue;
      }
      const v = p.speed * dt;
      p.x += (dx / d) * v;
      p.y += (dy / d) * v;
      p.spin += deltaMs * 0.02;
      this.drawBaseball(p);
    }
  }

  // 야구공 모양 (흰 공 + 빨간 실밥 + 등급 글로우)
  private drawBaseball(p: Proj): void {
    const g = p.g;
    g.clear();
    const r = p.size;
    // 등급 글로우
    g.fillStyle(p.color, 0.4);
    g.fillCircle(p.x, p.y, r + 2);
    // 공 본체
    g.fillStyle(0xffffff, 1);
    g.fillCircle(p.x, p.y, r);
    g.lineStyle(1, 0xcccccc, 1);
    g.strokeCircle(p.x, p.y, r);
    // 실밥 (회전)
    g.lineStyle(1, 0xe2553f, 1);
    const a = p.spin;
    g.beginPath();
    g.arc(p.x, p.y, r - 1, a - 0.6, a + 0.6, false);
    g.strokePath();
    g.beginPath();
    g.arc(p.x, p.y, r - 1, a + Math.PI - 0.6, a + Math.PI + 0.6, false);
    g.strokePath();
  }

  private impact(x: number, y: number, color: number): void {
    const g = this.scene.add.graphics();
    g.setDepth(21);
    const s = { r: 4, a: 0.9 };
    this.scene.tweens.add({
      targets: s,
      r: 18,
      a: 0,
      duration: 200,
      ease: 'Cubic.easeOut',
      onUpdate: () => {
        g.clear();
        g.lineStyle(3, color, s.a);
        g.strokeCircle(x, y, s.r);
        g.fillStyle(0xffffff, s.a * 0.5);
        g.fillCircle(x, y, s.r * 0.4);
      },
      onComplete: () => g.destroy(),
    });
  }

  clear(): void {
    for (const p of this.list) p.g.destroy();
    this.list = [];
  }
}

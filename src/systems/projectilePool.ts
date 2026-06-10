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
  onHit: (dmg: number) => void;
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
    onHit: (dmg: number) => void;
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
      onHit: opts.onHit,
      alive: true,
      life: 1500,
    });
  }

  update(deltaMs: number): void {
    const speed = registry.config.anim.projectileSpeed;
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
        // 적중
        p.onHit(p.damage);
        this.impact(p.x, p.y, p.color);
        p.g.destroy();
        this.list.splice(i, 1);
        continue;
      }
      const v = speed * dt;
      p.x += (dx / d) * v;
      p.y += (dy / d) * v;
      p.g.clear();
      p.g.fillStyle(0xffffff, 0.9);
      p.g.fillCircle(p.x, p.y, 5);
      p.g.fillStyle(p.color, 1);
      p.g.fillCircle(p.x, p.y, 3.5);
    }
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

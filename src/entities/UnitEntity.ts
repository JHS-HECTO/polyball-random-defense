import Phaser from 'phaser';
import { registry, type Grade, type Unit } from 'systems/registry';

// 유닛 — 야구 배트 든 캐릭터 placeholder (등급컬러 실루엣 + 라벨).
// 스탯(공격/사거리/공속)은 config 등급값 사용. 합성 없음.

const GRADE_COLOR: Record<Grade, number> = {
  common: 0x9aa5b1,
  rare: 0x4da3ff,
  epic: 0x3dd68c,
  legendary: 0xb05cff,
  mythic_low: 0xffb020,
  mythic: 0xff4d8d,
};

const GRADE_LABEL: Record<Grade, string> = {
  common: '일반',
  rare: '희귀',
  epic: '영웅',
  legendary: '전설',
  mythic_low: '에픽',
  mythic: '신화',
};

let nextUid = 1;

export class UnitEntity extends Phaser.GameObjects.Container {
  readonly uid: number;
  def: Unit;
  summonPrice: number;
  // config 등급 스탯
  atk: number;
  range: number;
  atkSpeed: number;
  projSpeed: number;
  cooldownLeft: number = 0;
  placed: boolean = false;

  private base: Phaser.GameObjects.Container;
  private bodyG: Phaser.GameObjects.Graphics;
  private batG: Phaser.GameObjects.Graphics;
  private rangeG: Phaser.GameObjects.Graphics;
  private glowG: Phaser.GameObjects.Graphics;
  private idleSeed: number;
  private swingMs = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, def: Unit, summonPrice: number) {
    super(scene, x, y);
    this.uid = nextUid++;
    this.def = def;
    this.summonPrice = summonPrice;
    this.idleSeed = Math.random() * Math.PI * 2;

    const st = registry.baseStatsForGrade(def.grade);
    this.atk = st.atk;
    this.range = st.range;
    this.atkSpeed = st.atkSpeed;
    this.projSpeed = registry.config.projectileSpeedByGrade[def.grade];

    this.rangeG = scene.add.graphics();
    this.add(this.rangeG);

    this.glowG = scene.add.graphics();
    this.add(this.glowG);
    this.drawGlow();

    const shadow = scene.add.image(0, 20, 'shadow');
    shadow.setAlpha(0.4);
    shadow.setScale(0.7);
    this.add(shadow);

    this.base = scene.add.container(0, 0);
    this.add(this.base);

    this.bodyG = scene.add.graphics();
    this.base.add(this.bodyG);

    this.batG = scene.add.graphics();
    this.base.add(this.batG);

    this.drawCharacter();

    const label = scene.add.text(0, 24, GRADE_LABEL[def.grade], {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '10px',
      color: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: this.cssColor(GRADE_COLOR[def.grade]),
      padding: { x: 4, y: 1 },
    });
    label.setOrigin(0.5);
    this.add(label);

    // 큰 hit 영역 (손가락 터치 안정)
    this.setSize(76, 84);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-38, -46, 76, 84),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true,
      useHandCursor: true,
    });

    scene.add.existing(this);
  }

  private cssColor(c: number): string {
    return '#' + c.toString(16).padStart(6, '0');
  }

  private drawGlow(): void {
    const g = this.glowG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    const order = registry.gradeOrder().indexOf(this.def.grade);
    const intensity = 0.12 + order * 0.07;
    g.fillStyle(c, intensity);
    g.fillCircle(0, 0, 28);
  }

  private drawCharacter(): void {
    const g = this.bodyG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    const dark = this.darken(c, 0.4);

    // 다리
    g.fillStyle(dark, 1);
    g.fillRoundedRect(-9, 10, 6, 12, 2);
    g.fillRoundedRect(3, 10, 6, 12, 2);

    // 몸통 (유니폼 = 등급컬러)
    g.fillStyle(c, 1);
    g.lineStyle(2, dark, 1);
    g.fillRoundedRect(-13, -10, 26, 24, 7);
    g.strokeRoundedRect(-13, -10, 26, 24, 7);
    // 유니폼 하이라이트
    g.fillStyle(this.lighten(c, 0.3), 0.5);
    g.fillRoundedRect(-10, -8, 8, 8, 4);

    // 머리 (살색)
    g.fillStyle(0xfdd9b8, 1);
    g.lineStyle(2, 0xc9a07a, 1);
    g.fillCircle(0, -20, 10);
    g.strokeCircle(0, -20, 10);
    // 야구 모자 (등급컬러)
    g.fillStyle(dark, 1);
    g.fillEllipse(0, -26, 22, 9);
    g.fillRect(-11, -27, 22, 4);
    g.fillRect(4, -24, 13, 3); // 챙
    // 눈
    g.fillStyle(0x2c1d12, 1);
    g.fillCircle(-3, -20, 1.4);
    g.fillCircle(3, -20, 1.4);

    this.drawBat();
  }

  private drawBat(): void {
    const g = this.batG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    // 스윙 진행도 (0 idle, 0~1 스윙)
    const t = this.swingMs > 0 ? 1 - this.swingMs / registry.config.anim.batSwingMs : 0;
    // idle: 어깨에 걸친 사선 / swing: 앞으로 휘두름
    const baseAng = -0.7;
    const ang = this.swingMs > 0 ? baseAng + Math.sin(t * Math.PI) * 1.8 : baseAng;
    const sx = 11;
    const sy = -4;
    const len = 22;
    const ex = sx + Math.cos(ang) * len;
    const ey = sy + Math.sin(ang) * len;
    // 배트 (나무색 + 등급 글로우 끝)
    g.lineStyle(5, 0x8b5a2b, 1);
    g.beginPath();
    g.moveTo(sx, sy);
    g.lineTo(ex, ey);
    g.strokePath();
    g.lineStyle(1.5, 0x4d2e10, 1);
    g.beginPath();
    g.moveTo(sx, sy);
    g.lineTo(ex, ey);
    g.strokePath();
    // 배트 끝 등급 글로우
    g.fillStyle(c, 1);
    g.fillCircle(ex, ey, 4);
    // 손
    g.fillStyle(0xfdd9b8, 1);
    g.fillCircle(sx, sy, 3);
  }

  setRangeVisible(v: boolean): void {
    const g = this.rangeG;
    g.clear();
    if (v) {
      const c = GRADE_COLOR[this.def.grade];
      g.fillStyle(c, 0.08);
      g.fillCircle(0, 0, this.range);
      g.lineStyle(1.5, c, 0.5);
      g.strokeCircle(0, 0, this.range);
    }
  }

  setSelected(v: boolean): void {
    this.setRangeVisible(v);
    this.base.setScale(v ? 1.15 : 1);
    // 선택 하이라이트 링 (흰 글로우)
    const gl = this.glowG;
    if (v) {
      gl.clear();
      gl.fillStyle(0xffffff, 0.25);
      gl.fillCircle(0, 0, 30);
      gl.lineStyle(3, 0xffffff, 0.95);
      gl.strokeCircle(0, 0, 28);
    } else {
      this.drawGlow();
    }
  }

  playAttack(targetX: number, targetY: number): void {
    this.swingMs = registry.config.anim.batSwingMs;
    const a = registry.config.anim;
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const d = Math.hypot(dx, dy) || 1;
    const lx = (dx / d) * a.attackLungePx;
    const ly = (dy / d) * a.attackLungePx;
    this.scene.tweens.killTweensOf(this.base);
    this.scene.tweens.chain({
      targets: this.base,
      tweens: [
        { x: lx, y: ly, duration: a.attackLungeInMs, ease: 'Quad.easeOut' },
        { x: 0, y: 0, duration: a.attackLungeOutMs, ease: 'Back.easeOut' },
      ],
    });
  }

  playSpawn(): void {
    const a = registry.config.anim;
    this.base.setScale(0);
    this.scene.tweens.add({ targets: this.base, scaleX: 1, scaleY: 1, duration: a.summonPopInMs, ease: 'Back.easeOut' });
  }

  tickIdle(timeMs: number, deltaMs: number): void {
    if (this.swingMs > 0) {
      this.swingMs -= deltaMs;
      this.drawBat();
      if (this.swingMs <= 0) this.drawBat();
    }
    if (this.scene.tweens.isTweening(this.base)) return;
    const a = registry.config.anim;
    const phase = (timeMs / a.idleBobPeriodMs) * Math.PI * 2 + this.idleSeed;
    this.base.y = Math.sin(phase) * a.idleBobAmp;
  }

  sellRefund(): number {
    // 등급별 판매가 (희소할수록 비쌈)
    return registry.config.sellByGrade[this.def.grade];
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

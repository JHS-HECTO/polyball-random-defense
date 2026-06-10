import Phaser from 'phaser';
import { registry, type Grade, type Unit } from 'systems/registry';

// 유닛 — placeholder: 등급컬러 라운드 사각 + 속성/등급 라벨. 자유 배치 + 자동 공격.
// 합성 없음. 소환된 등급 그대로.

const GRADE_COLOR: Record<Grade, number> = {
  common: 0x9aa5b1,
  rare: 0x4da3ff,
  epic: 0xb05cff,
  legendary: 0xffb020,
  hidden: 0xff4d8d,
};

const GRADE_LABEL: Record<Grade, string> = {
  common: 'C',
  rare: 'R',
  epic: 'E',
  legendary: 'L',
  hidden: 'H',
};

const ELEMENT_ICON: Record<string, string> = {
  fire: '🔥',
  water: '💧',
  wind: '🌪',
  earth: '🪨',
  light: '✨',
  dark: '🌑',
};

let nextUid = 1;

export class UnitEntity extends Phaser.GameObjects.Container {
  readonly uid: number;
  def: Unit;
  summonPrice: number; // 판매 환급 계산용 (소환 당시 가격)
  cooldownLeft: number = 0;
  placed: boolean = false; // 필드에 배치됨 (대기 상태 해제)

  private base: Phaser.GameObjects.Container;
  private bodyG: Phaser.GameObjects.Graphics;
  private rangeG: Phaser.GameObjects.Graphics;
  private glowG: Phaser.GameObjects.Graphics;
  private elemIcon: Phaser.GameObjects.Text;
  private idleSeed: number;
  private showingRange = false;

  constructor(scene: Phaser.Scene, x: number, y: number, def: Unit, summonPrice: number) {
    super(scene, x, y);
    this.uid = nextUid++;
    this.def = def;
    this.summonPrice = summonPrice;
    this.idleSeed = Math.random() * Math.PI * 2;

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
    this.drawBody();

    this.elemIcon = scene.add.text(0, -7, ELEMENT_ICON[def.element] ?? '?', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '18px',
    });
    this.elemIcon.setOrigin(0.5);
    this.base.add(this.elemIcon);

    const label = scene.add.text(0, 11, GRADE_LABEL[def.grade], {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '11px',
      color: '#0e1116',
      fontStyle: 'bold',
    });
    label.setOrigin(0.5);
    this.base.add(label);

    this.setSize(52, 52);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-26, -26, 52, 52),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true,
      useHandCursor: true,
    });

    scene.add.existing(this);
  }

  private drawGlow(): void {
    const g = this.glowG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    // 등급 글로우 (epic+ 강조)
    const intensity =
      this.def.grade === 'hidden' ? 0.5 : this.def.grade === 'legendary' ? 0.4 : this.def.grade === 'epic' ? 0.28 : 0.15;
    g.fillStyle(c, intensity);
    g.fillCircle(0, 0, 30);
  }

  private drawBody(): void {
    const g = this.bodyG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    // 카드 배경 (다크 패널)
    g.fillStyle(0x1a1f28, 1);
    g.fillRoundedRect(-22, -22, 44, 44, 12);
    // 등급 컬러 테두리
    g.lineStyle(3, c, 1);
    g.strokeRoundedRect(-22, -22, 44, 44, 12);
    // 상단 등급 바
    g.fillStyle(c, 0.9);
    g.fillRoundedRect(-22, -22, 44, 8, { tl: 12, tr: 12, bl: 0, br: 0 });
  }

  setRangeVisible(v: boolean): void {
    this.showingRange = v;
    const g = this.rangeG;
    g.clear();
    if (v) {
      const r = this.def.range;
      const c = GRADE_COLOR[this.def.grade];
      g.fillStyle(c, 0.08);
      g.fillCircle(0, 0, r);
      g.lineStyle(1.5, c, 0.5);
      g.strokeCircle(0, 0, r);
    }
  }

  isShowingRange(): boolean {
    return this.showingRange;
  }

  setSelected(v: boolean): void {
    this.setRangeVisible(v);
    this.base.setScale(v ? 1.12 : 1);
  }

  playAttack(targetX: number, targetY: number): void {
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
        { x: lx, y: ly, scaleX: a.attackSquashScaleX, scaleY: a.attackSquashScaleY, duration: a.attackLungeInMs, ease: 'Quad.easeOut' },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: a.attackLungeOutMs, ease: 'Back.easeOut' },
      ],
    });
  }

  playSpawn(): void {
    const a = registry.config.anim;
    this.base.setScale(0);
    this.scene.tweens.add({
      targets: this.base,
      scaleX: 1,
      scaleY: 1,
      duration: a.summonPopInMs,
      ease: 'Back.easeOut',
    });
  }

  tickIdle(timeMs: number): void {
    const a = registry.config.anim;
    if (this.scene.tweens.isTweening(this.base)) return;
    const phase = (timeMs / a.idleBobPeriodMs) * Math.PI * 2 + this.idleSeed;
    this.base.y = Math.sin(phase) * a.idleBobAmp;
    this.base.scaleY = 1 + Math.sin(phase * 2) * a.idleScaleY;
  }

  sellRefund(): number {
    return Math.round(this.summonPrice * registry.config.sellRatio);
  }
}

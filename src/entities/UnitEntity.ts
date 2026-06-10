import Phaser from 'phaser';
import { registry, type Grade, type Unit } from 'systems/registry';

// 유닛 — placeholder: 등급컬러 라운드 사각 + 라벨. PNG는 나중에 sprite 교체.
// 절차적 애니메이션 (idle bob / attack lunge)은 7단계에서 강화. 여기선 기본만.

const GRADE_COLOR: Record<Grade, number> = {
  common: 0x98a4b7,
  rare: 0x6ec8ff,
  epic: 0xd4a5ff,
  legendary: 0xffd35e,
  hidden: 0xff8c42,
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
  slotIndex: number;
  cooldownLeft: number = 0;

  private base: Phaser.GameObjects.Container;
  private bodyG: Phaser.GameObjects.Graphics;
  private rangeG: Phaser.GameObjects.Graphics;
  private label: Phaser.GameObjects.Text;
  private elemIcon: Phaser.GameObjects.Text;
  private idleSeed: number;
  private showingRange = false;

  constructor(scene: Phaser.Scene, x: number, y: number, def: Unit, slotIndex: number) {
    super(scene, x, y);
    this.uid = nextUid++;
    this.def = def;
    this.slotIndex = slotIndex;
    this.idleSeed = Math.random() * Math.PI * 2;

    this.rangeG = scene.add.graphics();
    this.add(this.rangeG);

    // 그림자
    const shadow = scene.add.image(0, 20, 'shadow');
    shadow.setAlpha(0.4);
    shadow.setScale(0.7);
    this.add(shadow);

    // base = 애니메이션 적용 대상 (bob/lunge/squash)
    this.base = scene.add.container(0, 0);
    this.add(this.base);

    this.bodyG = scene.add.graphics();
    this.base.add(this.bodyG);
    this.drawBody();

    this.elemIcon = scene.add.text(0, -8, ELEMENT_ICON[def.element] ?? '?', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '18px',
    });
    this.elemIcon.setOrigin(0.5);
    this.base.add(this.elemIcon);

    this.label = scene.add.text(0, 10, GRADE_LABEL[def.grade], {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '11px',
      color: '#0a0d14',
      fontStyle: 'bold',
    });
    this.label.setOrigin(0.5);
    this.base.add(this.label);

    this.setSize(56, 56);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-28, -28, 56, 56),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true,
      useHandCursor: true,
    });

    scene.add.existing(this);
  }

  private drawBody(): void {
    const g = this.bodyG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    // 외곽 다크
    g.fillStyle(this.darken(c, 0.45), 1);
    g.fillRoundedRect(-22, -22, 44, 44, 12);
    // 본체
    g.fillStyle(c, 1);
    g.fillRoundedRect(-20, -22, 40, 40, 10);
    // 하이라이트
    g.fillStyle(this.lighten(c, 0.3), 0.5);
    g.fillRoundedRect(-16, -18, 14, 10, 6);
    // 외곽선
    g.lineStyle(2, this.darken(c, 0.55), 1);
    g.strokeRoundedRect(-22, -22, 44, 44, 12);
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

  // 공격 애니메이션 트리거 (타겟 방향 lunge + squash)
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
        {
          x: lx,
          y: ly,
          scaleX: a.attackSquashScaleX,
          scaleY: a.attackSquashScaleY,
          duration: a.attackLungeInMs,
          ease: 'Quad.easeOut',
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: a.attackLungeOutMs,
          ease: 'Back.easeOut',
        },
      ],
    });
  }

  // 소환 팝 인
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
    if (this.scene.tweens.isTweening(this.base)) return; // 공격 중엔 idle 스킵
    const phase = (timeMs / a.idleBobPeriodMs) * Math.PI * 2 + this.idleSeed;
    this.base.y = Math.sin(phase) * a.idleBobAmp;
    this.base.scaleY = 1 + Math.sin(phase * 2) * a.idleScaleY;
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

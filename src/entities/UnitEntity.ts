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
  // 공격력 업그레이드 레벨 (1부터) + 누적 투자 골드
  level: number = 1;
  investedGold: number = 0;
  // 등급×역할 최종 스탯
  atk: number;
  range: number;
  atkSpeed: number;
  projSpeed: number;
  projSize: number;
  splashRadius: number;
  splashFrac: number;
  cooldownLeft: number = 0;
  placed: boolean = false;
  // 지원
  readonly isSupport: boolean;
  readonly supportKind: 'buff' | 'slow' | null;
  // 외부(buffer)에서 받은 버프 배율 (매 프레임 GameScene이 설정)
  atkBuffMul: number = 1;
  spdBuffMul: number = 1;
  private effectG: Phaser.GameObjects.Graphics | null = null;

  private base: Phaser.GameObjects.Container;
  private bodyG: Phaser.GameObjects.Graphics;
  private batG: Phaser.GameObjects.Graphics;
  private rangeG: Phaser.GameObjects.Graphics;
  private glowG: Phaser.GameObjects.Graphics;
  private levelLabel: Phaser.GameObjects.Text | null = null;
  private idleSeed: number;
  private swingMs = 0;
  private swingDuration = 200;
  private usesSprite = false;
  private gradeScale = 1; // 등급별 캐릭 크기 배수

  constructor(scene: Phaser.Scene, x: number, y: number, def: Unit, summonPrice: number) {
    super(scene, x, y);
    this.uid = nextUid++;
    this.def = def;
    this.summonPrice = summonPrice;
    this.idleSeed = Math.random() * Math.PI * 2;
    this.gradeScale = registry.config.gradeSizeMul[def.grade] ?? 1;

    const st = registry.resolveStats(def);
    this.atk = st.atk;
    this.range = st.range;
    this.atkSpeed = st.atkSpeed;
    this.projSpeed = st.projSpeed;
    this.projSize = st.projSize;
    this.splashRadius = st.splashRadius;
    this.splashFrac = st.splashFrac;
    this.swingDuration = Phaser.Math.Clamp(this.atkSpeed * 1000 * 0.55, 90, 340);

    const roleCfg0 = registry.config.roles[def.role];
    this.isSupport = !!roleCfg0.support;
    this.supportKind = roleCfg0.support ?? null;

    // 지원 효과 범위 원 (buffer 연두 / slower 파랑) — 항상 옅게 표시
    if (this.isSupport) {
      this.effectG = scene.add.graphics();
      this.add(this.effectG);
      this.drawSupportArea();
    }

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

    // 스프라이트 PNG가 로드돼 있으면 이미지 사용, 아니면 절차적 placeholder
    if (scene.textures.exists(def.id)) {
      this.usesSprite = true;
      const img = scene.add.image(0, 0, def.id);
      const targetH = 90; // 유닛 표시 높이 (px)
      img.setScale(targetH / img.height);
      img.setOrigin(0.5, 0.6); // 발이 그림자 근처에 오도록
      this.base.add(img);
    } else {
      this.drawCharacter();
    }
    // 등급별 크기 (높은 등급일수록 큼)
    this.base.setScale(this.gradeScale);

    // 등급 라벨 (하단)
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

    // 레벨 라벨 (좌상단, Lv2부터 표시)
    this.levelLabel = scene.add.text(-16, -22, '', {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '10px',
      color: '#ffe08a',
      fontStyle: 'bold',
      backgroundColor: '#5a4410',
      padding: { x: 3, y: 1 },
    });
    this.levelLabel.setOrigin(0.5);
    this.add(this.levelLabel);
    this.updateLevelLabel();

    // hit 영역 = 유닛 몸통 사각 (모바일 터치/드래그 쉽게 크게). 등급 크기 반영.
    const hw = 30 * this.gradeScale;
    const hh = 56 * this.gradeScale;
    this.setSize(hw, hh);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-hw / 2, -hh + 16, hw, hh),
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

    // 지원유닛: 배트 대신 클립보드 (공격 안 함)
    if (this.isSupport) {
      g.fillStyle(0xfffaf2, 1);
      g.lineStyle(1.5, 0x4d2e10, 1);
      g.fillRoundedRect(8, -8, 12, 16, 2);
      g.strokeRoundedRect(8, -8, 12, 16, 2);
      g.lineStyle(1, 0x9aa5b1, 1);
      g.beginPath(); g.moveTo(10, -4); g.lineTo(18, -4); g.moveTo(10, 0); g.lineTo(18, 0); g.moveTo(10, 4); g.lineTo(16, 4); g.strokePath();
      return;
    }

    this.drawBat();
  }

  private drawSupportArea(): void {
    if (!this.effectG) return;
    const g = this.effectG;
    g.clear();
    const eff = this.supportKind === 'buff'
      ? registry.bufferEffect(this.def.grade)
      : registry.slowerEffect(this.def.grade);
    const r = eff.radius;
    const color = this.supportKind === 'buff' ? 0x3dd68c : 0x4da3ff;
    g.fillStyle(color, 0.06);
    g.fillCircle(0, 0, r);
    g.lineStyle(1.5, color, 0.35);
    g.strokeCircle(0, 0, r);
  }

  supportRadius(): number {
    const eff = this.supportKind === 'buff'
      ? registry.bufferEffect(this.def.grade)
      : registry.slowerEffect(this.def.grade);
    return eff.radius;
  }

  private drawBat(): void {
    const g = this.batG;
    g.clear();
    const c = GRADE_COLOR[this.def.grade];
    // 스윙 진행도 (0 idle, 0~1 스윙)
    const t = this.swingMs > 0 ? 1 - this.swingMs / this.swingDuration : 0;
    // idle: 어깨에 걸친 사선 / swing: 앞으로 휘두름. 강타는 큰 호, 연타는 작은 호.
    const baseAng = -0.7;
    const arcMag = this.def.role === 'slugger' ? 2.3 : this.def.role === 'speedster' ? 1.2 : 1.8;
    const ang = this.swingMs > 0 ? baseAng + Math.sin(t * Math.PI) * arcMag : baseAng;
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
    this.base.setScale(v ? this.gradeScale * 1.15 : this.gradeScale);
    // 선택 하이라이트 링 (흰 글로우)
    const gl = this.glowG;
    if (v) {
      // 발밑 링만 (스프라이트 반투명 잔여가 흰 박스로 비치는 것 방지)
      gl.clear();
      gl.lineStyle(3, 0xffe08a, 0.95);
      gl.strokeEllipse(0, 18, 46 * this.gradeScale, 20 * this.gradeScale);
      gl.lineStyle(6, 0xffe08a, 0.25);
      gl.strokeEllipse(0, 18, 46 * this.gradeScale, 20 * this.gradeScale);
    } else {
      this.drawGlow();
    }
  }

  playAttack(targetX: number, targetY: number): void {
    this.swingMs = this.swingDuration;
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
    this.scene.tweens.add({ targets: this.base, scaleX: this.gradeScale, scaleY: this.gradeScale, duration: a.summonPopInMs, ease: 'Back.easeOut' });
  }

  tickIdle(timeMs: number, deltaMs: number): void {
    if (this.swingMs > 0 && !this.usesSprite) {
      this.swingMs -= deltaMs;
      this.drawBat();
      if (this.swingMs <= 0) this.drawBat();
    } else if (this.swingMs > 0) {
      this.swingMs -= deltaMs; // 스프라이트는 lunge 트윈만 (배트 그리기 없음)
    }
    if (this.scene.tweens.isTweening(this.base)) return;
    const a = registry.config.anim;
    const phase = (timeMs / a.idleBobPeriodMs) * Math.PI * 2 + this.idleSeed;
    this.base.y = Math.sin(phase) * a.idleBobAmp;
  }

  sellRefund(): number {
    // 등급별 판매가 + 업그레이드 투자금의 일부 환불
    const base = registry.config.sellByGrade[this.def.grade];
    const back = Math.floor(this.investedGold * registry.config.upgrade.refundRatio);
    return base + back;
  }

  // ─── 업그레이드 (공격력 레벨업) ───────────────────────────────
  maxLevel(): number {
    if (this.isSupport) return 1; // 지원유닛은 공격력 없음 → 업글 불가
    return registry.upgradeMaxLevel(this.def.grade);
  }

  canUpgrade(): boolean {
    return !this.isSupport && this.level < this.maxLevel();
  }

  // 다음 레벨 비용 (현재 레벨 기준)
  upgradeCostNext(): number {
    return registry.upgradeCost(this.def.grade, this.level);
  }

  // 레벨 +1, 공격력 재계산 (GameScene이 골드 차감·투자금 누적 후 호출)
  applyUpgrade(): void {
    this.level += 1;
    this.atk = registry.resolveStats(this.def, this.level).atk;
    this.updateLevelLabel();
    this.scene.tweens.add({
      targets: this.base,
      scaleX: this.gradeScale * 1.28,
      scaleY: this.gradeScale * 1.28,
      yoyo: true,
      duration: 130,
      ease: 'Quad.easeOut',
    });
  }

  private updateLevelLabel(): void {
    if (!this.levelLabel) return;
    if (this.level > 1) {
      this.levelLabel.setText(`Lv${this.level}`);
      this.levelLabel.setVisible(true);
    } else {
      this.levelLabel.setVisible(false);
    }
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

import Phaser from 'phaser';
import { BASE_POS, BASE_RADIUS, COLORS, FIELD, GAME_HEIGHT, GAME_WIDTH } from 'config/game';
import { Hud } from 'ui/Hud';

// 단계 1: 씬 골격 + 필드 + HUD (몹 카운터 placeholder)
export class GameScene extends Phaser.Scene {
  private hud!: Hud;

  // placeholder 상태 (다음 단계에서 진짜 시스템으로 대체)
  private demoMobCount: number = 0;
  private demoWave: number = 1;
  private demoGold: number = 200;
  private demoScore: number = 0;
  private demoTickets: number = 3;
  private demoUnits: number = 0;
  private demoMaxUnits: number = 12;

  constructor() {
    super({ key: 'Game' });
  }

  create(): void {
    this.drawBackground();
    this.drawField();
    this.drawBase();
    this.drawSlotsPreview();

    this.hud = new Hud(this);
    this.hud.mount();
    this.publishHud();

    // 단계 1 데모: 1초마다 몹 카운터 +1 시각 (실제 스폰 시스템은 5단계)
    this.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        this.demoMobCount = (this.demoMobCount + 1) % 12;
        this.demoScore += 7;
        this.publishHud();
      },
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.hud.destroy());
  }

  private publishHud(): void {
    this.hud.update({
      nickname: '게스트',
      wave: this.demoWave,
      waveProgress: 0,
      waveTotal: 10,
      score: this.demoScore,
      gold: this.demoGold,
      tickets: this.demoTickets,
      ticketsCap: 3,
      units: this.demoUnits,
      unitsMax: this.demoMaxUnits,
      mobs: this.demoMobCount,
      mobsCap: 100,
    });
  }

  private drawBackground(): void {
    // 잔디 타일링 (필드 영역만)
    const size = 64;
    for (let y = FIELD.top; y < FIELD.bottom; y += size) {
      for (let x = FIELD.left; x < FIELD.right; x += size) {
        this.add.image(x, y, 'tile-grass').setOrigin(0, 0).setDepth(0);
      }
    }
    // 외곽 비네팅
    const v = this.add.graphics();
    v.setDepth(1);
    v.fillStyle(0x000000, 0.18);
    v.fillRect(0, 0, GAME_WIDTH, FIELD.top);
    v.fillRect(0, FIELD.bottom, GAME_WIDTH, GAME_HEIGHT - FIELD.bottom);
  }

  private drawField(): void {
    // 필드 외곽 프레임 (다층 셰이딩)
    const g = this.add.graphics();
    g.setDepth(2);
    // 외곽 그림자
    g.fillStyle(0x000000, 0.35);
    g.fillRoundedRect(FIELD.left - 6, FIELD.top - 6, FIELD.right - FIELD.left + 12, FIELD.bottom - FIELD.top + 12, 14);
    // 외곽 다크 보더
    g.lineStyle(4, 0x0f1320, 1);
    g.strokeRoundedRect(FIELD.left, FIELD.top, FIELD.right - FIELD.left, FIELD.bottom - FIELD.top, 12);
    // 내부 보더 (밝은 선)
    g.lineStyle(2, COLORS.fieldBorder, 0.6);
    g.strokeRoundedRect(FIELD.left + 4, FIELD.top + 4, FIELD.right - FIELD.left - 8, FIELD.bottom - FIELD.top - 8, 10);
  }

  private drawBase(): void {
    // 본거지 = 가운데 성. placeholder 단순 라운드 사각 + 글자.
    const x = BASE_POS.x;
    const y = BASE_POS.y;
    // 그림자
    const sh = this.add.graphics();
    sh.setDepth(5);
    sh.fillStyle(0x000000, 0.45);
    sh.fillEllipse(x, y + BASE_RADIUS + 6, BASE_RADIUS * 2.4, 16);
    // 본체 (라운드 사각)
    const g = this.add.graphics();
    g.setDepth(6);
    g.fillStyle(COLORS.base, 1);
    g.lineStyle(3, COLORS.baseShadow, 1);
    g.fillRoundedRect(x - BASE_RADIUS, y - BASE_RADIUS, BASE_RADIUS * 2, BASE_RADIUS * 2, 12);
    g.strokeRoundedRect(x - BASE_RADIUS, y - BASE_RADIUS, BASE_RADIUS * 2, BASE_RADIUS * 2, 12);
    // 지붕
    g.fillStyle(COLORS.baseRoof, 1);
    g.lineStyle(2, 0x6f2222, 1);
    g.fillTriangle(x - BASE_RADIUS - 6, y - BASE_RADIUS + 4, x + BASE_RADIUS + 6, y - BASE_RADIUS + 4, x, y - BASE_RADIUS - 24);
    g.strokeTriangle(x - BASE_RADIUS - 6, y - BASE_RADIUS + 4, x + BASE_RADIUS + 6, y - BASE_RADIUS + 4, x, y - BASE_RADIUS - 24);
    // 라벨
    const t = this.add.text(x, y, '본거지', {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '14px',
      color: '#2c1d12',
      fontStyle: 'bold',
    });
    t.setOrigin(0.5);
    t.setDepth(7);
  }

  private drawSlotsPreview(): void {
    // 본거지 주변 격자 슬롯 placeholder — 점선 동그라미 (3단계에서 진짜 슬롯 시스템 대체)
    const ring = [
      // 본거지 주변 8방향
      { x: BASE_POS.x - 100, y: BASE_POS.y - 100 },
      { x: BASE_POS.x, y: BASE_POS.y - 110 },
      { x: BASE_POS.x + 100, y: BASE_POS.y - 100 },
      { x: BASE_POS.x - 110, y: BASE_POS.y },
      { x: BASE_POS.x + 110, y: BASE_POS.y },
      { x: BASE_POS.x - 100, y: BASE_POS.y + 100 },
      { x: BASE_POS.x, y: BASE_POS.y + 110 },
      { x: BASE_POS.x + 100, y: BASE_POS.y + 100 },
    ];
    for (const p of ring) {
      const g = this.add.graphics();
      g.setDepth(4);
      g.lineStyle(2, COLORS.slot, 0.45);
      const segs = 16;
      for (let i = 0; i < segs; i += 2) {
        const a1 = (Math.PI * 2 * i) / segs;
        const a2 = (Math.PI * 2 * (i + 1)) / segs;
        g.beginPath();
        g.arc(p.x, p.y, 24, a1, a2, false);
        g.strokePath();
      }
    }
  }
}

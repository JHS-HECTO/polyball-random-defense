import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';
import { registry } from 'systems/registry';

// 로비 — 시작 화면 + 데이터 요약 (개발 검증용).
export class LobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Lobby' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0e131c');

    const titleTop = GAME_HEIGHT * 0.14;
    this.add
      .text(GAME_WIDTH / 2, titleTop, '랜덤 디펜스', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '60px',
        color: '#ffd35e',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, titleTop + 70, '운빨로 막아내라', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '22px',
        color: '#c3cbd9',
      })
      .setOrigin(0.5);

    // 데이터 요약 카드 (개발 검증)
    const cardY = GAME_HEIGHT * 0.36;
    const card = this.add.graphics();
    card.fillStyle(0x1a212d, 0.95);
    card.lineStyle(2, 0x2c3749, 1);
    card.fillRoundedRect(GAME_WIDTH / 2 - 200, cardY - 70, 400, 200, 14);
    card.strokeRoundedRect(GAME_WIDTH / 2 - 200, cardY - 70, 400, 200, 14);
    const summary =
      `유닛 ${registry.units.length}종\n` +
      `적 ${registry.enemies.length}종 (보스 ${registry.enemies.filter((e) => e.isBoss).length})\n` +
      `합성 레시피 ${registry.mergeRecipes.length}\n` +
      `히든 조합 ${registry.hiddenRecipes.length}\n` +
      `시작 골드 ${registry.config.startGold}\n` +
      `최대 유닛 ${registry.config.maxUnits}\n` +
      `게임오버 몹 수 ${registry.config.gameOverMobCount}`;
    this.add
      .text(GAME_WIDTH / 2, cardY + 30, summary, {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '17px',
        color: '#c3cbd9',
        align: 'left',
        lineSpacing: 4,
      })
      .setOrigin(0.5);

    // 시작 버튼
    const btnY = GAME_HEIGHT * 0.7;
    const btn = this.add.container(GAME_WIDTH / 2, btnY);
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0xffb347, 1);
    btnBg.lineStyle(4, 0xd96a2c, 1);
    btnBg.fillRoundedRect(-160, -40, 320, 80, 24);
    btnBg.strokeRoundedRect(-160, -40, 320, 80, 24);
    btn.add(btnBg);
    btn.add(
      this.add
        .text(0, 0, '게임 시작', {
          fontFamily: 'Pretendard, system-ui, sans-serif',
          fontSize: '34px',
          color: '#2c1d12',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
    );
    btn.setSize(320, 80);
    btn.setInteractive(new Phaser.Geom.Rectangle(-160, -40, 320, 80), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerdown', () => btn.setScale(0.96));
    btn.on('pointerup', () => {
      btn.setScale(1);
      this.scene.start('Game');
    });
    btn.on('pointerout', () => btn.setScale(1));

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.88, '• 골드로 유닛 소환 · 동일유닛 3개 합성\n• 필드 적 100마리 초과 시 패배', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '16px',
        color: '#7d8699',
        align: 'center',
      })
      .setOrigin(0.5);
  }
}

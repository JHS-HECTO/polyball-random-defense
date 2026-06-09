import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';

// 로비 — 시작 화면 (입장권/시작 버튼). 단계 1에선 간단한 시작 화면만.
export class LobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Lobby' });
  }

  create(): void {
    // 배경
    this.cameras.main.setBackgroundColor('#0e131c');

    // 타이틀
    const titleTop = GAME_HEIGHT * 0.18;
    this.add
      .text(GAME_WIDTH / 2, titleTop, '랜덤 디펜스', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '64px',
        color: '#ffd35e',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, titleTop + 80, '운빨로 막아내라', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '24px',
        color: '#c3cbd9',
      })
      .setOrigin(0.5);

    // 시작 버튼
    const btnY = GAME_HEIGHT * 0.62;
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
    btn.on('pointerdown', () => {
      btn.setScale(0.96);
    });
    btn.on('pointerup', () => {
      btn.setScale(1);
      this.scene.start('Game');
    });
    btn.on('pointerout', () => btn.setScale(1));

    // 하단 안내
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.86, '• 골드로 유닛 소환 · 동일유닛 3개 합성\n• 필드 적 100마리 초과 시 패배', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '18px',
        color: '#7d8699',
        align: 'center',
      })
      .setOrigin(0.5);
  }
}

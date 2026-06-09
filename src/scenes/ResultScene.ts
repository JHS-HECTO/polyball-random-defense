import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';

// 결과 화면 — 단계 1 placeholder
export class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Result' });
  }

  create(data: { score?: number; wave?: number } = {}): void {
    this.cameras.main.setBackgroundColor('#0e131c');
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, '게임 오버', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '54px',
        color: '#e25555',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.45, `웨이브 ${data.wave ?? '-'}\n점수 ${(data.score ?? 0).toLocaleString()}`, {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '24px',
        color: '#c3cbd9',
        align: 'center',
      })
      .setOrigin(0.5);

    const btn = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT * 0.7);
    const bg = this.add.graphics();
    bg.fillStyle(0xffb347, 1);
    bg.lineStyle(3, 0xd96a2c, 1);
    bg.fillRoundedRect(-130, -30, 260, 60, 16);
    bg.strokeRoundedRect(-130, -30, 260, 60, 16);
    btn.add(bg);
    btn.add(
      this.add
        .text(0, 0, '로비로', {
          fontFamily: 'Pretendard, system-ui, sans-serif',
          fontSize: '24px',
          color: '#2c1d12',
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
    );
    btn.setSize(260, 60);
    btn.setInteractive(new Phaser.Geom.Rectangle(-130, -30, 260, 60), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerup', () => {
      this.scene.start('Lobby');
    });
  }
}

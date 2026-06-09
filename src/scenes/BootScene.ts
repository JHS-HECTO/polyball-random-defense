import Phaser from 'phaser';
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from 'config/game';

// 부트: 글로벌 텍스처 생성 + 다음 씬 진입.
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  create(): void {
    this.generateBaseTextures();
    this.scene.start('Lobby');
  }

  private generateBaseTextures(): void {
    // 잔디 베이스 타일 (32x32) — 미세 그라데이션
    {
      const size = 64;
      const g = this.add.graphics();
      g.fillStyle(COLORS.bgGrass, 1);
      g.fillRect(0, 0, size, size);
      g.fillStyle(COLORS.bgGrassAccent, 0.5);
      for (let i = 0; i < 14; i += 1) {
        g.fillCircle(Math.random() * size, Math.random() * size, 1 + Math.random() * 1.6);
      }
      g.generateTexture('tile-grass', size, size);
      g.destroy();
    }
    // 1x1 white pixel (틴트용)
    {
      const g = this.add.graphics();
      g.fillStyle(0xffffff, 1);
      g.fillRect(0, 0, 4, 4);
      g.generateTexture('px', 4, 4);
      g.destroy();
    }
    // 부드러운 그림자 ellipse
    {
      const g = this.add.graphics();
      g.fillStyle(0x000000, 0.35);
      g.fillEllipse(40, 12, 80, 22);
      g.generateTexture('shadow', 80, 24);
      g.destroy();
    }
    // 슬롯 점선 원 (placeholder, 동적으로도 그릴 예정)
    void GAME_WIDTH;
    void GAME_HEIGHT;
  }
}

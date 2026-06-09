import Phaser from 'phaser';
import { COLORS } from 'config/game';
import { registry } from 'systems/registry';

// 부트: JSON 데이터 + 텍스처 → 다음 씬.
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload(): void {
    // JSON 데이터 (public/data/)
    this.load.json('config', 'data/config.json');
    this.load.json('units', 'data/units.json');
    this.load.json('enemies', 'data/enemies.json');
    this.load.json('recipes', 'data/recipes.json');

    // 로딩 인디케이터
    const w = this.scale.width;
    const h = this.scale.height;
    const bar = this.add.graphics();
    const text = this.add.text(w / 2, h / 2 + 30, '데이터 로딩 중...', {
      fontFamily: 'Pretendard, system-ui, sans-serif',
      fontSize: '16px',
      color: '#c3cbd9',
    });
    text.setOrigin(0.5);

    this.load.on('progress', (p: number) => {
      bar.clear();
      bar.fillStyle(0x1a212d, 1);
      bar.fillRoundedRect(w / 2 - 120, h / 2 - 6, 240, 12, 6);
      bar.fillStyle(0xffb347, 1);
      bar.fillRoundedRect(w / 2 - 120, h / 2 - 6, 240 * p, 12, 6);
    });
  }

  create(): void {
    // 레지스트리 hydrate
    registry.loadFromCache(this);
    // eslint-disable-next-line no-console
    console.log(`[Registry] loaded: ${registry.units.length} units, ${registry.enemies.length} enemies, ${registry.mergeRecipes.length} merge, ${registry.hiddenRecipes.length} hidden`);

    this.generateBaseTextures();
    this.scene.start('Lobby');
  }

  private generateBaseTextures(): void {
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
    {
      const g = this.add.graphics();
      g.fillStyle(0xffffff, 1);
      g.fillRect(0, 0, 4, 4);
      g.generateTexture('px', 4, 4);
      g.destroy();
    }
    {
      const g = this.add.graphics();
      g.fillStyle(0x000000, 0.35);
      g.fillEllipse(40, 12, 80, 22);
      g.generateTexture('shadow', 80, 24);
      g.destroy();
    }
  }
}

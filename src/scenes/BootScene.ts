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
    try {
      this.generateBaseTextures();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[Boot] texture gen failed', e);
    }
    try {
      registry.loadFromCache(this);
      // eslint-disable-next-line no-console
      console.log(`[Registry] ${registry.units.length} units, ${registry.enemies.length} enemies`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[Boot] registry load failed', e);
    }

    // 유닛/적 스프라이트 로드 (있는 파일만 성공, 없으면 placeholder로 폴백).
    // 누락 파일은 loaderror로 무시 — 'complete'는 에러와 무관하게 발생.
    this.load.off('loaderror');
    this.load.on('loaderror', () => {/* 누락 스프라이트 무시 (placeholder 사용) */});
    // 캐시버스트 — 이미지 재가공 시 v 올리면 브라우저/CDN 옛 캐시 무시
    const V = '?v=4';
    let queued = 0;
    for (const u of registry.units) {
      if (!this.textures.exists(u.id)) { this.load.image(u.id, `data/${u.sprite}${V}`); queued += 1; }
    }
    for (const en of registry.enemies) {
      if (!this.textures.exists(en.id)) { this.load.image(en.id, `data/${en.sprite}${V}`); queued += 1; }
    }
    // 배경/이펙트 (있으면 사용, 없으면 절차적 폴백)
    const extra: Array<[string, string]> = [
      ['bg-field', 'data/bg/field.png'],
      ['bg-track', 'data/bg/track.png'],
      ['fx-baseball', 'data/fx/baseball.png'],
      ['fx-hit', 'data/fx/hit.png'],
    ];
    for (const [key, path] of extra) {
      if (!this.textures.exists(key)) { this.load.image(key, `${path}${V}`); queued += 1; }
    }
    const goNext = (): void => {
      this.game.scene.start('Lobby');
      this.scene.setVisible(false);
      this.scene.sleep();
    };
    if (queued > 0) {
      this.load.once('complete', goNext);
      this.load.start();
    } else {
      goNext();
    }
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

import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';
import { BootScene } from 'scenes/BootScene';
import { GameScene } from 'scenes/GameScene';
import { LobbyScene } from 'scenes/LobbyScene';
import { ResultScene } from 'scenes/ResultScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#0e131c',
  scale: {
    // FIT: 540×1200(9:20) 디자인 전체를 항상 표시(crop 없음 → 트랙 안 잘림).
    // 9:20 세로폰에선 letterbox 거의 0. 가장자리 작은 띠는 DOM HUD가 덮음.
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 }, debug: false },
  },
  fps: { target: 60 },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
  },
  input: { activePointers: 3 },
  scene: [BootScene, LobbyScene, GameScene, ResultScene],
};

const game = new Phaser.Game(config);
// 디버그 노출 (개발 검증용)
(window as unknown as { __game?: Phaser.Game }).__game = game;

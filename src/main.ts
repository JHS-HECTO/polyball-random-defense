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
    // ENVELOP: 캔버스가 뷰포트를 꽉 채우도록 스케일(letterbox 제거).
    // 540×960 디자인의 빈 좌우/상하 여백만 crop, 중앙 트랙은 유지.
    mode: Phaser.Scale.ENVELOP,
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

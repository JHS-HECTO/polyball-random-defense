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

new Phaser.Game(config);

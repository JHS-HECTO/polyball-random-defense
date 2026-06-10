import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';
import { createOverlay, makeButton, type OverlayHandle } from 'ui/domButton';

export class ResultScene extends Phaser.Scene {
  private overlay: OverlayHandle | null = null;

  constructor() {
    super({ key: 'Result' });
  }

  create(data: { score?: number; wave?: number; reason?: string } = {}): void {
    this.cameras.main.setBackgroundColor('#0e1116');

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.22, '게임 오버', {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '54px',
        color: '#FF4D4D',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    const reasonText = data.reason === 'boss_timeout' ? '보스를 시간 내에 처치하지 못했다' : '몹이 100마리를 넘었다';
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, reasonText, {
        fontFamily: 'Pretendard, system-ui, sans-serif',
        fontSize: '18px',
        color: '#9aa5b1',
      })
      .setOrigin(0.5);

    this.overlay = createOverlay((root) => {
      const spacer = document.createElement('div');
      spacer.style.height = '40%';
      root.appendChild(spacer);

      const stats = document.createElement('div');
      stats.style.cssText =
        'background:var(--bg-card);border:0.2rem solid var(--bg-elevated);border-radius:var(--r-md);padding:1.6rem 3rem;text-align:center;color:var(--ink-1);font-size:2rem;font-weight:700;line-height:1.8;margin-bottom:1rem;';
      stats.innerHTML =
        `도달 웨이브 <b style="color:#ffd35e">${data.wave ?? '-'}</b><br>` +
        `최종 점수 <b style="color:#ffd35e">${(data.score ?? 0).toLocaleString()}</b>`;
      root.appendChild(stats);

      root.appendChild(makeButton('다시 시작', () => this.scene.start('Game')));
      root.appendChild(makeButton('로비로', () => this.scene.start('Lobby'), true));
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.overlay?.destroy();
      this.overlay = null;
    });
  }
}

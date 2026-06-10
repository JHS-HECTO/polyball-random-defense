import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';
import { registry } from 'systems/registry';
import { createOverlay, makeButton, type OverlayHandle } from 'ui/domButton';

// 로비 — 캔버스 배경 + DOM 버튼 오버레이 (터치 안정).
export class LobbyScene extends Phaser.Scene {
  private overlay: OverlayHandle | null = null;

  constructor() {
    super({ key: 'Lobby' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0e131c');

    // 캔버스 배경 장식
    const titleTop = GAME_HEIGHT * 0.16;
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

    // DOM 오버레이 (시작 버튼)
    this.overlay = createOverlay((root) => {
      const spacerTop = document.createElement('div');
      spacerTop.style.height = '52%';
      root.appendChild(spacerTop);

      const start = makeButton('게임 시작', () => {
        this.scene.start('Game');
      });
      root.appendChild(start);

      const info = document.createElement('div');
      info.style.cssText =
        'margin-top:1.6rem;color:#7d8699;font-size:1.4rem;text-align:center;line-height:1.6;';
      info.innerHTML =
        `유닛 ${registry.units.length}종 · 적 ${registry.enemies.length}종<br>` +
        `골드로 소환 · 동일유닛 3개 합성<br>` +
        `<b style="color:#e25555">필드 적 ${registry.config.gameOverMobCount}마리 초과 시 패배</b>`;
      root.appendChild(info);
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.overlay?.destroy();
      this.overlay = null;
    });
  }
}

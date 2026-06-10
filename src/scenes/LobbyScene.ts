import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from 'config/game';
import { registry } from 'systems/registry';
import { createOverlay, makeButton, type OverlayHandle } from 'ui/domButton';

// 로비 — 캔버스 배경 + DOM 버튼 오버레이 (터치 안정).
export class LobbyScene extends Phaser.Scene {
  private overlay: OverlayHandle | null = null;
  private oddsOverlay: OverlayHandle | null = null;

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

      const odds = makeButton('소환 확률 보기', () => this.showOdds(), true);
      root.appendChild(odds);

      const info = document.createElement('div');
      info.style.cssText =
        'margin-top:16px;color:#9aa5b1;font-size:13px;text-align:center;line-height:1.6;';
      info.innerHTML =
        `야구 배트 캐릭터 ${registry.units.length}종 · 적 ${registry.enemies.length}종<br>` +
        `골드 50으로 랜덤 소환 · 자유 배치 · 판매<br>` +
        `<b style="color:#FF4D4D">트랙 적 ${registry.config.gameOverMobCount}마리 초과 시 패배</b>`;
      root.appendChild(info);
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.overlay?.destroy();
      this.overlay = null;
      this.oddsOverlay?.destroy();
      this.oddsOverlay = null;
    });
  }

  // 소환 확률 공개 (등급별)
  private showOdds(): void {
    if (this.oddsOverlay) return;
    const cfg = registry.config;
    const total = registry.gradeOrder().reduce((a, g) => a + cfg.gradeWeights[g], 0);
    const rows = registry
      .gradeOrder()
      .map((g) => {
        const pct = ((cfg.gradeWeights[g] / total) * 100).toFixed(1);
        const color = cfg.gradeColors[g];
        const label = cfg.gradeLabels[g];
        const count = registry.units.filter((u) => u.grade === g).length;
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid #2A3340;">
          <span style="display:flex;align-items:center;gap:8px;">
            <span style="width:12px;height:12px;border-radius:3px;background:${color};display:inline-block;"></span>
            <b style="color:${color};font-size:15px;">${label}</b>
            <span style="color:#9aa5b1;font-size:11px;">${count}종</span>
          </span>
          <b style="color:#fff;font-size:15px;">${pct}%</b>
        </div>`;
      })
      .join('');
    this.oddsOverlay = createOverlay((root) => {
      root.style.background = 'rgba(14,17,22,0.92)';
      const card = document.createElement('div');
      card.style.cssText =
        'background:#1A1F28;border:2px solid #2A3340;border-radius:16px;padding:20px 24px;width:84%;max-width:380px;';
      card.innerHTML =
        `<h2 style="margin:0 0 4px;color:#fff;font-size:20px;text-align:center;">소환 확률</h2>` +
        `<p style="margin:0 0 12px;color:#9aa5b1;font-size:12px;text-align:center;">게임산업진흥에 관한 법률 의무 표시</p>` +
        rows;
      root.appendChild(card);
      const close = makeButton('닫기', () => {
        this.oddsOverlay?.destroy();
        this.oddsOverlay = null;
      }, true);
      root.appendChild(close);
    });
  }
}

// DOM 기반 HUD 오버레이 (Phaser 캔버스 위).
// 캔버스 안 텍스트 대신 DOM 사용 → 폰트/레이아웃/접근성 우월.

import Phaser from 'phaser';

export type HudState = {
  nickname: string;
  wave: number;
  waveProgress: number;
  waveTotal: number;
  score: number;
  gold: number;
  tickets: number;
  ticketsCap: number;
  units: number;
  unitsMax: number;
  mobs: number;
  mobsCap: number;
  summonCost: number;
  sellMode: boolean;
  waveRemainSec: number;
  bossActive: boolean;
  bossHpRatio: number;
};

export class Hud {
  private root: HTMLElement;
  private elements: {
    top: HTMLDivElement;
    nick: HTMLSpanElement;
    wave: HTMLSpanElement;
    mobBar: HTMLDivElement;
    mobText: HTMLSpanElement;
    score: HTMLSpanElement;
    gold: HTMLSpanElement;
    tickets: HTMLSpanElement;
    timerText: HTMLSpanElement;
    bottom: HTMLDivElement;
    summonBtn: HTMLButtonElement;
    summonCost: HTMLSpanElement;
    unitCount: HTMLSpanElement;
    sellModeBtn: HTMLButtonElement;
    toast: HTMLDivElement;
    vignette: HTMLDivElement;
  } | null = null;

  private clickHandler: (() => void) | null = null;
  private sellModeHandler: ((v: boolean) => void) | null = null;
  private sellModeOn = false;
  private toastTimer: number | null = null;

  constructor(_scene: Phaser.Scene) {
    const root = document.getElementById('hud-root');
    if (!root) throw new Error('#hud-root not found');
    this.root = root;
  }

  setOnSummon(fn: () => void): void {
    this.clickHandler = fn;
  }

  setOnSellMode(fn: (v: boolean) => void): void {
    this.sellModeHandler = fn;
  }

  private sellBarEl: HTMLDivElement | null = null;

  showSellBar(title: string, refund: number, onSell: () => void): void {
    this.hideSellBar();
    const bar = document.createElement('div');
    bar.className = 'hud-sellbar';
    bar.innerHTML = `
      <span class="hud-sellbar-title">${title}</span>
      <button class="hud-sellbar-btn" type="button">판매 <b>+${refund}</b> ⛁</button>
    `;
    this.root.appendChild(bar);
    const btn = bar.querySelector('.hud-sellbar-btn') as HTMLButtonElement;
    btn.addEventListener('click', () => onSell());
    this.sellBarEl = bar;
  }

  hideSellBar(): void {
    if (this.sellBarEl) {
      this.sellBarEl.remove();
      this.sellBarEl = null;
    }
  }

  flashMessage(msg: string): void {
    if (!this.elements) return;
    const t = this.elements.toast;
    t.textContent = msg;
    t.classList.add('show');
    if (this.toastTimer !== null) window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      t.classList.remove('show');
    }, 1400);
  }

  mount(): void {
    this.root.innerHTML = '';

    // 위험 비네팅 (몹 많아지면 표시)
    const vignette = document.createElement('div');
    vignette.className = 'hud-vignette hud-noevt';
    this.root.appendChild(vignette);

    // 상단 HUD
    const top = document.createElement('div');
    top.className = 'hud-top';
    top.innerHTML = `
      <div class="hud-top-row1">
        <div class="hud-nick"><span class="hud-nick-text"></span></div>
        <div class="hud-wave"><span class="hud-wave-label">WAVE</span> <span class="hud-wave-num"></span></div>
        <div class="hud-score"><span class="hud-score-label">SCORE</span> <span class="hud-score-num"></span></div>
      </div>
      <div class="hud-mobgauge">
        <div class="hud-mobgauge-bar"><div class="hud-mobgauge-fill"></div></div>
        <span class="hud-mobgauge-text"></span>
      </div>
      <div class="hud-top-row3">
        <div class="hud-pill hud-pill-gold">
          <span class="hud-icon">⛁</span>
          <span class="hud-gold-num"></span>
        </div>
        <div class="hud-pill hud-pill-ticket">
          <span class="hud-icon">🎟</span>
          <span class="hud-ticket-num"></span>
        </div>
        <div class="hud-pill hud-pill-timer">
          <span class="hud-icon">⏱</span>
          <span class="hud-timer-text"></span>
        </div>
      </div>
    `;
    this.root.appendChild(top);

    // 토스트
    const toast = document.createElement('div');
    toast.className = 'hud-toast';
    this.root.appendChild(toast);

    // 하단 패널 (소환 버튼 + 자동합성 토글)
    const bottom = document.createElement('div');
    bottom.className = 'hud-bottom';
    bottom.innerHTML = `
      <button class="hud-sellmode" type="button">
        <span class="hud-sellmode-icon">💰</span>
        <span class="hud-sellmode-label">판매</span>
      </button>
      <button class="hud-summon" type="button">
        <span class="hud-summon-label">유닛 소환</span>
        <span class="hud-summon-cost">⛁ <span class="hud-summon-cost-num"></span></span>
        <span class="hud-summon-count"></span>
      </button>
    `;
    this.root.appendChild(bottom);

    const $ = <T extends Element = HTMLElement>(sel: string): T => {
      const el = this.root.querySelector(sel);
      if (!el) throw new Error(`HUD missing element: ${sel}`);
      return el as unknown as T;
    };

    this.elements = {
      top,
      nick: $('.hud-nick-text'),
      wave: $('.hud-wave-num'),
      mobBar: $('.hud-mobgauge-fill') as HTMLDivElement,
      mobText: $('.hud-mobgauge-text'),
      score: $('.hud-score-num'),
      gold: $('.hud-gold-num'),
      tickets: $('.hud-ticket-num'),
      timerText: $('.hud-timer-text'),
      bottom,
      summonBtn: $('.hud-summon') as HTMLButtonElement,
      summonCost: $('.hud-summon-cost-num'),
      unitCount: $('.hud-summon-count'),
      sellModeBtn: $('.hud-sellmode') as HTMLButtonElement,
      toast,
      vignette,
    };

    this.elements.summonBtn.addEventListener('click', () => this.clickHandler?.());
    this.elements.sellModeBtn.addEventListener('click', () => {
      this.sellModeOn = !this.sellModeOn;
      this.elements?.sellModeBtn.classList.toggle('on', this.sellModeOn);
      this.sellModeHandler?.(this.sellModeOn);
    });
    this.elements.sellModeBtn.classList.toggle('on', this.sellModeOn);

    this.injectStyles();
  }

  destroy(): void {
    this.sellBarEl = null;
    this.root.innerHTML = '';
    this.elements = null;
  }

  update(s: HudState): void {
    if (!this.elements) return;
    const e = this.elements;
    e.nick.textContent = s.nickname;
    e.wave.textContent = String(s.wave);
    e.score.textContent = s.score.toLocaleString();

    // ★ 메인 바 = 필드 몹 게이지 (100 차면 게임오버)
    const mobRatio = s.mobsCap > 0 ? s.mobs / s.mobsCap : 0;
    e.mobBar.style.width = `${Math.min(1, mobRatio) * 100}%`;
    e.mobText.textContent = `${s.mobs} / ${s.mobsCap}`;
    // 비율별 색 (초록→노랑→빨강)
    let barColor: string;
    if (mobRatio < 0.5) barColor = 'linear-gradient(90deg, #3DD68C 0%, #5be0a0 100%)';
    else if (mobRatio < 0.8) barColor = 'linear-gradient(90deg, #FFB020 0%, #ffc94d 100%)';
    else barColor = 'linear-gradient(90deg, #FF4D4D 0%, #ff8080 100%)';
    e.mobBar.style.background = barColor;
    const danger = mobRatio >= 0.8;
    e.mobBar.classList.toggle('danger', danger);
    e.vignette.classList.toggle('on', danger);

    // 타이머 칩: 보스전이면 보스 남은시간(빨강), 일반이면 웨이브 시간
    if (s.bossActive) {
      e.timerText.textContent = `보스 ${s.waveRemainSec}s`;
      (e.timerText.parentElement as HTMLElement).classList.add('boss');
    } else {
      e.timerText.textContent = `${s.waveRemainSec}s`;
      (e.timerText.parentElement as HTMLElement).classList.remove('boss');
    }

    e.gold.textContent = s.gold.toLocaleString();
    e.tickets.textContent = `${s.tickets}/${s.ticketsCap}`;

    e.summonCost.textContent = s.summonCost.toLocaleString();
    e.unitCount.textContent = `유닛 ${s.units}/${s.unitsMax}`;
    e.summonBtn.disabled = s.units >= s.unitsMax || s.gold < s.summonCost;
    this.sellModeOn = s.sellMode;
    e.sellModeBtn.classList.toggle('on', s.sellMode);
  }

  private injectStyles(): void {
    if (document.getElementById('hud-styles')) return;
    const style = document.createElement('style');
    style.id = 'hud-styles';
    style.textContent = `
      .hud-vignette {
        position: absolute;
        inset: 0;
        pointer-events: none;
        box-shadow: inset 0 0 0 8rem rgba(226, 85, 85, 0);
        transition: box-shadow 0.3s ease;
      }
      .hud-vignette.on {
        box-shadow: inset 0 0 0 8rem rgba(226, 85, 85, 0.25);
        animation: hud-vignette-pulse 1s ease-in-out infinite;
      }
      @keyframes hud-vignette-pulse {
        0%, 100% { box-shadow: inset 0 0 0 8rem rgba(226, 85, 85, 0.2); }
        50% { box-shadow: inset 0 0 0 8rem rgba(226, 85, 85, 0.4); }
      }

      .hud-top {
        position: absolute;
        top: 0; left: 0; right: 0;
        padding: 0.8rem 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        background: linear-gradient(180deg, rgba(10, 13, 20, 0.95) 0%, rgba(10, 13, 20, 0.55) 80%, transparent 100%);
        color: var(--ink-1);
      }

      .hud-top-row1, .hud-top-row3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.6rem;
        min-width: 0;
      }

      .hud-nick {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
      }

      .hud-nick-text {
        display: block;
        font-size: clamp(13px, 3.6vw, 16px);
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 38vw;
      }

      .hud-wave, .hud-score {
        flex: 0 0 auto;
        white-space: nowrap;
      }

      .hud-wave-label, .hud-score-label {
        font-size: 10px;
        color: var(--ink-3);
        font-weight: 600;
        letter-spacing: 0.04em;
        margin-right: 0.3rem;
      }

      .hud-wave-num {
        font-size: 18px;
        font-weight: 800;
        color: var(--accent);
      }

      .hud-score-num {
        font-size: 15px;
        font-weight: 800;
        color: var(--ink-1);
      }

      /* 메인 몹 게이지 (100 차면 게임오버) */
      .hud-mobgauge {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .hud-mobgauge-bar {
        flex: 1;
        height: 16px;
        background: rgba(255,255,255,0.1);
        border: 1px solid var(--border);
        border-radius: var(--r-pill);
        overflow: hidden;
      }
      .hud-mobgauge-fill {
        height: 100%;
        width: 0;
        background: linear-gradient(90deg, #3DD68C 0%, #5be0a0 100%);
        transition: width 0.2s ease-out;
      }
      .hud-mobgauge-fill.danger {
        animation: hud-mob-bar-pulse 0.5s ease-in-out infinite;
      }
      @keyframes hud-mob-bar-pulse {
        0%,100% { filter: brightness(1); }
        50% { filter: brightness(1.5); }
      }
      .hud-mobgauge-text {
        font-size: 14px;
        font-weight: 800;
        color: var(--ink-1);
        min-width: 64px;
        text-align: right;
        white-space: nowrap;
      }

      .hud-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 4px 10px;
        border-radius: var(--r-pill);
        font-weight: 700;
        font-size: 13px;
        color: var(--ink-1);
        white-space: nowrap;
      }

      .hud-pill-gold {
        background: rgba(246, 197, 49, 0.18);
        border: 0.1rem solid rgba(246, 197, 49, 0.5);
      }

      .hud-pill-ticket {
        background: rgba(255, 209, 102, 0.18);
        border: 0.1rem solid rgba(255, 209, 102, 0.5);
      }

      .hud-pill-timer {
        background: rgba(255,255,255,0.08);
        border: 0.1rem solid rgba(255,255,255,0.18);
        color: var(--ink-2);
      }
      .hud-pill-timer.boss {
        background: rgba(255,77,77,0.25);
        border-color: var(--danger);
        color: #fff;
      }

      .hud-icon {
        font-size: 14px;
      }

      /* 유닛 선택 판매바 (DOM, 확실한 터치) */
      .hud-sellbar {
        position: absolute;
        left: 12px; right: 12px;
        bottom: 88px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 12px;
        background: var(--bg-card);
        border: 2px solid var(--danger);
        border-radius: var(--r-md);
        box-shadow: var(--shadow-2);
        z-index: 15;
        animation: hud-sellbar-in 0.15s ease-out;
      }
      @keyframes hud-sellbar-in {
        from { transform: translateY(8px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .hud-sellbar-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--ink-1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hud-sellbar-btn {
        flex: 0 0 auto;
        min-height: 44px;
        padding: 8px 18px;
        background: var(--danger);
        color: #fff;
        border: 0;
        border-radius: var(--r-sm);
        font-family: inherit;
        font-size: 15px;
        font-weight: 800;
        white-space: nowrap;
        cursor: pointer;
      }
      .hud-sellbar-btn:active { transform: scale(0.96); }

      .hud-bottom {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 0.8rem 1.2rem calc(0.8rem + env(safe-area-inset-bottom, 0px));
        background: linear-gradient(0deg, rgba(10, 13, 20, 0.95) 0%, rgba(10, 13, 20, 0.6) 80%, transparent 100%);
        display: flex;
        flex-direction: row;
        align-items: stretch;
        gap: 0.8rem;
      }

      /* 판매모드 = 작은 토글 칩 (px 고정) */
      .hud-sellmode {
        flex: 0 0 auto;
        width: 60px;
        min-height: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: 4px;
        background: var(--bg-panel);
        border: 2px solid var(--border);
        border-radius: var(--r-md);
        color: var(--ink-3);
        font-family: inherit;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .hud-sellmode.on {
        background: rgba(255, 77, 77, 0.18);
        border-color: var(--danger);
        color: var(--ink-1);
      }
      .hud-sellmode-icon { font-size: 16px; }
      .hud-sellmode-label {
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
      }

      /* 소환 = 넓은 가로 버튼, 한 줄 */
      .hud-summon {
        position: relative;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;
        padding: 0.8rem 1.6rem;
        background: linear-gradient(180deg, #ffd35e 0%, #ffb347 100%);
        color: #2c1d12;
        border: 0.3rem solid #d96a2c;
        border-radius: var(--r-lg);
        box-shadow: var(--shadow-2);
        font-family: inherit;
        cursor: pointer;
        transition: transform 0.1s ease-out;
      }

      .hud-summon:active { transform: scale(0.97); }

      .hud-summon:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: linear-gradient(180deg, #555 0%, #333 100%);
        color: #999;
        border-color: #222;
      }

      .hud-summon-label {
        font-size: clamp(16px, 5vw, 22px);
        font-weight: 800;
        white-space: nowrap;
      }

      .hud-summon-cost {
        font-size: clamp(13px, 4vw, 17px);
        font-weight: 800;
        white-space: nowrap;
      }

      /* 슬롯 카운트는 라벨 아래 작게 (소환 버튼 안 우측 상단 미니) */
      .hud-summon-count {
        position: absolute;
        top: -0.8rem;
        right: 1.2rem;
        font-size: 1rem;
        font-weight: 700;
        color: var(--ink-2);
        background: var(--bg-card);
        padding: 0.1rem 0.6rem;
        border-radius: var(--r-pill);
        white-space: nowrap;
      }

      .hud-toast {
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translate(-50%, -10px);
        padding: 0.8rem 1.8rem;
        background: rgba(10, 13, 20, 0.9);
        border: 0.2rem solid var(--accent);
        border-radius: var(--r-pill);
        color: var(--ink-1);
        font-size: 1.6rem;
        font-weight: 800;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 5;
      }
      .hud-toast.show {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    `;
    document.head.appendChild(style);
  }
}

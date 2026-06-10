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
    toast: HTMLDivElement;
    vignette: HTMLDivElement;
  } | null = null;

  private clickHandler: (() => void) | null = null;
  private toastTimer: number | null = null;

  constructor(_scene: Phaser.Scene) {
    const root = document.getElementById('hud-root');
    if (!root) throw new Error('#hud-root not found');
    this.root = root;
  }

  setOnSummon(fn: () => void): void {
    this.clickHandler = fn;
  }

  private sellBarEl: HTMLDivElement | null = null;
  private ticketPopupEl: HTMLDivElement | null = null;

  // 유닛 정보 패널 (이름·등급·역할설명·스탯 + 판매)
  showUnitInfo(
    info: { name: string; gradeLabel: string; gradeColor: string; statLine: string; desc: string; refund: number },
    onSell: () => void,
  ): void {
    this.hideSellBar();
    const bar = document.createElement('div');
    bar.className = 'hud-sellbar hud-unitinfo';
    bar.innerHTML = `
      <div class="hud-ui-main">
        <div class="hud-ui-name">
          <span class="hud-ui-grade" style="background:${info.gradeColor}">${info.gradeLabel}</span>
          ${info.name}
        </div>
        <div class="hud-ui-stat">${info.statLine}</div>
        <div class="hud-ui-desc">${info.desc}</div>
      </div>
      <button class="hud-sellbar-btn" type="button">판매<br><b>+${info.refund}</b></button>
    `;
    bar.querySelector('.hud-sellbar-btn')?.addEventListener('click', (ev) => {
      ev.stopPropagation();
      onSell();
    });
    this.root.appendChild(bar);
    this.sellBarEl = bar;
  }

  // 보스 처치 응모권 팝업. 딤(배경) 클릭은 무시, '받기' 버튼만 닫힘.
  showTicketPopup(wave: number, onClaim: () => void): void {
    if (this.ticketPopupEl) return;
    const dim = document.createElement('div');
    dim.className = 'hud-ticket-dim';
    dim.innerHTML = `
      <div class="hud-ticket-card">
        <div class="hud-ticket-emoji">⚾</div>
        <div class="hud-ticket-title">오늘의 4번타자!</div>
        <div class="hud-ticket-sub">웨이브 ${wave} 보스 처치<br><b>응모권 1장</b> 획득</div>
        <div class="hud-ticket-pill">🎟 응모권 +1</div>
        <button class="hud-ticket-btn" type="button">받기</button>
      </div>
    `;
    // 딤 클릭 차단 (버블 막고 아무 동작 안함)
    dim.addEventListener('pointerdown', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
    });
    const btn = dim.querySelector('.hud-ticket-btn') as HTMLButtonElement;
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.hideTicketPopup();
      onClaim();
    });
    this.root.appendChild(dim);
    this.ticketPopupEl = dim;
  }

  private hideTicketPopup(): void {
    if (this.ticketPopupEl) {
      this.ticketPopupEl.remove();
      this.ticketPopupEl = null;
    }
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
      toast,
      vignette,
    };

    this.elements.summonBtn.addEventListener('click', () => this.clickHandler?.());

    this.injectStyles();
  }

  destroy(): void {
    this.sellBarEl = null;
    this.ticketPopupEl = null;
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

      .hud-unitinfo { align-items: stretch; padding: 10px 12px; }
      .hud-ui-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
      .hud-ui-name {
        font-size: 15px; font-weight: 800; color: var(--ink-1);
        display: flex; align-items: center; gap: 6px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .hud-ui-grade {
        font-size: 11px; font-weight: 800; color: #0e1116;
        padding: 1px 6px; border-radius: 6px; flex: 0 0 auto;
      }
      .hud-ui-stat { font-size: 12px; font-weight: 700; color: var(--ink-2); }
      .hud-ui-desc { font-size: 11px; color: var(--ink-3); line-height: 1.4; }

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

      /* 소환 = 풀폭 가로 버튼, 한 줄 */
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

      /* 보스 처치 응모권 팝업 (딤 클릭 무시) */
      .hud-ticket-dim {
        position: absolute;
        inset: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(10, 13, 20, 0.78);
        animation: hud-ticket-fade 0.2s ease-out;
      }
      @keyframes hud-ticket-fade { from { opacity: 0; } to { opacity: 1; } }
      .hud-ticket-card {
        width: 78%;
        max-width: 320px;
        padding: 28px 24px 24px;
        background: var(--bg-card);
        border: 2px solid var(--accent);
        border-radius: var(--r-lg);
        box-shadow: 0 0 32px rgba(255, 138, 61, 0.4), var(--shadow-2);
        text-align: center;
        animation: hud-ticket-pop 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }
      @keyframes hud-ticket-pop {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .hud-ticket-emoji {
        font-size: 56px;
        line-height: 1;
        margin-bottom: 8px;
        animation: hud-ticket-bounce 0.6s ease-in-out infinite alternate;
      }
      @keyframes hud-ticket-bounce {
        from { transform: translateY(0) rotate(-6deg); }
        to { transform: translateY(-6px) rotate(6deg); }
      }
      .hud-ticket-title {
        font-size: 22px;
        font-weight: 800;
        color: var(--accent);
        margin-bottom: 6px;
      }
      .hud-ticket-sub {
        font-size: 15px;
        color: var(--ink-2);
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .hud-ticket-sub b { color: var(--gold); font-size: 18px; }
      .hud-ticket-pill {
        display: inline-block;
        margin-bottom: 18px;
        padding: 6px 18px;
        background: rgba(255, 176, 32, 0.18);
        border: 1.5px solid var(--gold);
        border-radius: var(--r-pill);
        color: var(--gold);
        font-size: 15px;
        font-weight: 800;
      }
      .hud-ticket-btn {
        width: 100%;
        min-height: 52px;
        background: linear-gradient(180deg, #ff9a55 0%, #ff8a3d 100%);
        color: #fff;
        border: 0;
        border-radius: var(--r-md);
        font-family: inherit;
        font-size: 19px;
        font-weight: 800;
        cursor: pointer;
      }
      .hud-ticket-btn:active { transform: scale(0.97); }
    `;
    document.head.appendChild(style);
  }
}

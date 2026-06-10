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
  autoMerge: boolean;
};

export class Hud {
  private root: HTMLElement;
  private elements: {
    top: HTMLDivElement;
    nick: HTMLSpanElement;
    wave: HTMLSpanElement;
    progressBar: HTMLDivElement;
    progressText: HTMLSpanElement;
    score: HTMLSpanElement;
    gold: HTMLSpanElement;
    tickets: HTMLSpanElement;
    mobCounter: HTMLDivElement;
    mobText: HTMLSpanElement;
    mobBar: HTMLDivElement;
    bottom: HTMLDivElement;
    summonBtn: HTMLButtonElement;
    summonCost: HTMLSpanElement;
    unitCount: HTMLSpanElement;
    autoMergeBtn: HTMLButtonElement;
    toast: HTMLDivElement;
    vignette: HTMLDivElement;
  } | null = null;

  private clickHandler: (() => void) | null = null;
  private autoMergeHandler: ((v: boolean) => void) | null = null;
  private autoMergeOn = true;
  private toastTimer: number | null = null;

  constructor(_scene: Phaser.Scene) {
    const root = document.getElementById('hud-root');
    if (!root) throw new Error('#hud-root not found');
    this.root = root;
  }

  setOnSummon(fn: () => void): void {
    this.clickHandler = fn;
  }

  setOnAutoMerge(fn: (v: boolean) => void): void {
    this.autoMergeHandler = fn;
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
      <div class="hud-progress">
        <div class="hud-progress-bar"><div class="hud-progress-fill"></div></div>
        <span class="hud-progress-text"></span>
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
        <div class="hud-mob-counter">
          <span class="hud-mob-icon">⚠</span>
          <span class="hud-mob-text"></span>
        </div>
      </div>
      <div class="hud-mob-bar"><div class="hud-mob-bar-fill"></div></div>
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
      <button class="hud-automerge" type="button">
        <span class="hud-automerge-dot"></span>
        <span class="hud-automerge-label">자동합성</span>
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
      progressBar: $('.hud-progress-fill') as HTMLDivElement,
      progressText: $('.hud-progress-text'),
      score: $('.hud-score-num'),
      gold: $('.hud-gold-num'),
      tickets: $('.hud-ticket-num'),
      mobCounter: $('.hud-mob-counter') as HTMLDivElement,
      mobText: $('.hud-mob-text'),
      mobBar: $('.hud-mob-bar-fill') as HTMLDivElement,
      bottom,
      summonBtn: $('.hud-summon') as HTMLButtonElement,
      summonCost: $('.hud-summon-cost-num'),
      unitCount: $('.hud-summon-count'),
      autoMergeBtn: $('.hud-automerge') as HTMLButtonElement,
      toast,
      vignette,
    };

    this.elements.summonBtn.addEventListener('click', () => this.clickHandler?.());
    this.elements.autoMergeBtn.addEventListener('click', () => {
      this.autoMergeOn = !this.autoMergeOn;
      this.elements?.autoMergeBtn.classList.toggle('on', this.autoMergeOn);
      this.autoMergeHandler?.(this.autoMergeOn);
    });
    this.elements.autoMergeBtn.classList.toggle('on', this.autoMergeOn);

    this.injectStyles();
  }

  destroy(): void {
    this.root.innerHTML = '';
    this.elements = null;
  }

  update(s: HudState): void {
    if (!this.elements) return;
    const e = this.elements;
    e.nick.textContent = s.nickname;
    e.wave.textContent = String(s.wave);
    e.score.textContent = s.score.toLocaleString();
    const ratio = s.waveTotal > 0 ? s.waveProgress / s.waveTotal : 0;
    e.progressBar.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
    e.progressText.textContent = `${s.waveProgress}/${s.waveTotal}`;
    e.gold.textContent = s.gold.toLocaleString();
    e.tickets.textContent = `${s.tickets}/${s.ticketsCap}`;
    e.mobText.textContent = `${s.mobs}/${s.mobsCap}`;
    const mobRatio = s.mobsCap > 0 ? s.mobs / s.mobsCap : 0;
    e.mobBar.style.width = `${Math.min(1, mobRatio) * 100}%`;
    // 위험 등급에 따른 색
    const danger = mobRatio >= 0.8;
    e.mobCounter.classList.toggle('danger', danger);
    e.mobBar.classList.toggle('danger', danger);
    e.vignette.classList.toggle('on', danger);

    e.summonCost.textContent = s.summonCost.toLocaleString();
    e.unitCount.textContent = `유닛 ${s.units}/${s.unitsMax}`;
    e.summonBtn.disabled = s.units >= s.unitsMax || s.gold < s.summonCost;
    this.autoMergeOn = s.autoMerge;
    e.autoMergeBtn.classList.toggle('on', s.autoMerge);
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
      }

      .hud-nick-text {
        font-size: 1.4rem;
        font-weight: 700;
      }

      .hud-wave-label, .hud-score-label {
        font-size: 1rem;
        color: var(--ink-3);
        font-weight: 600;
        letter-spacing: 0.04em;
        margin-right: 0.3rem;
      }

      .hud-wave-num {
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--accent);
      }

      .hud-score-num {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--ink-1);
      }

      .hud-progress {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .hud-progress-bar {
        flex: 1;
        height: 0.8rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--r-pill);
        overflow: hidden;
      }

      .hud-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent) 0%, var(--accent-strong) 100%);
        width: 0;
        transition: width 0.18s ease-out;
      }

      .hud-progress-text {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--ink-2);
        min-width: 4rem;
        text-align: right;
      }

      .hud-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 0.8rem;
        border-radius: var(--r-pill);
        font-weight: 700;
        font-size: 1.3rem;
        color: var(--ink-1);
      }

      .hud-pill-gold {
        background: rgba(246, 197, 49, 0.18);
        border: 0.1rem solid rgba(246, 197, 49, 0.5);
      }

      .hud-pill-ticket {
        background: rgba(255, 209, 102, 0.18);
        border: 0.1rem solid rgba(255, 209, 102, 0.5);
      }

      .hud-icon {
        font-size: 1.4rem;
      }

      .hud-mob-counter {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 0.8rem;
        border-radius: var(--r-pill);
        background: rgba(255, 255, 255, 0.08);
        border: 0.1rem solid rgba(255, 255, 255, 0.18);
        font-weight: 700;
        font-size: 1.3rem;
        color: var(--ink-2);
        transition: all 0.2s ease;
      }

      .hud-mob-counter.danger {
        background: rgba(226, 85, 85, 0.3);
        border-color: var(--danger);
        color: var(--ink-1);
        animation: hud-mob-blink 0.6s ease-in-out infinite;
      }

      @keyframes hud-mob-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .hud-mob-icon {
        font-size: 1.3rem;
      }

      .hud-mob-bar {
        height: 0.5rem;
        background: rgba(255, 255, 255, 0.08);
        border-radius: var(--r-pill);
        overflow: hidden;
      }

      .hud-mob-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--ok) 0%, var(--warn) 60%, var(--danger) 100%);
        width: 0;
        transition: width 0.18s ease-out;
      }

      .hud-mob-bar-fill.danger {
        animation: hud-mob-bar-pulse 0.5s ease-in-out infinite;
      }
      @keyframes hud-mob-bar-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.4); }
      }

      .hud-bottom {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 1rem 1.4rem 1.6rem;
        background: linear-gradient(0deg, rgba(10, 13, 20, 0.95) 0%, rgba(10, 13, 20, 0.6) 80%, transparent 100%);
        display: flex;
        align-items: stretch;
        gap: 0.8rem;
      }

      .hud-automerge {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        padding: 0 1.2rem;
        background: var(--bg-panel);
        border: 0.2rem solid var(--bg-elevated);
        border-radius: var(--r-md);
        color: var(--ink-3);
        font-family: inherit;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .hud-automerge.on {
        background: rgba(91, 185, 91, 0.18);
        border-color: var(--ok);
        color: var(--ink-1);
      }
      .hud-automerge-dot {
        width: 1rem; height: 1rem;
        border-radius: 50%;
        background: var(--ink-3);
      }
      .hud-automerge.on .hud-automerge-dot {
        background: var(--ok);
        box-shadow: 0 0 0.6rem var(--ok);
      }
      .hud-automerge-label {
        font-size: 1rem;
        font-weight: 700;
        white-space: nowrap;
      }

      .hud-summon {
        flex: 1;
        display: grid;
        grid-template-areas:
          'label cost'
          'count count';
        gap: 0.2rem 1rem;
        padding: 1rem 1.4rem;
        background: linear-gradient(180deg, #ffd35e 0%, #ffb347 100%);
        color: #2c1d12;
        border: 0.3rem solid #d96a2c;
        border-radius: var(--r-lg);
        box-shadow: var(--shadow-2);
        font-family: inherit;
        cursor: pointer;
        transition: transform 0.1s ease-out;
      }

      .hud-summon:active {
        transform: scale(0.97);
      }

      .hud-summon:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: linear-gradient(180deg, #555 0%, #333 100%);
        color: #999;
        border-color: #222;
      }

      .hud-summon-label {
        grid-area: label;
        font-size: 2rem;
        font-weight: 800;
        text-align: left;
      }

      .hud-summon-cost {
        grid-area: cost;
        font-size: 1.5rem;
        font-weight: 800;
        text-align: right;
      }

      .hud-summon-count {
        grid-area: count;
        font-size: 1.1rem;
        font-weight: 600;
        color: #5a3a0a;
        text-align: center;
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

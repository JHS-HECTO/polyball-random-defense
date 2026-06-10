// #hud-root 위 DOM 버튼 오버레이 헬퍼. 캔버스 input 불안정 회피 (터치 100%).

let stylesInjected = false;

const injectStyles = (): void => {
  if (stylesInjected) return;
  stylesInjected = true;
  const s = document.createElement('style');
  s.id = 'dom-overlay-styles';
  s.textContent = `
    .ovl {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.2rem;
      padding: 2.4rem;
      z-index: 20;
    }
    .ovl-spacer { flex: 1; }
    .ovl-btn {
      padding: 1.4rem 3.2rem;
      background: linear-gradient(180deg, #ffd35e 0%, #ffb347 100%);
      color: #2c1d12;
      border: 0.3rem solid #d96a2c;
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-2);
      font-family: inherit;
      font-size: 2.4rem;
      font-weight: 800;
      cursor: pointer;
      transition: transform 0.1s ease;
    }
    .ovl-btn:active { transform: scale(0.96); }
    .ovl-btn-sub {
      background: var(--bg-panel);
      color: var(--ink-1);
      border-color: var(--bg-elevated);
      font-size: 1.8rem;
      padding: 1.1rem 2.4rem;
    }
  `;
  document.head.appendChild(s);
};

export type OverlayHandle = {
  el: HTMLDivElement;
  destroy: () => void;
};

// 오버레이 컨테이너 생성. content() 콜백으로 내부 DOM 채움.
export const createOverlay = (build: (root: HTMLDivElement) => void): OverlayHandle => {
  injectStyles();
  const root = document.getElementById('hud-root');
  if (!root) throw new Error('#hud-root not found');
  const el = document.createElement('div');
  el.className = 'ovl';
  build(el);
  root.appendChild(el);
  return {
    el,
    destroy: () => el.remove(),
  };
};

export const makeButton = (label: string, onClick: () => void, sub = false): HTMLButtonElement => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = sub ? 'ovl-btn ovl-btn-sub' : 'ovl-btn';
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
};

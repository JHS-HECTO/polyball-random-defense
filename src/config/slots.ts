import { BASE_POS } from './game';

// 본거지 주변 12 슬롯 (내 4 + 외 8). 배치 좌표.
export type SlotDef = { index: number; x: number; y: number };

const inner = (deg: number, r: number): { x: number; y: number } => {
  const a = (deg * Math.PI) / 180;
  return { x: BASE_POS.x + Math.cos(a) * r, y: BASE_POS.y + Math.sin(a) * r };
};

export const SLOTS: SlotDef[] = [
  // 내부 링 (대각 4)
  { index: 0, ...inner(-45, 95) },
  { index: 1, ...inner(45, 95) },
  { index: 2, ...inner(135, 95) },
  { index: 3, ...inner(225, 95) },
  // 외부 링 (8방)
  { index: 4, ...inner(-90, 160) },
  { index: 5, ...inner(-45, 165) },
  { index: 6, ...inner(0, 160) },
  { index: 7, ...inner(45, 165) },
  { index: 8, ...inner(90, 160) },
  { index: 9, ...inner(135, 165) },
  { index: 10, ...inner(180, 160) },
  { index: 11, ...inner(225, 165) },
].map((s, i) => ({ index: i, x: Math.round(s.x), y: Math.round(s.y) }));

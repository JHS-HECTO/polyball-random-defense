import { BASE_POS } from './game';

// 본거지 주변 12 슬롯 (트랙 안쪽). 유닛 사거리가 둘레 트랙에 닿도록 배치.
// 내부 링 4 (본거지 근접) + 외부 링 8 (트랙 가까이).
export type SlotDef = { index: number; x: number; y: number };

const ring = (deg: number, rx: number, ry: number): { x: number; y: number } => {
  const a = (deg * Math.PI) / 180;
  return { x: BASE_POS.x + Math.cos(a) * rx, y: BASE_POS.y + Math.sin(a) * ry };
};

// 트랙이 사각형이라 가로로 더 넓음 → 타원 배치 (rx > ry)
export const SLOTS: SlotDef[] = [
  // 내부 4 (대각)
  ring(-45, 78, 70),
  ring(45, 78, 70),
  ring(135, 78, 70),
  ring(225, 78, 70),
  // 외부 8
  ring(-90, 0, 130),
  ring(-30, 150, 110),
  ring(0, 165, 0),
  ring(30, 150, 110),
  ring(90, 0, 130),
  ring(150, 150, 110),
  ring(180, 165, 0),
  ring(210, 150, 110),
].map((s, i) => ({ index: i, x: Math.round(s.x), y: Math.round(s.y) }));

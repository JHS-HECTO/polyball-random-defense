// 게임 캔버스/필드 베이스 상수. 밸런싱은 별도 config.json.
export const GAME_WIDTH = 540;
export const GAME_HEIGHT = 960; // 9:16

// HUD 점유 높이 + 하단 패널
export const TOP_HUD_HEIGHT = 140;
export const BOTTOM_PANEL_HEIGHT = 160;

// 필드 좌표 (정사각 가까운 가운데 필드)
export const FIELD = {
  top: TOP_HUD_HEIGHT + 20,            // 160
  bottom: GAME_HEIGHT - BOTTOM_PANEL_HEIGHT - 20, // 780
  left: 30,
  right: GAME_WIDTH - 30,              // 510
};
export const FIELD_CENTER_X = (FIELD.left + FIELD.right) / 2; // 270
export const FIELD_CENTER_Y = (FIELD.top + FIELD.bottom) / 2; // 470

// 본거지 (성) 위치 = 필드 중앙
export const BASE_POS = { x: FIELD_CENTER_X, y: FIELD_CENTER_Y };
export const BASE_RADIUS = 50;

// 색 — 인게임 캔버스용 hex
export const COLORS = {
  bgGrass: 0x2a3a2e,
  bgGrassAccent: 0x37503e,
  bgFrame: 0x1a212d,
  fieldBorder: 0x4a5a72,
  slot: 0x6b7894,
  slotActive: 0xffd35e,
  base: 0xd6dbe5,
  baseShadow: 0x6a6f7d,
  baseRoof: 0xa53939,
  text: 0xffffff,
  textDim: 0xc3cbd9,
} as const;

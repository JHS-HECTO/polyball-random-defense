// 게임 캔버스/필드 베이스 상수. 밸런싱은 별도 config.json.
export const GAME_WIDTH = 540;
export const GAME_HEIGHT = 1200; // 9:20 — 현대 세로폰 비율에 맞춤(FIT letterbox 최소화)

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
export const BASE_RADIUS = 44;

// 순환 트랙 — 본거지를 감싸는 사각 링 (닫힌 루프). 적이 따라 돈다.
// 시계방향 waypoint. 모서리 라운드는 시각만, 이동은 직선 보간.
export const TRACK = {
  left: 38,
  right: GAME_WIDTH - 38,   // 502
  top: 250,                 // HUD 바로 아래 (디자인 9:20 기준)
  bottom: 1010,             // 하단 독 바로 위까지 → 세로 가득
  corner: 46,               // 모서리 라운드 반경 (시각)
} as const;

// waypoint 닫힌 루프 (시계방향, 좌상 시작)
export const TRACK_WAYPOINTS: ReadonlyArray<{ x: number; y: number }> = [
  { x: TRACK.left, y: TRACK.top },
  { x: TRACK.right, y: TRACK.top },
  { x: TRACK.right, y: TRACK.bottom },
  { x: TRACK.left, y: TRACK.bottom },
];

// 유닛 배치 가능 영역 = 트랙 안쪽 사각 (길/트랙엔 못 놓음).
// 트랙 중심선 + 폭절반(22) + 유닛반경(26) 안쪽.
export const PLACE_AREA = {
  left: TRACK.left + 48,    // 128
  right: TRACK.right - 48,  // 412
  top: TRACK.top + 48,      // 298
  bottom: TRACK.bottom - 48, // 642
} as const;

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

# 폴리볼 랜덤 디펜스

운빨 머지 타워디펜스 미니게임. Phaser 3 + Vite + TypeScript. 폴리볼 앱 웹뷰 임베드.

## 핵심 규칙

- 9:16 세로 화면
- 골드로 랜덤 유닛 소환 → 슬롯 배치 → 동일 3개 합성 → Lv업/진화
- 적은 가장자리에서 본거지로 진군. 유닛이 사거리 내 자동 공격
- **필드 생존 몹 100마리 초과 = 게임오버** (라이프 X)
- 5웨이브 보스, 10웨이브 광폭화

## 스택

- TypeScript strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Phaser 3.90 (게임 캔버스)
- Vite 8 (빌드)
- DOM 기반 HUD 오버레이 (캔버스 위)

## 개발

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build
pnpm preview
```

## 디렉터리

```
src/
  main.ts                  # Phaser.Game 부트스트랩
  config/
    game.ts                # 캔버스/필드 좌표 상수
    config.json            # 밸런싱 (소환비용/등급가중/공격/HP/스폰...)
  scenes/
    BootScene.ts           # 텍스처 생성 + 다음 씬
    LobbyScene.ts          # 시작 화면
    GameScene.ts           # 메인 게임 루프
    ResultScene.ts         # 게임 오버
  ui/
    Hud.ts                 # DOM HUD 오버레이 (몹 카운터 포함)
public/
  assets/
    units/                 # 유닛 PNG
    enemies/               # 적 PNG
    tiles/                 # 타일 PNG
    ui/                    # UI PNG
```

## 단계별 구현

1. ✅ 스택 세팅 + 씬 골격 + HUD (생존 몹 카운터)
2. ⏳ config/units/enemies/recipes JSON + 로더
3. ⏳ 소환 + 슬롯 배치 + 인벤토리
4. ⏳ 합성/진화 + 레시피 + 자동합성
5. ⏳ 적 스폰/이동 + 자동 공격 + 상성 + 몹 100 게임오버
6. ⏳ 웨이브/보스/광폭화 + 골드 + 점수
7. ⏳ 절차적 애니메이션
8. ⏳ 입장권/부활 + AdService 스텁
9. ⏳ 확률공개/약관
10. ⏳ 에셋 교체 포인트 + Vercel 배포

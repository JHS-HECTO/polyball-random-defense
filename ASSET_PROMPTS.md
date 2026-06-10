# 폴리볼 랜덤 디펜스 — 에셋 생성 프롬프트 시트

야구 컨셉 모바일 세로형(9:16) 랜덤 디펜스. 모든 캐릭터는 **방망이를 든 야구 선수**가
야구공을 던져 공격. 등급이 높을수록 시각적으로 **확연히 강해 보여야 함**.

생성 도구: Gemini(Imagen), DALL·E, SDXL 등 무관. 아래 **글로벌 스타일 + 네거티브**를
매 프롬프트에 붙이고, 섹션별 본문을 조합.

---

## 0. 공통 규격 (Phaser 스프라이트 요구사항)

- **포맷**: PNG, **투명 배경(알파)** 필수. 배경/바닥 그림자 굽지 말 것(엔진이 그림자 따로 그림).
- **캔버스**: 정사각 **512×512**, 캐릭터 중앙 정렬, 위아래 여백 일정(머리 위 ~10%, 발 아래 ~6%).
- **시점**: 살짝 위에서 본 **3/4 정면 치비(chibi)**. 작은 크기(화면 ~50px)에서도 또렷하게.
- **스타일**: 모바일 가챠 TD 풍 클린 셀셰이딩, 굵은 외곽선, 높은 채도/대비, 좌상단 광원 통일.
- **실루엣**: 한 덩어리로 읽히는 강한 실루엣. 디테일은 큼직하게(작게 보이므로).
- **정렬 통일**: 모든 유닛 동일 스케일·동일 발 기준선. 정면 바라보게(좌우 안 틀어짐).

### 글로벌 스타일 (모든 프롬프트 앞에 붙임)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline,
high saturation, soft top-left lighting, centered single character, full body,
transparent background, no ground shadow, sharp readable silhouette,
front 3/4 view, consistent scale, 512x512, baseball theme
```

### 네거티브 (모든 프롬프트)
```
realistic photo, text, watermark, signature, multiple characters, cropped, blurry,
extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

### 속성 악센트 컬러 (유니폼/이펙트 포인트 색)
| 속성 | HEX | 느낌 |
|---|---|---|
| fire 화염 | `#E2553F` | 빨강 |
| water 물 | `#4AA3DF` | 파랑 |
| wind 바람 | `#6ED0A0` | 청록/민트 |
| earth 대지 | `#B08850` | 갈색/황토 |
| light 빛 | `#F0E0A0` | 금/크림 |
| dark 어둠 | `#8163B0` | 보라 |

---

## 1. 유닛 (42개) — `public/data/units/<id>.png`

조합식: **[글로벌 스타일] + [역할 본문] + [등급 모디파이어] + [속성 악센트색] + [네거티브]**

파일명 = `units/{grade}_{role}.png` (예 `units/legendary_sniper.png`).

### 1-A. 역할 본문 (7종)

| 역할 id | 이름 | 본문 프롬프트 (영문) |
|---|---|---|
| `contact` | 교타자 | `a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe` |
| `slugger` | 강타자 | `a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger` |
| `speedster`| 연타자 | `a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick` |
| `splasher` | 거포 | `a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel` |
| `sniper` | 저격수 | `a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe` |
| `buffer` | 코치 | `a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor (NO bat)` |
| `slower` | 투수코치 | `a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling/calming aura, tactical (NO bat)` |

> 코치/투수코치(지원형)는 **배트 대신** 클립보드·스톱워치 소품. 다른 톤(서포터).

### 1-B. 등급 모디파이어 (6단계 — 위로 갈수록 화려·강함)

| 등급 id | 표기 | 모디파이어 프롬프트 |
|---|---|---|
| `common` | 일반 | `worn gray sandlot uniform, plain wooden bat, matte, no glow, humble amateur` |
| `rare` | 희귀 | `clean blue team uniform with metal trim, polished aluminum bat, faint glow, semi-pro` |
| `epic` | 영웅 | `purple hero uniform with shoulder emblem and pads, glowing energy bat, soft magic aura, elite` |
| `legendary` | 전설 | `golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic, powerful` |
| `mythic_low`| 에픽 | `teal holographic techno uniform with energy wings, plasma bat, strong glowing particles, futuristic super` |
| `mythic` | 신화 | `gold and rainbow holographic divine uniform, halo and floating runes behind, mythic energy bat, overwhelming radiant aura, godlike, most powerful` |

### 1-C. 속성 매핑 (units.json 기준 — 유니폼/이펙트 포인트색)

```
common:  contact=fire  slugger=water  speedster=wind  splasher=earth  sniper=light  buffer=?  slower=?
rare:    contact=dark   slugger=fire   speedster=water splasher=wind   sniper=?      ...
```
> 실제 속성은 `public/data/units.json`의 각 유닛 `element` 필드를 따름. 악센트색만 1-A/1-B에 합쳐 사용.

### 조합 예시 — `units/legendary_sniper.png`
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline,
high saturation, soft top-left lighting, centered single character, full body,
transparent background, no ground shadow, sharp readable silhouette, front 3/4 view,
consistent scale, 512x512, baseball theme,
a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat
like a rifle, scope visor, sniper vibe,
golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic,
powerful, light/cream gold accent color
--no realistic photo, text, watermark, multiple characters, drop shadow, frame, border
```

**42개 = 7역할 × 6등급.** 위 표를 곱해서 전부 생성.

---

## 2. 일반 적 (6개) — `public/data/enemies/<id>.png`

작은 몬스터, 둥근 실루엣, 트랙을 도는 잡몹. 동일 치비/셀셰이딩 스타일.
※ 특수유형(runner/armored/splitter/healer)은 엔진이 색틴트+배지로 표현 → **추가 이미지 불필요**.

| 파일 | 이름 | 프롬프트 본문 |
|---|---|---|
| `enemies/m_imp.png` | 임프 | `tiny red fire imp monster, round body, little horns, mischievous grin, ember flecks` |
| `enemies/m_slime.png`| 슬라임 | `blue water slime blob, glossy translucent, jiggly round, cute simple eyes` |
| `enemies/m_wisp.png` | 윕 | `mint-green wind wisp spirit, wispy round body, tiny wings, airy swirl` |
| `enemies/m_rocky.png`| 락키 | `brown earth rock golem mini, chunky round boulder body, mossy bits, sturdy` |
| `enemies/m_seraph_minion.png`| 타락천사 | `pale gold fallen-angel minion, small round body, broken halo, single tattered wing` |
| `enemies/m_shade.png`| 그림자 | `purple shadow creature, round dark smoky body, glowing eyes, wispy edges` |

규격: 글로벌 스타일 + 위 본문 + `simple round monster, no bat, no baseball gear`. 512×512 투명.

---

## 3. 보스 (5개) — `public/data/enemies/<id>.png`

크고 위협적, 화면을 압도. 정면 3/4, 강한 실루엣. 512×512(보스는 700~800 권장도 가능).

| 파일 | 이름 | 프롬프트 본문 |
|---|---|---|
| `enemies/b_lava_drake.png` | 용암 드레이크 | `massive lava dragon boss, molten cracks glowing orange, smoke, fierce, fire element` |
| `enemies/b_kraken.png` | 크라켄 | `giant blue kraken boss, many thick tentacles, glowing eyes, dripping water, sea element` |
| `enemies/b_storm_giant.png`| 폭풍 거인 | `towering green storm giant boss, crackling lightning, swirling wind, stormy aura` |
| `enemies/b_titan_lord.png` | 타이탄 군주 | `colossal brown stone titan lord boss, rocky armor, glowing core, earth element, huge` |
| `enemies/b_void_lord.png` | 공허 군주 | `dark purple void lord boss, cosmic robe, floating dark crystals, glowing void eyes, ominous` |

규격: 글로벌 스타일 + 본문 + `imposing boss monster, dramatic, powerful`. 투명 배경.

---

## 4. 배경 / 필드 — `public/data/bg/`

세로형 야구장 탑다운. 게임은 **사각 순환 트랙**(적이 시계방향으로 돎) + 안쪽 배치영역.

| 파일 | 용도 | 프롬프트 |
|---|---|---|
| `bg/field.png` | 메인 필드(타일 가능) | `top-down baseball field turf, clean green grass with subtle mowing stripes, faint diamond infield dirt arc in corner, seamless tileable texture, soft, no players, no lines clutter` |
| `bg/track.png` | 순환 트랙 길(선택) | `top-down running track dirt path, warm tan baseball infield dirt, subtle texture, seamless, for a square loop path` |
| `bg/stadium_vignette.png`| 가장자리 분위기(선택) | `top-down stadium edge vignette, dark stands and dugout silhouettes around the border, transparent center, mobile game ambiance` |

> 현재 엔진은 절차적 잔디 타일(`tile-grass`) 사용 중 → `bg/field.png`로 교체하면 질 상승.

---

## 5. 발사체 / 이펙트 — `public/data/fx/`

| 파일 | 용도 | 프롬프트 |
|---|---|---|
| `fx/baseball.png` | 야구공 탄환 | `a single white baseball with red stitching, clean, slight motion glow, centered, 128x128, transparent background` |
| `fx/hit.png` | 타격 임팩트(선택) | `cartoon impact star burst, white-yellow, comic pow effect, transparent, 128x128` |
| `fx/swing_arc.png`| 배트 스윙 잔상(선택) | `curved motion blur swing arc, white translucent crescent, transparent, 256x256` |

> hit/swing/사망 연출은 현재 트윈으로 절차 처리 중 → 이미지로 교체 시 더 좋음(선택).

---

## 6. UI 아이콘 — `public/data/ui/`

| 파일 | 용도 | 프롬프트 |
|---|---|---|
| `ui/coin.png` | 골드(소환비용) | `a shiny gold coin with a small baseball emboss, mobile game currency icon, clean, 128x128, transparent` |
| `ui/ticket.png`| 응모권(오늘의 4번타자) | `a golden raffle ticket icon with a star and baseball motif, glossy, 128x128, transparent` |
| `ui/summon.png`| 소환 버튼 글로시(선택) | `glossy orange capsule button background, gacha summon, soft gradient, rounded, 512x160, transparent` |

> 현재 골드/티켓은 이모지(⚾🎟) 사용 중 → 아이콘 교체 시 통일감 ↑.

---

## 생성 우선순위 (시간 아끼려면)

1. **유닛 42개** (게임 핵심·등급 차별화). 시간 없으면 등급별 1역할씩 먼저.
2. **보스 5개** (임팩트 큼).
3. **일반몹 6개**.
4. **야구공 `fx/baseball.png`** (가장 자주 보임).
5. **`bg/field.png`** 잔디.
6. UI 아이콘.

생성 후 `public/data/` 아래 경로대로 넣으면, Boot 로더에 `this.load.image(id, sprite)` 추가 +
UnitEntity/EnemyEntity에서 플레이스홀더 대신 `scene.add.image(0,0,id)` 사용하도록 교체 작업 진행.

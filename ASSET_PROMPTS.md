# 폴리볼 랜덤 디펜스 — 에셋 생성 프롬프트 (완성형, 복붙용)

야구 컨셉 세로형(9:20) 랜덤 디펜스. 모든 캐릭터=방망이 든 야구선수가 야구공 던져 공격.
등급 높을수록 시각적으로 확연히 강해 보임. 아래 각 프롬프트는 **글로벌 스타일이 이미 앞에 붙은** 완성형 → 그대로 복사해 이미지 생성기(Imagen/DALL·E/SDXL)에 붙이면 됨.

## 파일 저장 위치

생성한 PNG를 아래 경로에 그대로 저장 (파일명 = 코드의 sprite 키와 1:1):

```
polyball-random-defense/
└─ public/data/
   ├─ units/      ← 유닛 42개 (예: units/legendary_sniper.png)
   ├─ enemies/    ← 일반몹 6 + 보스 5 (예: enemies/m_imp.png, enemies/b_kraken.png)
   ├─ bg/         ← 배경/필드 (예: bg/field.png)
   ├─ fx/         ← 발사체/이펙트 (예: fx/baseball.png)
   └─ ui/         ← UI 아이콘 (예: ui/coin.png)
```

Windows 절대경로: `C:\Users\rest\polyball-random-defense\public\data\...`

규격: PNG, 투명배경(알파), 정사각, 캐릭터 중앙정렬, 무그림자(엔진이 그림자 따로 그림).

---

## 1. 유닛 42개 — `public/data/units/<파일명>`


### [일반] common

**`units/common_contact.png`** — 일반 교타자 (fire)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe, worn gray sandlot uniform, plain wooden bat, matte, no glow, humble amateur, fiery red accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/common_slugger.png`** — 일반 강타자 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger, worn gray sandlot uniform, plain wooden bat, matte, no glow, humble amateur, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/common_speedster.png`** — 일반 연타자 (wind)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick, worn gray sandlot uniform, plain wooden bat, matte, no glow, humble amateur, mint green accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/common_splasher.png`** — 일반 거포 (earth)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel, worn gray sandlot uniform, plain wooden bat, matte, no glow, humble amateur, earthy brown accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/common_sniper.png`** — 일반 저격수 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe, worn gray sandlot uniform, plain wooden bat, matte, no glow, humble amateur, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/common_buffer.png`** — 일반 코치 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor, no bat, worn gray coach jacket and cap, matte, no glow, humble amateur, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/common_slower.png`** — 일반 투수코치 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling calming aura, tactical, no bat, worn gray coach jacket and cap, matte, no glow, humble amateur, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```


### [희귀] rare

**`units/rare_contact.png`** — 희귀 교타자 (dark)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe, clean blue team uniform with metal trim, polished aluminum bat, faint glow, semi-pro, deep purple accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/rare_slugger.png`** — 희귀 강타자 (fire)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger, clean blue team uniform with metal trim, polished aluminum bat, faint glow, semi-pro, fiery red accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/rare_speedster.png`** — 희귀 연타자 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick, clean blue team uniform with metal trim, polished aluminum bat, faint glow, semi-pro, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/rare_splasher.png`** — 희귀 거포 (wind)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel, clean blue team uniform with metal trim, polished aluminum bat, faint glow, semi-pro, mint green accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/rare_sniper.png`** — 희귀 저격수 (earth)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe, clean blue team uniform with metal trim, polished aluminum bat, faint glow, semi-pro, earthy brown accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/rare_buffer.png`** — 희귀 코치 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor, no bat, clean blue coach uniform with metal whistle, faint glow, semi-pro, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/rare_slower.png`** — 희귀 투수코치 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling calming aura, tactical, no bat, clean blue coach uniform with metal whistle, faint glow, semi-pro, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```


### [영웅] epic

**`units/epic_contact.png`** — 영웅 교타자 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe, purple hero uniform with shoulder emblem and pads, glowing energy bat, soft magic aura, elite, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/epic_slugger.png`** — 영웅 강타자 (dark)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger, purple hero uniform with shoulder emblem and pads, glowing energy bat, soft magic aura, elite, deep purple accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/epic_speedster.png`** — 영웅 연타자 (fire)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick, purple hero uniform with shoulder emblem and pads, glowing energy bat, soft magic aura, elite, fiery red accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/epic_splasher.png`** — 영웅 거포 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel, purple hero uniform with shoulder emblem and pads, glowing energy bat, soft magic aura, elite, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/epic_sniper.png`** — 영웅 저격수 (wind)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe, purple hero uniform with shoulder emblem and pads, glowing energy bat, soft magic aura, elite, mint green accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/epic_buffer.png`** — 영웅 코치 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor, no bat, purple coach uniform with emblem and pads, soft glowing magic aura, elite, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/epic_slower.png`** — 영웅 투수코치 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling calming aura, tactical, no bat, purple coach uniform with emblem and pads, soft glowing magic aura, elite, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```


### [전설] legendary

**`units/legendary_contact.png`** — 전설 교타자 (earth)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe, golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic, powerful, earthy brown accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/legendary_slugger.png`** — 전설 강타자 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger, golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic, powerful, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/legendary_speedster.png`** — 전설 연타자 (dark)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick, golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic, powerful, deep purple accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/legendary_splasher.png`** — 전설 거포 (fire)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel, golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic, powerful, fiery red accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/legendary_sniper.png`** — 전설 저격수 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe, golden-orange ornate armored uniform, blazing legendary bat, bright radiant aura, dramatic, powerful, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/legendary_buffer.png`** — 전설 코치 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor, no bat, golden-orange ornate coach uniform, bright radiant aura, dramatic, powerful, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/legendary_slower.png`** — 전설 투수코치 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling calming aura, tactical, no bat, golden-orange ornate coach uniform, bright radiant aura, dramatic, powerful, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```


### [에픽] mythic_low

**`units/mythic_low_contact.png`** — 에픽 교타자 (wind)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe, teal holographic techno uniform with energy wings, plasma bat, strong glowing particles, futuristic super, mint green accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_low_slugger.png`** — 에픽 강타자 (earth)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger, teal holographic techno uniform with energy wings, plasma bat, strong glowing particles, futuristic super, earthy brown accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_low_speedster.png`** — 에픽 연타자 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick, teal holographic techno uniform with energy wings, plasma bat, strong glowing particles, futuristic super, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_low_splasher.png`** — 에픽 거포 (dark)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel, teal holographic techno uniform with energy wings, plasma bat, strong glowing particles, futuristic super, deep purple accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_low_sniper.png`** — 에픽 저격수 (fire)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe, teal holographic techno uniform with energy wings, plasma bat, strong glowing particles, futuristic super, fiery red accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_low_buffer.png`** — 에픽 코치 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor, no bat, teal holographic techno coach uniform with energy wings, strong glowing particles, futuristic super, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_low_slower.png`** — 에픽 투수코치 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling calming aura, tactical, no bat, teal holographic techno coach uniform with energy wings, strong glowing particles, futuristic super, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```


### [신화] mythic

**`units/mythic_contact.png`** — 신화 교타자 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a nimble baseball batter in ready stance holding a contact bat, light agile build, focused eyes, quick-hitter vibe, gold and rainbow holographic divine uniform, halo and floating runes behind, mythic energy bat, overwhelming radiant aura, godlike, most powerful, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_slugger.png`** — 신화 강타자 (wind)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a huge muscular baseball power-hitter gripping a massive heavy bat over the shoulder, intimidating bulk, home-run slugger, gold and rainbow holographic divine uniform, halo and floating runes behind, mythic energy bat, overwhelming radiant aura, godlike, most powerful, mint green accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_speedster.png`** — 신화 연타자 (earth)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a small fast baseball batter with two light bats, blurred speed lines, energetic rapid-hit pose, twitchy and quick, gold and rainbow holographic divine uniform, halo and floating runes behind, mythic energy bat, overwhelming radiant aura, godlike, most powerful, earthy brown accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_splasher.png`** — 신화 거포 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a stocky cannon-arm baseball slugger winding up a giant explosive swing, shockwave aura around the bat, area-blast feel, gold and rainbow holographic divine uniform, halo and floating runes behind, mythic energy bat, overwhelming radiant aura, godlike, most powerful, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_sniper.png`** — 신화 저격수 (dark)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a cool sharpshooter baseball pitcher-batter with one eye closed aiming a long precision bat like a rifle, scope visor, sniper vibe, gold and rainbow holographic divine uniform, halo and floating runes behind, mythic energy bat, overwhelming radiant aura, godlike, most powerful, deep purple accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_buffer.png`** — 신화 코치 (light)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard and raising a fist, motivating gesture, supportive mentor, no bat, gold and rainbow holographic divine coach uniform, halo and floating runes behind, overwhelming radiant aura, godlike, most powerful, golden cream accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`units/mythic_slower.png`** — 신화 투수코치 (water)
```
mobile game character art, cute chibi proportions, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single character, full body, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, consistent scale, 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, gesturing slow-down, cooling calming aura, tactical, no bat, gold and rainbow holographic divine coach uniform, halo and floating runes behind, overwhelming radiant aura, godlike, most powerful, blue accent color --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

---

## 2. 일반 적 6개 — `public/data/enemies/<파일명>`

※ 특수유형(runner/armored/splitter/healer)은 엔진이 색틴트+배지로 표현 → 추가 이미지 불필요.

**`enemies/m_imp.png`** — 임프
```
mobile game monster art, cute chibi, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, 512x512, simple round monster, no bat, no baseball gear, tiny red fire imp monster, round body, little horns, mischievous grin, ember flecks --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/m_slime.png`** — 슬라임
```
mobile game monster art, cute chibi, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, 512x512, simple round monster, no bat, no baseball gear, blue water slime blob, glossy translucent, jiggly round, cute simple eyes --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/m_wisp.png`** — 윕
```
mobile game monster art, cute chibi, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, 512x512, simple round monster, no bat, no baseball gear, mint-green wind wisp spirit, wispy round body, tiny wings, airy swirl --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/m_rocky.png`** — 락키
```
mobile game monster art, cute chibi, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, 512x512, simple round monster, no bat, no baseball gear, brown earth rock golem mini, chunky round boulder body, mossy bits, sturdy --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/m_seraph_minion.png`** — 타락천사
```
mobile game monster art, cute chibi, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, 512x512, simple round monster, no bat, no baseball gear, pale gold fallen-angel minion, small round body, broken halo, single tattered wing --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/m_shade.png`** — 그림자
```
mobile game monster art, cute chibi, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, sharp readable silhouette, front 3/4 view, 512x512, simple round monster, no bat, no baseball gear, purple shadow creature, round dark smoky body, glowing eyes, wispy edges --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

---

## 3. 보스 5개 — `public/data/enemies/<파일명>`

**`enemies/b_lava_drake.png`** — 용암 드레이크
```
mobile game boss monster art, imposing and dramatic, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, strong silhouette, front 3/4 view, 768x768, powerful, massive lava dragon boss, molten cracks glowing orange, smoke, fierce, fire element --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/b_kraken.png`** — 크라켄
```
mobile game boss monster art, imposing and dramatic, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, strong silhouette, front 3/4 view, 768x768, powerful, giant blue kraken boss, many thick tentacles, glowing eyes, dripping water, sea element --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/b_storm_giant.png`** — 폭풍 거인
```
mobile game boss monster art, imposing and dramatic, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, strong silhouette, front 3/4 view, 768x768, powerful, towering green storm giant boss, crackling lightning, swirling wind, stormy aura --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/b_titan_lord.png`** — 타이탄 군주
```
mobile game boss monster art, imposing and dramatic, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, strong silhouette, front 3/4 view, 768x768, powerful, colossal brown stone titan lord boss, rocky armor, glowing core, earth element, huge --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`enemies/b_void_lord.png`** — 공허 군주
```
mobile game boss monster art, imposing and dramatic, clean cel-shaded, bold thick outline, high saturation, soft top-left lighting, centered single creature, transparent background, no ground shadow, strong silhouette, front 3/4 view, 768x768, powerful, dark purple void lord boss, cosmic robe, floating dark crystals, glowing void eyes, ominous --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

---

## 4. 배경/필드 — `public/data/bg/<파일명>`

※ 배경은 **불투명**(타일용). 투명배경 아님.

**`bg/field.png`** — 메인 필드(잔디 타일)
```
top-down baseball field turf, clean green grass with subtle mowing stripes, faint diamond infield dirt arc in corner, seamless tileable texture, soft, mobile game, 512x512, opaque --no characters, players, text, watermark, frame, border, harsh lines
```

**`bg/track.png`** — 순환 트랙 길(선택)
```
top-down running track dirt path, warm tan baseball infield dirt, subtle texture, seamless tileable, mobile game, 512x512, opaque --no characters, players, text, watermark, frame, border, harsh lines
```

---

## 5. 발사체/이펙트 — `public/data/fx/<파일명>`

**`fx/baseball.png`** — 야구공 탄환
```
a single white baseball with red stitching, clean, slight motion glow, centered, transparent background, 128x128 --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`fx/hit.png`** — 타격 임팩트(선택)
```
cartoon impact star burst, white and yellow, comic pow effect, transparent background, 128x128 --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`fx/swing_arc.png`** — 배트 스윙 잔상(선택)
```
curved motion blur swing arc, white translucent crescent, transparent background, 256x256 --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

---

## 6. UI 아이콘 — `public/data/ui/<파일명>`

**`ui/coin.png`** — 골드(소환비용)
```
a shiny gold coin with a small baseball emboss, mobile game currency icon, clean, glossy, centered, transparent background, 128x128 --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

**`ui/ticket.png`** — 응모권(오늘의 4번타자)
```
a golden raffle ticket icon with a star and baseball motif, glossy, centered, transparent background, 128x128 --no realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, busy background, drop shadow, frame, border, UI elements
```

---

## 우선순위

1. 유닛 42 (핵심) 2. 보스 5 3. 일반몹 6 4. fx/baseball.png 5. bg/field.png 6. UI

생성 후 경로에 넣으면, Boot 로더에 `this.load.image(id, sprite)` 추가 + UnitEntity/EnemyEntity 플레이스홀더를 `scene.add.image`로 교체하는 작업 진행.

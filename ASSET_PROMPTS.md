# 폴리볼 랜덤 디펜스 — 에셋 프롬프트 (이펙트 없는 정면 idle, 진짜 투명)

야구 컨셉 세로형 랜덤 디펜스. **정면 idle·무이펙트·진짜 투명배경** 강제 (체커/스워시/글로우 금지).
아래 각 프롬프트는 글로벌+네거티브 포함 완성형 → 그대로 복붙. 생성 후 `public/data/units/<id>.png`로 저장하고
`node process_assets.mjs` (이름교정+누끼+512축소) 실행하면 자동 정리됨.

## 저장 경로
```
public/data/units/<grade>_<role>.png   (예: units/legendary_sniper.png)
public/data/enemies/<id>.png
```
절대경로: `C:\\Users\\rest\\polyball-random-defense\\public\\data\\...`

> 생성기가 "투명"이라며 체커무늬를 박아 내보내면 누끼가 필요함. 네거티브에 checkerboard 넣었지만,
> 그래도 체커로 나오면 그냥 받아서 process_assets.mjs 돌리면 됨(자동 제거).

---


### [일반] common

**`units/common_contact.png`** — 일반 교타자 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, quick-hitter build, worn gray sandlot uniform, plain wooden bat, matte fabric, humble amateur, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_slugger.png`** — 일반 강타자 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy bat on shoulder, home-run slugger, worn gray sandlot uniform, plain wooden bat, matte fabric, humble amateur, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_speedster.png`** — 일반 연타자 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light bat on shoulder, energetic but standing still, worn gray sandlot uniform, plain wooden bat, matte fabric, humble amateur, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_splasher.png`** — 일반 거포 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, thick heavy bat on shoulder, cannon-arm build, worn gray sandlot uniform, plain wooden bat, matte fabric, humble amateur, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_sniper.png`** — 일반 저격수 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sleek long bat on shoulder, sharpshooter calm vibe, worn gray sandlot uniform, plain wooden bat, matte fabric, humble amateur, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_buffer.png`** — 일반 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, worn gray coach jacket and cap, matte, humble amateur, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_slower.png`** — 일반 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, worn gray coach jacket and cap, matte, humble amateur, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [희귀] rare

**`units/rare_contact.png`** — 희귀 교타자 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, quick-hitter build, clean blue team uniform with metal trim, polished aluminum bat, semi-pro, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_slugger.png`** — 희귀 강타자 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy bat on shoulder, home-run slugger, clean blue team uniform with metal trim, polished aluminum bat, semi-pro, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_speedster.png`** — 희귀 연타자 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light bat on shoulder, energetic but standing still, clean blue team uniform with metal trim, polished aluminum bat, semi-pro, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_splasher.png`** — 희귀 거포 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, thick heavy bat on shoulder, cannon-arm build, clean blue team uniform with metal trim, polished aluminum bat, semi-pro, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_sniper.png`** — 희귀 저격수 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sleek long bat on shoulder, sharpshooter calm vibe, clean blue team uniform with metal trim, polished aluminum bat, semi-pro, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_buffer.png`** — 희귀 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, clean blue coach uniform with whistle, semi-pro, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_slower.png`** — 희귀 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, clean blue coach uniform with whistle, semi-pro, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [영웅] epic

**`units/epic_contact.png`** — 영웅 교타자 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, quick-hitter build, purple hero uniform with shoulder emblem and pads, sturdy elite bat, elite player, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_slugger.png`** — 영웅 강타자 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy bat on shoulder, home-run slugger, purple hero uniform with shoulder emblem and pads, sturdy elite bat, elite player, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_speedster.png`** — 영웅 연타자 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light bat on shoulder, energetic but standing still, purple hero uniform with shoulder emblem and pads, sturdy elite bat, elite player, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_splasher.png`** — 영웅 거포 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, thick heavy bat on shoulder, cannon-arm build, purple hero uniform with shoulder emblem and pads, sturdy elite bat, elite player, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_sniper.png`** — 영웅 저격수 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sleek long bat on shoulder, sharpshooter calm vibe, purple hero uniform with shoulder emblem and pads, sturdy elite bat, elite player, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_buffer.png`** — 영웅 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, purple coach uniform with emblem, elite, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_slower.png`** — 영웅 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, purple coach uniform with emblem, elite, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [전설] legendary

**`units/legendary_contact.png`** — 전설 교타자 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, quick-hitter build, golden-orange ornate armored uniform, heavy ornate bat, dramatic legendary champion, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_slugger.png`** — 전설 강타자 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy bat on shoulder, home-run slugger, golden-orange ornate armored uniform, heavy ornate bat, dramatic legendary champion, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_speedster.png`** — 전설 연타자 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light bat on shoulder, energetic but standing still, golden-orange ornate armored uniform, heavy ornate bat, dramatic legendary champion, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_splasher.png`** — 전설 거포 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, thick heavy bat on shoulder, cannon-arm build, golden-orange ornate armored uniform, heavy ornate bat, dramatic legendary champion, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_sniper.png`** — 전설 저격수 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sleek long bat on shoulder, sharpshooter calm vibe, golden-orange ornate armored uniform, heavy ornate bat, dramatic legendary champion, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_buffer.png`** — 전설 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, golden-orange ornate coach uniform, dramatic champion, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_slower.png`** — 전설 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, golden-orange ornate coach uniform, dramatic champion, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [에픽] mythic_low

**`units/mythic_low_contact.png`** — 에픽 교타자 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, quick-hitter build, teal futuristic techno uniform with sleek armor, high-tech bat, futuristic super player, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_slugger.png`** — 에픽 강타자 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy bat on shoulder, home-run slugger, teal futuristic techno uniform with sleek armor, high-tech bat, futuristic super player, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_speedster.png`** — 에픽 연타자 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light bat on shoulder, energetic but standing still, teal futuristic techno uniform with sleek armor, high-tech bat, futuristic super player, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_splasher.png`** — 에픽 거포 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, thick heavy bat on shoulder, cannon-arm build, teal futuristic techno uniform with sleek armor, high-tech bat, futuristic super player, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_sniper.png`** — 에픽 저격수 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sleek long bat on shoulder, sharpshooter calm vibe, teal futuristic techno uniform with sleek armor, high-tech bat, futuristic super player, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_buffer.png`** — 에픽 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, teal futuristic techno coach uniform with sleek armor, futuristic, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_slower.png`** — 에픽 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, teal futuristic techno coach uniform with sleek armor, futuristic, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [신화] mythic

**`units/mythic_contact.png`** — 신화 교타자 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, quick-hitter build, gold and white divine ornate uniform with intricate detail, masterwork bat, godlike legendary ace, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_slugger.png`** — 신화 강타자 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy bat on shoulder, home-run slugger, gold and white divine ornate uniform with intricate detail, masterwork bat, godlike legendary ace, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_speedster.png`** — 신화 연타자 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light bat on shoulder, energetic but standing still, gold and white divine ornate uniform with intricate detail, masterwork bat, godlike legendary ace, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_splasher.png`** — 신화 거포 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, thick heavy bat on shoulder, cannon-arm build, gold and white divine ornate uniform with intricate detail, masterwork bat, godlike legendary ace, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_sniper.png`** — 신화 저격수 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sleek long bat on shoulder, sharpshooter calm vibe, gold and white divine ornate uniform with intricate detail, masterwork bat, godlike legendary ace, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_buffer.png`** — 신화 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, gold and white divine ornate coach uniform, godlike, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_slower.png`** — 신화 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat resting on the shoulder, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, gold and white divine ornate coach uniform, godlike, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


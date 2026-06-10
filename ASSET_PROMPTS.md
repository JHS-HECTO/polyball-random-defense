# 폴리볼 랜덤 디펜스 — 에셋 프롬프트 (무이펙트 idle / 등급 = 색+방망이)

**등급 차별화 2가지: (1) 유니폼 색 (게임 등급팔레트와 일치) — 일반 회색·희귀 파랑·영웅 초록·전설 보라·에픽 주황금·신화 핑크. (2) 방망이가 점점 개쩌는 물리 무기.**
이펙트(글로우/에너지) X, 진짜 투명배경. 각 프롬프트 글로벌+네거티브 포함 완성형 → 복붙.
생성 후 `public/data/units/<id>.png` 저장 → `node process_assets.mjs` (이름교정+누끼+512축소 자동).

저장경로: `C:\\Users\\rest\\polyball-random-defense\\public\\data\\units\\<grade>_<role>.png`

---

### [일반] common

**`units/common_contact.png`** — 일반 교타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, GRAY and white baseball uniform; plain worn wooden bat, scuffed; humble amateur look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_slugger.png`** — 일반 강타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, GRAY and white baseball uniform; plain worn wooden bat, scuffed; humble amateur look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_speedster.png`** — 일반 연타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, GRAY and white baseball uniform; plain worn wooden bat, scuffed; humble amateur look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_splasher.png`** — 일반 거포
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, GRAY and white baseball uniform; plain worn wooden bat, scuffed; humble amateur look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_sniper.png`** — 일반 저격수
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, GRAY and white baseball uniform; plain worn wooden bat, scuffed; humble amateur look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_buffer.png`** — 일반 코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach holding a clipboard, calm encouraging stance, no bat, GRAY and white coach jacket and cap; humble amateur --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_slower.png`** — 일반 투수코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, GRAY and white coach jacket and cap; humble amateur --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [희귀] rare

**`units/rare_contact.png`** — 희귀 교타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, bright BLUE baseball uniform with white trim; sleek polished silver aluminum bat; semi-pro look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_slugger.png`** — 희귀 강타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, bright BLUE baseball uniform with white trim; sleek polished silver aluminum bat; semi-pro look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_speedster.png`** — 희귀 연타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, bright BLUE baseball uniform with white trim; sleek polished silver aluminum bat; semi-pro look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_splasher.png`** — 희귀 거포
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, bright BLUE baseball uniform with white trim; sleek polished silver aluminum bat; semi-pro look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_sniper.png`** — 희귀 저격수
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, bright BLUE baseball uniform with white trim; sleek polished silver aluminum bat; semi-pro look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_buffer.png`** — 희귀 코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach holding a clipboard, calm encouraging stance, no bat, bright BLUE coach uniform with whistle; semi-pro --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_slower.png`** — 희귀 투수코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, bright BLUE coach uniform with whistle; semi-pro --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [영웅] epic

**`units/epic_contact.png`** — 영웅 교타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, vivid GREEN baseball uniform with shoulder pads and emblem; dark steel bat engraved with runes and spikes; elite hero look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_slugger.png`** — 영웅 강타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, vivid GREEN baseball uniform with shoulder pads and emblem; dark steel bat engraved with runes and spikes; elite hero look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_speedster.png`** — 영웅 연타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, vivid GREEN baseball uniform with shoulder pads and emblem; dark steel bat engraved with runes and spikes; elite hero look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_splasher.png`** — 영웅 거포
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, vivid GREEN baseball uniform with shoulder pads and emblem; dark steel bat engraved with runes and spikes; elite hero look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_sniper.png`** — 영웅 저격수
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, vivid GREEN baseball uniform with shoulder pads and emblem; dark steel bat engraved with runes and spikes; elite hero look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_buffer.png`** — 영웅 코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach holding a clipboard, calm encouraging stance, no bat, vivid GREEN coach uniform with emblem and pads; elite --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_slower.png`** — 영웅 투수코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, vivid GREEN coach uniform with emblem and pads; elite --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [전설] legendary

**`units/legendary_contact.png`** — 전설 교타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, royal PURPLE baseball uniform with armored plating; huge ornate golden bat carved with patterns and gemstones; legendary champion look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_slugger.png`** — 전설 강타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, royal PURPLE baseball uniform with armored plating; huge ornate golden bat carved with patterns and gemstones; legendary champion look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_speedster.png`** — 전설 연타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, royal PURPLE baseball uniform with armored plating; huge ornate golden bat carved with patterns and gemstones; legendary champion look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_splasher.png`** — 전설 거포
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, royal PURPLE baseball uniform with armored plating; huge ornate golden bat carved with patterns and gemstones; legendary champion look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_sniper.png`** — 전설 저격수
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, royal PURPLE baseball uniform with armored plating; huge ornate golden bat carved with patterns and gemstones; legendary champion look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_buffer.png`** — 전설 코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach holding a clipboard, calm encouraging stance, no bat, royal PURPLE ornate coach uniform with plating; legendary champion --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_slower.png`** — 전설 투수코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, royal PURPLE ornate coach uniform with plating; legendary champion --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [에픽] mythic_low

**`units/mythic_low_contact.png`** — 에픽 교타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, bright ORANGE-GOLD baseball uniform with sleek armor; massive crystal-and-titanium bat with sharp sculpted edges; super ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_slugger.png`** — 에픽 강타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, bright ORANGE-GOLD baseball uniform with sleek armor; massive crystal-and-titanium bat with sharp sculpted edges; super ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_speedster.png`** — 에픽 연타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, bright ORANGE-GOLD baseball uniform with sleek armor; massive crystal-and-titanium bat with sharp sculpted edges; super ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_splasher.png`** — 에픽 거포
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, bright ORANGE-GOLD baseball uniform with sleek armor; massive crystal-and-titanium bat with sharp sculpted edges; super ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_sniper.png`** — 에픽 저격수
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, bright ORANGE-GOLD baseball uniform with sleek armor; massive crystal-and-titanium bat with sharp sculpted edges; super ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_buffer.png`** — 에픽 코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach holding a clipboard, calm encouraging stance, no bat, bright ORANGE-GOLD high-tech coach uniform; super ace --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_slower.png`** — 에픽 투수코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, bright ORANGE-GOLD high-tech coach uniform; super ace --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [신화] mythic

**`units/mythic_contact.png`** — 신화 교타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, hot PINK and white divine ornate baseball armor; gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; godlike legendary ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_slugger.png`** — 신화 강타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, hot PINK and white divine ornate baseball armor; gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; godlike legendary ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_speedster.png`** — 신화 연타자
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, hot PINK and white divine ornate baseball armor; gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; godlike legendary ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_splasher.png`** — 신화 거포
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, hot PINK and white divine ornate baseball armor; gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; godlike legendary ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_sniper.png`** — 신화 저격수
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, hot PINK and white divine ornate baseball armor; gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; godlike legendary ace look --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_buffer.png`** — 신화 코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach holding a clipboard, calm encouraging stance, no bat, hot PINK and white divine ornate coach uniform; godlike --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_slower.png`** — 신화 투수코치
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, hot PINK and white divine ornate coach uniform; godlike --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


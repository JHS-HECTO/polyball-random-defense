# 폴리볼 랜덤 디펜스 — 에셋 프롬프트 (무이펙트 정면 idle, 등급=방망이 차별화)

**핵심: 등급 높을수록 방망이가 점점 개쩌는 물리적 무기**(나무→알루미늄→룬강철→황금→크리스탈→용머리+보석). 글로우/에너지 같은 이펙트 X, 진짜 투명배경.
각 프롬프트는 글로벌+네거티브 포함 완성형 → 그대로 복붙. 생성 후 `public/data/units/<id>.png` 저장하고 `node process_assets.mjs` 실행(이름교정+누끼+512축소 자동).

저장경로: `C:\\Users\\rest\\polyball-random-defense\\public\\data\\units\\<grade>_<role>.png`

---

### [일반] common

**`units/common_contact.png`** — 일반 교타자 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, plain worn wooden baseball bat, scuffed; simple gray sandlot uniform; humble amateur, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_slugger.png`** — 일반 강타자 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, plain worn wooden baseball bat, scuffed; simple gray sandlot uniform; humble amateur, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_speedster.png`** — 일반 연타자 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, plain worn wooden baseball bat, scuffed; simple gray sandlot uniform; humble amateur, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_splasher.png`** — 일반 거포 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, plain worn wooden baseball bat, scuffed; simple gray sandlot uniform; humble amateur, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_sniper.png`** — 일반 저격수 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, plain worn wooden baseball bat, scuffed; simple gray sandlot uniform; humble amateur, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_buffer.png`** — 일반 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, worn gray coach jacket and cap; humble amateur, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/common_slower.png`** — 일반 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, worn gray coach jacket and cap; humble amateur, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [희귀] rare

**`units/rare_contact.png`** — 희귀 교타자 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, sleek polished metal aluminum bat with blue grip; clean blue team uniform; semi-pro, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_slugger.png`** — 희귀 강타자 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, sleek polished metal aluminum bat with blue grip; clean blue team uniform; semi-pro, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_speedster.png`** — 희귀 연타자 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, sleek polished metal aluminum bat with blue grip; clean blue team uniform; semi-pro, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_splasher.png`** — 희귀 거포 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, sleek polished metal aluminum bat with blue grip; clean blue team uniform; semi-pro, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_sniper.png`** — 희귀 저격수 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, sleek polished metal aluminum bat with blue grip; clean blue team uniform; semi-pro, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_buffer.png`** — 희귀 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, clean blue coach uniform with whistle; semi-pro, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/rare_slower.png`** — 희귀 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, clean blue coach uniform with whistle; semi-pro, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [영웅] epic

**`units/epic_contact.png`** — 영웅 교타자 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, heavy dark steel bat engraved with runes and spikes; purple uniform with shoulder pads and emblem; elite hero, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_slugger.png`** — 영웅 강타자 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, heavy dark steel bat engraved with runes and spikes; purple uniform with shoulder pads and emblem; elite hero, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_speedster.png`** — 영웅 연타자 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, heavy dark steel bat engraved with runes and spikes; purple uniform with shoulder pads and emblem; elite hero, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_splasher.png`** — 영웅 거포 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, heavy dark steel bat engraved with runes and spikes; purple uniform with shoulder pads and emblem; elite hero, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_sniper.png`** — 영웅 저격수 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, heavy dark steel bat engraved with runes and spikes; purple uniform with shoulder pads and emblem; elite hero, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_buffer.png`** — 영웅 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, purple coach uniform with emblem and pads; elite, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/epic_slower.png`** — 영웅 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, purple coach uniform with emblem and pads; elite, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [전설] legendary

**`units/legendary_contact.png`** — 전설 교타자 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, huge ornate golden bat covered in carved patterns and gemstones; golden-orange armored uniform; legendary champion, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_slugger.png`** — 전설 강타자 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, huge ornate golden bat covered in carved patterns and gemstones; golden-orange armored uniform; legendary champion, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_speedster.png`** — 전설 연타자 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, huge ornate golden bat covered in carved patterns and gemstones; golden-orange armored uniform; legendary champion, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_splasher.png`** — 전설 거포 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, huge ornate golden bat covered in carved patterns and gemstones; golden-orange armored uniform; legendary champion, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_sniper.png`** — 전설 저격수 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, huge ornate golden bat covered in carved patterns and gemstones; golden-orange armored uniform; legendary champion, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_buffer.png`** — 전설 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, golden-orange ornate coach uniform; legendary champion, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/legendary_slower.png`** — 전설 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, golden-orange ornate coach uniform; legendary champion, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [에픽] mythic_low

**`units/mythic_low_contact.png`** — 에픽 교타자 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, massive crystal-and-titanium bat with sharp sculpted edges; sleek teal high-tech armored uniform; futuristic super ace, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_slugger.png`** — 에픽 강타자 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, massive crystal-and-titanium bat with sharp sculpted edges; sleek teal high-tech armored uniform; futuristic super ace, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_speedster.png`** — 에픽 연타자 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, massive crystal-and-titanium bat with sharp sculpted edges; sleek teal high-tech armored uniform; futuristic super ace, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_splasher.png`** — 에픽 거포 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, massive crystal-and-titanium bat with sharp sculpted edges; sleek teal high-tech armored uniform; futuristic super ace, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_sniper.png`** — 에픽 저격수 (fire)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, massive crystal-and-titanium bat with sharp sculpted edges; sleek teal high-tech armored uniform; futuristic super ace, red accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_buffer.png`** — 에픽 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, sleek teal high-tech coach uniform; futuristic, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_low_slower.png`** — 에픽 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, sleek teal high-tech coach uniform; futuristic, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


### [신화] mythic

**`units/mythic_contact.png`** — 신화 교타자 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a nimble lightweight baseball batter, focused calm face, gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; gold and white divine ornate armor; godlike legendary ace, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_slugger.png`** — 신화 강타자 (wind)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a big muscular baseball power-hitter, broad shoulders, gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; gold and white divine ornate armor; godlike legendary ace, mint green accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_speedster.png`** — 신화 연타자 (earth)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a small lean baseball batter, light and quick build, gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; gold and white divine ornate armor; godlike legendary ace, brown accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_splasher.png`** — 신화 거포 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a stocky strong baseball slugger, cannon-arm build, gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; gold and white divine ornate armor; godlike legendary ace, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_sniper.png`** — 신화 저격수 (dark)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a cool focused baseball batter, sharpshooter calm vibe, gigantic mythical bat carved like a roaring dragon head studded with huge jewels, ridiculously badass oversized weapon; gold and white divine ornate armor; godlike legendary ace, deep purple accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_buffer.png`** — 신화 코치 (light)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a friendly baseball head coach in a team jacket holding a clipboard, calm encouraging stance, no bat, gold and white divine ornate coach uniform; godlike, cream gold accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```

**`units/mythic_slower.png`** — 신화 투수코치 (water)
```
mobile game character art, cute chibi proportions 2.5 heads tall, clean flat cel-shaded, bold thick black outline, high saturation, soft top-left lighting, single character centered, full body standing straight facing the camera front view, calm neutral idle pose, bat held upright resting on the shoulder clearly visible, feet on ground, symmetrical, plain fully transparent background (real alpha, NOT a checkerboard), 512x512, baseball theme, a calm baseball pitching coach holding a stopwatch and a glove, relaxed stance, no bat, gold and white divine ornate coach uniform; godlike, blue accent color --no checkered background, checkerboard, gray squares, white box, opaque background, motion lines, speed lines, swoosh, glow, aura, energy, plasma, fire, lightning, sparkles, particles, special effects, action pose, mid-swing, dynamic motion, realistic photo, text, watermark, signature, multiple characters, cropped, blurry, extra limbs, deformed hands, drop shadow, frame, border, UI
```


import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { PNG } from 'pngjs';

const ROOT = 'public/data';

// 배경 판정: 무채색 회색(체커 밝기 ~95~255, 이미지마다 다름). 캐릭은 채도높음/검은외곽선(mn<90).
const isBg = (d, i) => {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx - mn < 30 && mn > 95;
};

function process(srcPath, dstPath, { strip, size }) {
  const png = PNG.sync.read(readFileSync(srcPath));
  const { width: W, height: H, data } = png;
  if (strip) {
    const stack = [];
    for (let x = 0; x < W; x++) { stack.push(x); stack.push((H - 1) * W + x); }
    for (let y = 0; y < H; y++) { stack.push(y * W); stack.push(y * W + (W - 1)); }
    const visited = new Uint8Array(W * H);
    while (stack.length) {
      const p = stack.pop();
      if (visited[p]) continue;
      visited[p] = 1;
      const i = p * 4;
      if (!isBg(data, i)) continue;
      data[i + 3] = 0;
      const x = p % W, y = (p / W) | 0;
      if (x > 0) stack.push(p - 1);
      if (x < W - 1) stack.push(p + 1);
      if (y > 0) stack.push(p - W);
      if (y < H - 1) stack.push(p + W);
    }
  }
  const T = size;
  const out = new PNG({ width: T, height: T });
  const sx = W / T, sy = H / T;
  for (let ty = 0; ty < T; ty++) for (let tx = 0; tx < T; tx++) {
    const x0 = (tx * sx) | 0, x1 = Math.max(x0 + 1, ((tx + 1) * sx) | 0);
    const y0 = (ty * sy) | 0, y1 = Math.max(y0 + 1, ((ty + 1) * sy) | 0);
    let r = 0, g = 0, b = 0, a = 0, n = 0;
    for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) {
      const i = (yy * W + xx) * 4, al = data[i + 3];
      r += data[i] * al; g += data[i + 1] * al; b += data[i + 2] * al; a += al; n++;
    }
    const o = (ty * T + tx) * 4;
    if (a > 0) { out.data[o] = (r / a) | 0; out.data[o + 1] = (g / a) | 0; out.data[o + 2] = (b / a) | 0; out.data[o + 3] = (a / n) | 0; }
    else { out.data[o] = out.data[o + 1] = out.data[o + 2] = out.data[o + 3] = 0; }
  }
  writeFileSync(dstPath, PNG.sync.write(out));
}

const cleanId = (name, prefix) =>
  name.replace(new RegExp('^' + prefix), '').replace(/\.png(\.png)?$/i, '');

// 1) 유닛 (누끼 O)
const unitsDir = `${ROOT}/units`;
for (const f of readdirSync(unitsDir)) {
  if (!/^units.*\.png(\.png)?$/i.test(f)) continue; // 깨진 이름만
  const id = cleanId(f, 'units');
  const src = `${unitsDir}/${f}`, dst = `${unitsDir}/${id}.png`;
  process(src, dst, { strip: true, size: 512 });
  if (src !== dst) rmSync(src);
  console.log('unit', f, '->', `${id}.png`);
}

// 2) bg (누끼 X, 타일) / fx (누끼 O) — 루트에 bg*/fx*
mkdirSync(`${ROOT}/bg`, { recursive: true });
mkdirSync(`${ROOT}/fx`, { recursive: true });
for (const f of readdirSync(ROOT)) {
  if (/^bg.*\.png(\.png)?$/i.test(f)) {
    const id = cleanId(f, 'bg');
    process(`${ROOT}/${f}`, `${ROOT}/bg/${id}.png`, { strip: false, size: 512 });
    rmSync(`${ROOT}/${f}`); console.log('bg', f, '->', `bg/${id}.png`);
  } else if (/^fx.*\.png(\.png)?$/i.test(f)) {
    const id = cleanId(f, 'fx');
    process(`${ROOT}/${f}`, `${ROOT}/fx/${id}.png`, { strip: true, size: 256 });
    rmSync(`${ROOT}/${f}`); console.log('fx', f, '->', `fx/${id}.png`);
  }
}
console.log('done');

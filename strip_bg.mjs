import { readFileSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const src = process.argv[2];
const dst = process.argv[3] || src;
const png = PNG.sync.read(readFileSync(src));
const { width: W, height: H, data } = png;

// 배경 판정: 회색조(채도 낮음) + 밝음(체커 218/255). 캐릭터(검은외곽선/살색/빨강/갈색배트)는 제외.
const isBg = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx - mn < 16 && mn > 198; // 거의 무채색 + 밝음
};

// 테두리에서 flood fill (체커 배경은 연결, 캐릭터는 검은 외곽선으로 분리)
const visited = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) { stack.push(x); stack.push((H - 1) * W + x); }
for (let y = 0; y < H; y++) { stack.push(y * W); stack.push(y * W + (W - 1)); }
let removed = 0;
while (stack.length) {
  const p = stack.pop();
  if (visited[p]) continue;
  visited[p] = 1;
  const i = p * 4;
  if (!isBg(i)) continue;
  data[i + 3] = 0; // 투명
  removed++;
  const x = p % W, y = (p / W) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - W);
  if (y < H - 1) stack.push(p + W);
}

// 512로 박스 다운샘플 (알파 가중)
const T = 512;
const out = new PNG({ width: T, height: T });
const sx = W / T, sy = H / T;
for (let ty = 0; ty < T; ty++) {
  for (let tx = 0; tx < T; tx++) {
    const x0 = (tx * sx) | 0, x1 = Math.max(x0 + 1, ((tx + 1) * sx) | 0);
    const y0 = (ty * sy) | 0, y1 = Math.max(y0 + 1, ((ty + 1) * sy) | 0);
    let r = 0, g = 0, b = 0, a = 0, n = 0;
    for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) {
      const i = (yy * W + xx) * 4;
      const al = data[i + 3];
      r += data[i] * al; g += data[i + 1] * al; b += data[i + 2] * al; a += al; n++;
    }
    const o = (ty * T + tx) * 4;
    if (a > 0) { out.data[o] = (r / a) | 0; out.data[o + 1] = (g / a) | 0; out.data[o + 2] = (b / a) | 0; out.data[o + 3] = (a / n) | 0; }
    else { out.data[o] = 0; out.data[o + 1] = 0; out.data[o + 2] = 0; out.data[o + 3] = 0; }
  }
}
writeFileSync(dst, PNG.sync.write(out));
console.log(`removed ${removed} bg px, ${W}x${H} -> ${T}x${T}, saved ${dst}`);

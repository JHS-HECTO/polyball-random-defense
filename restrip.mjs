import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { PNG } from 'pngjs';

// 체커 배경 회색이 ~168~255로 다양 → 임계값 낮춤. 캐릭은 검은 외곽선으로 분리돼 보호됨.
const isBg = (d, i) => {
  if (d[i + 3] === 0) return false; // 이미 투명 = 경계
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx - mn < 22 && mn > 120;
};

function strip(path) {
  const png = PNG.sync.read(readFileSync(path));
  const { width: W, height: H, data } = png;
  const stack = [];
  for (let x = 0; x < W; x++) { stack.push(x); stack.push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { stack.push(y * W); stack.push(y * W + (W - 1)); }
  const visited = new Uint8Array(W * H);
  let removed = 0;
  while (stack.length) {
    const p = stack.pop();
    if (visited[p]) continue;
    visited[p] = 1;
    const i = p * 4;
    if (!isBg(data, i)) continue;
    data[i + 3] = 0; removed++;
    const x = p % W, y = (p / W) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W);
    if (y < H - 1) stack.push(p + W);
  }
  writeFileSync(path, PNG.sync.write(png));
  return removed;
}

const dir = 'public/data/units';
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.png')) continue;
  const r = strip(`${dir}/${f}`);
  console.log(f, 'removed', r);
}
console.log('done');

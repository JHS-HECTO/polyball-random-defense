import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { PNG } from 'pngjs';

// 체커 배경 = 무채색 회색(밝기 95~255). 캐릭은 채도 높음(파랑유니폼/살색) 또는 검은외곽선(mn<90).
const isBgColor = (d, i) => {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx - mn < 30 && mn > 95;
};
// flood 통과 가능: 이미 투명(alpha0) 이거나 배경색. → alpha0 갭 건너 안쪽 체커섬까지 도달
const passable = (d, i) => d[i + 3] === 0 || isBgColor(d, i);

function fix(path) {
  const png = PNG.sync.read(readFileSync(path));
  const { width: W, height: H, data } = png;
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
    if (!passable(data, i)) continue;          // 캐릭터(불투명+유채색/검정)면 막힘
    if (data[i + 3] !== 0 && isBgColor(data, i)) { data[i + 3] = 0; removed++; } // 배경칸 제거
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
  console.log(f, 'removed', fix(`${dir}/${f}`));
}
console.log('done');

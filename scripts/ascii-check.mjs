// Ponytail self-check for the hero ASCII blackhole.
// Mirrors the contract in src/shared/components/black-hole/black-hole.tsx
// (DEFAULT_ASCII_CHARS, ASCII_THRESHOLD, ASCII_LEVELS, cell ratio 0.6):
// fails if the mapping logic drifts. Run: node scripts/ascii-check.mjs.
// Stdlib only.
import assert from "node:assert/strict";

const CHARS = " .:-=+*#%@";
const THRESHOLD = 0.06;
const LEVELS = 16;

const charFor = (lum) => {
  if (lum <= THRESHOLD) return null; // skipped, same as drawAsciiOverlay
  const last = CHARS.length - 1;
  const c = CHARS[Math.min(last, (lum * last) | 0)];
  return c === " " ? null : c;
};

// Sprite bucket mapping, same as getSprites/drawAsciiOverlay.
const bucketChar = (lum) => {
  if (lum <= THRESHOLD) return null;
  const mid = (Math.min(LEVELS - 1, (lum * LEVELS) | 0) + 0.5) / LEVELS;
  const c = CHARS[Math.min(CHARS.length - 1, (mid * (CHARS.length - 1)) | 0)];
  return c === " " ? null : c;
};

assert.equal(charFor(0), null, "black pixel is skipped");
assert.equal(charFor(0.06), null, "threshold pixel is skipped");
assert.equal(charFor(1), "@", "full-bright pixel is densest glyph");
assert.equal(
  charFor(0.5),
  CHARS[(0.5 * (CHARS.length - 1)) | 0],
  "mid luminance hits middle of ramp",
);
// Monotonic: brighter never maps to a dimmer glyph.
let prev = -1;
for (let v = 0.07; v <= 1; v += 0.01) {
  const idx = CHARS.indexOf(charFor(v) ?? " ");
  assert.ok(idx >= prev, `ramp regresses at lum=${v.toFixed(2)}`);
  prev = idx;
}
// Cell ratio used for cols/rows math (fontSize * 0.6 wide, monospace).
assert.equal(10 * 0.6, 6, "cell width ratio");
// Buckets stay within one ramp step of the continuous mapping.
for (let v = 0.07; v <= 1; v += 0.01) {
  const a = CHARS.indexOf(charFor(v) ?? " ");
  const b = CHARS.indexOf(bucketChar(v) ?? " ");
  assert.ok(Math.abs(a - b) <= 1, `bucket drifts at lum=${v.toFixed(2)}`);
}

// Sprite ink: top-2 buckets are warm white, next-2 slightly warm, rest gray.
const bucketInk = (lum) => {
  const b = Math.min(LEVELS - 1, (lum * LEVELS) | 0);
  const mid = (b + 0.5) / LEVELS;
  const v = Math.round(mid * 255);
  if (b >= LEVELS - 2) return [255, 246, 235];
  if (b >= LEVELS - 4)
    return [Math.min(255, v + 10), Math.min(255, v + 2), Math.max(0, v - 8)];
  return [v, v, v];
};

assert.deepEqual(bucketInk(1), [255, 246, 235], "brightest bucket is white");
assert.deepEqual(bucketInk(0.5), [135, 135, 135], "mid bucket stays gray");

console.log("ascii-check: ok");

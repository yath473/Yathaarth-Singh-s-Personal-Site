import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { makePalette, normalize, DEFAULT_WORD, MAX_LENGTH } from "../src/palette.js";

const HSL = /^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/;

// Normal use
test("returns five valid HSL colours", () => {
  const { colors } = makePalette("ocean");
  assert.equal(colors.length, 5);
  for (const c of colors) assert.match(c, HSL);
});

test("is deterministic and case/space-insensitive", () => {
  assert.deepEqual(makePalette("Ocean  Blue"), makePalette(" ocean blue "));
});

test("different words give different palettes", () => {
  assert.notDeepEqual(makePalette("ocean").colors, makePalette("desert").colors);
});

// Edge cases
test("empty, whitespace-only and non-string input fall back to the default word", () => {
  for (const bad of ["", "   \n\t", null, undefined, 42]) {
    assert.equal(makePalette(bad).word, DEFAULT_WORD);
    assert.equal(makePalette(bad).colors.length, 5);
  }
});

test("very long and emoji input is capped without breaking characters", () => {
  assert.equal(Array.from(normalize("x".repeat(500))).length, MAX_LENGTH);
  const emoji = normalize("🌵".repeat(80));
  assert.equal(Array.from(emoji).length, MAX_LENGTH);
  assert.doesNotMatch(emoji, /\uFFFD/);
});

// Site wiring
test("index.html contains the elements main.js needs", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  for (const id of ["word-form", "word", "swatches", "caption"]) {
    assert.ok(html.includes(`id="${id}"`), `missing #${id}`);
  }
});

test("index.html has no leftover template placeholders", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /YOUR-USERNAME|Your Name/);
});

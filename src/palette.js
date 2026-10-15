// Pure logic for the "Word Palette" feature. No DOM access, so it is easy to test.
export const DEFAULT_WORD = "hello";
export const MAX_LENGTH = 50;

/** Trim, lowercase, collapse whitespace, cap length. Empty or non-string input falls back to DEFAULT_WORD. */
export function normalize(input) {
  if (typeof input !== "string") return DEFAULT_WORD;
  const s = input.normalize("NFC").trim().toLowerCase().replace(/\s+/g, " ");
  return Array.from(s).slice(0, MAX_LENGTH).join("") || DEFAULT_WORD;
}

/** FNV-1a 32-bit hash over code points. */
export function hash(str) {
  let h = 0x811c9dc5;
  for (const ch of str) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** Same word always yields the same five-colour palette. */
export function makePalette(input) {
  const word = normalize(input);
  const h = hash(word);
  const base = h % 360;
  const sat = 55 + ((h >>> 9) % 30);
  const light = 42 + ((h >>> 17) % 14);
  const offsets = [0, 30, 180, 210, 330];
  const colors = offsets.map(
    (o, i) => `hsl(${(base + o) % 360}, ${sat}%, ${i % 2 ? light + 14 : light}%)`
  );
  return { word, colors };
}

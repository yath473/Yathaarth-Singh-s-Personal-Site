import { makePalette } from "./palette.js";

const form = document.getElementById("word-form");
const input = document.getElementById("word");
const swatches = document.getElementById("swatches");
const caption = document.getElementById("caption");

function render(value) {
  const { word, colors } = makePalette(value);
  swatches.replaceChildren(
    ...colors.map((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "swatch";
      b.style.background = c;
      b.setAttribute("aria-label", `Copy ${c}`);
      b.textContent = c.replace(/hsl\((\d+), (\d+)%, (\d+)%\)/, "$1° $2 $3");
      b.addEventListener("click", () => {
        navigator.clipboard?.writeText(c);
        caption.textContent = `Copied ${c}`;
      });
      return b;
    })
  );
  caption.textContent = `Palette for “${word}”`;
  document.documentElement.style.setProperty("--accent", colors[0]);
}

form.addEventListener("submit", (e) => { e.preventDefault(); render(input.value); });
input.addEventListener("input", () => render(input.value));
render("");

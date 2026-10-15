<<<<<<< HEAD
# Personal Site

A personal website with a **Word Palette** feature: type any word and get a deterministic five-colour palette. Click a swatch to copy its colour. No frameworks, no dependencies.

Live site: `https://yath473.github.io/personal-site/`

## Setup
Requires Node.js 20+.
```bash
git clone https://github.com/yath473/personal-site.git
cd personal-site
npm start        # serves the site locally (uses npx serve)
```
Or open `index.html` through any static server (ES modules do not load from `file://`).

## Tests
```bash
npm test
```
Uses Node's built-in test runner. Covered: normal palette generation, determinism, and edge cases (empty, whitespace, non-string, very long and emoji input), plus a check that `index.html` has the elements `main.js` needs.

## CI and deployment
- `.github/workflows/ci.yml` runs `npm test` and `npm run build` on every pull request to `main`. The job is named `test` and is a required status check (branch protection).
- `.github/workflows/deploy.yml` runs on every push to `main`: re-runs the tests, builds `dist/`, and deploys to GitHub Pages only if they pass.

### One-time repository settings
1. **Settings → Pages → Source: GitHub Actions.**
2. **Settings → Branches → Add rule** for `main`: require a pull request, require status check `test`, require branches to be up to date, and include administrators.

### Capturing evidence
1. `git switch -c break-test`, change an assertion in `test/palette.test.js` so it fails, push, open a PR. Screenshot the red check and the blocked merge button.
2. Fix the test, push to the same branch. Screenshot the green check.
3. Merge. Screenshot the Deploy run and the live site.
4. Record links in `docs/EVIDENCE.md`.

## AI use
Claude (Anthropic) generated the initial code, tests, workflows, and this README from my capstone requirements. I reviewed and edited them. _Edit this paragraph to state what you changed and verified yourself._

## Limitations
- Palettes are hash-based, not designed: some may have weak contrast or look unbalanced.
- Colour contrast of swatch labels is not computed per colour.
- "Copy" depends on the browser Clipboard API (needs HTTPS or localhost).
- Tests cover logic and page wiring, not browser rendering.
- Placeholder personal content must be replaced with your own.
=======
# Yathaarth-Singh-s-Personal-Site
>>>>>>> dd18284b24fa8ad1675c5b7266451f16a338ab62

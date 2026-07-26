#!/usr/bin/env node
// Extracts the reusable artwork out of the Motion storyboards.
//
// The storyboards are keyframes of one continuous animation, not a flipbook:
// Success is a fixed checkmark revealed by a left-to-right wipe (the mask rect
// grows 1 → 22 → 60 across the three frames), so we only need the checkmark
// itself plus the wipe geometry, which the Swift side animates.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const outRoot = path.join(here, "../Sources/DesignSystemKit/Resources/DSIcons.xcassets");

function writeImageset(assetName, svg) {
  const dir = path.join(outRoot, `${assetName}.imageset`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, `${assetName}.svg`), svg);
  writeFileSync(
    path.join(dir, "Contents.json"),
    JSON.stringify(
      {
        images: [{ filename: `${assetName}.svg`, idiom: "universal" }],
        info: { author: "xcode", version: 1 },
        properties: {
          "preserves-vector-representation": true,
          "template-rendering-intent": "template",
        },
      },
      null,
      2
    ) + "\n"
  );
}

// ---- Motion / Success: the checkmark glyph -------------------------------
// Frame 03 sits at x=232,y=16 in the storyboard export; the circle is 96x96.
const success = readFileSync(path.join(here, "motion-success.svg"), "utf8");
const checkMatch = success.match(/<path id="Vector_3"[^>]*\/>/);
if (!checkMatch) throw new Error("Motion/Success: checkmark path (Vector_3) not found");

// Re-origin into the 96x96 circle box and force plain white so the asset can be
// template-rendered (the mask, not the fill, is what animates).
const check = checkMatch[0]
  .replace(/style="[^"]*"/, "")
  .replace(/fill="[^"]*"/, 'fill="white"');

writeImageset(
  "ds-motion-success-check",
  `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(-232, -16)">
${check}
</g>
</svg>
`
);

console.log("wrote ds-motion-success-check.imageset");
console.log("Success wipe geometry (local to the 96x96 box):");
console.log("  x=19  y=23  height=52  width 0 -> 60");

// ---- Motion / Transaction: terminal + card as separate layers ------------
// The storyboard is a continuous motion, not a flipbook: the terminal is
// static, the card translates across it, the screen tints, then a checkmark
// wipes in. So we ship the two pieces of artwork and let Swift animate them.
function sliceNamedGroup(svg, id) {
  const marker = `<g id="${id}"`;
  const start = svg.indexOf(marker);
  if (start === -1) throw new Error(`group not found: ${id}`);
  const openEnd = svg.indexOf(">", start);
  let i = openEnd + 1;
  let depth = 1;
  while (depth > 0) {
    const o = svg.indexOf("<g", i);
    const c = svg.indexOf("</g>", i);
    if (c === -1) throw new Error(`unbalanced <g> for ${id}`);
    if (o !== -1 && o < c) { depth += 1; i = o + 2; } else { depth -= 1; i = c + 4; }
  }
  return svg.slice(start, i);
}

function writeOriginalImageset(assetName, svg) {
  const dir = path.join(outRoot, `${assetName}.imageset`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, `${assetName}.svg`), svg);
  writeFileSync(
    path.join(dir, "Contents.json"),
    JSON.stringify(
      {
        images: [{ filename: `${assetName}.svg`, idiom: "universal" }],
        info: { author: "xcode", version: 1 },
        // Full-colour illustration built from brand tokens — never tint it.
        properties: { "preserves-vector-representation": true },
      },
      null,
      2
    ) + "\n"
  );
}

const BOX = `width="180" height="236" viewBox="0 0 180 236"`;
const f01 = readFileSync(path.join(here, "tx-frame01.svg"), "utf8");
const f04 = readFileSync(path.join(here, "tx-frame04.svg"), "utf8");

const terminal = sliceNamedGroup(f01, "Payment Terminal").replace(/\s*clip-path="url\(#[^)]*\)"/g, "");
const card = sliceNamedGroup(f04, "Credit Card").replace(/\s*clip-path="url\(#[^)]*\)"/g, "");

/// Pulls across any paint server (`<linearGradient>` etc.) the slice still
/// references. The card body is filled with `url(#paint0_linear_…)`, so
/// dropping the source `<defs>` left it painted with nothing — the chip
/// rendered but the card itself was invisible.
function collectDefs(source, body, label) {
  const ids = [...new Set([...body.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]))];
  if (ids.length === 0) return "";
  const blocks = ids.map((id) => {
    const open = new RegExp(`<(linearGradient|radialGradient|pattern|clipPath|mask)\\s+id="${id}"`);
    const m = source.match(open);
    if (!m) throw new Error(`${label}: no <defs> entry found for referenced id "${id}"`);
    const tag = m[1];
    const start = m.index;
    const end = source.indexOf(`</${tag}>`, start);
    if (end === -1) throw new Error(`${label}: unterminated <${tag}> for "${id}"`);
    return source.slice(start, end + `</${tag}>`.length);
  });
  return `<defs>\n${blocks.join("\n")}\n</defs>\n`;
}

for (const [name, body, source] of [
  ["ds-motion-tx-terminal", terminal, f01],
  ["ds-motion-tx-card", card, f04],
]) {
  for (const chrome of ["#1E1E1E", "#9747FF", "#F3F5EE"]) {
    if (body.includes(chrome)) throw new Error(`${name}: Figma canvas chrome (${chrome}) leaked in`);
  }
  const defs = collectDefs(source, body, name);
  const svg = `<svg ${BOX} fill="none" xmlns="http://www.w3.org/2000/svg">\n${defs}${body}\n</svg>\n`;
  // Guard against the exact bug above ever coming back.
  for (const id of [...new Set([...svg.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]))]) {
    if (!svg.includes(`id="${id}"`)) throw new Error(`${name}: dangling reference to "${id}"`);
  }
  writeOriginalImageset(name, svg);
}
console.log("wrote ds-motion-tx-terminal + ds-motion-tx-card imagesets");

#!/usr/bin/env node
// Extracts one clean SVG per glyph out of the Figma frame exports.
//
// A frame export nests every glyph as <g id="Type=NAME[, Filled?=V]"> at its
// position inside the frame, wrapped in Figma canvas chrome (a #1E1E1E page
// background, huge ancestor page rects, and the purple #9747FF dashed
// component-boundary rect). We keep only the glyph group and re-origin it to
// its own box with a translate().
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.join(here, "icons");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// frame file -> [ [figmaGroupId, outputName, x, y, w, h], ... ]
const FRAMES = {
  "frame-14.svg": [
    ["Type=chevron", "chevron", 20, 20, 14, 14],
    ["Type=Secured", "secured", 54, 20, 14, 14],
  ],
  "frame-16.svg": [
    ["Type=exclamation, Filled?=No", "exclamation", 20, 20, 16, 16],
    ["Type=arrow-up-right, Filled?=No", "arrow-up-right", 56, 20, 16, 16],
    ["Type=non-notified, Filled?=No", "non-notified", 92, 20, 16, 16],
    ["Type=notified, Filled?=Yes", "notified", 128, 20, 16, 16],
    ["Type=heart, Filled?=No", "heart", 164, 20, 16, 16],
    ["Type=heart, Filled?=Yes", "heart-fill", 200, 20, 16, 16],
  ],
  "frame-20.svg": [
    ["Type=search", "search", 20, 22, 20, 20],
    ["Type=microphone", "microphone", 60, 22, 20, 20],
    ["Type=Check", "check", 100, 22, 20, 20],
    ["Type=Info", "info", 140, 22, 20, 20],
    ["Type=Credit Card", "credit-card", 180, 22, 20, 20],
    ["Type=close-eye", "close-eye", 220, 20, 24, 24],
    ["Type=open-eye", "open-eye", 264, 20, 24, 24],
  ],
  "frame-24.svg": [
    ["Type=map, Filled?=no", "map", 20, 20, 24, 24],
    ["Type=map, Filled?=yes", "map-fill", 64, 20, 24, 24],
    ["Type=search, Filled?=no", "search", 108, 20, 24, 24],
    ["Type=search, Filled?=yes", "search-fill", 152, 20, 24, 24],
    ["Type=notify, Filled?=no", "notify", 196, 20, 24, 24],
    ["Type=notify, Filled?=yes", "notify-fill", 240, 20, 24, 24],
    ["Type=member, Filled?=no", "member", 284, 20, 24, 24],
    ["Type=member, Filled?=yes", "member-fill", 328, 20, 24, 24],
    ["Type=heart, Filled?=no", "heart", 372, 20, 24, 24],
    ["Type=heart, Filled?=yes", "heart-fill", 416, 20, 24, 24],
    ["Type=Radio, Filled?=yes", "radio-fill", 460, 20, 24, 24],
    ["Type=Radio, Filled?=no", "radio", 504, 20, 24, 24],
    ["Type=gps, Filled?=no", "gps", 20, 64, 24, 24],
    ["Type=gps, Filled?=yes", "gps-fill", 64, 64, 24, 24],
    ["Type=setting, Filled?=yes", "setting", 108, 64, 24, 24],
    ["Type=more, Filled?=default", "more", 152, 64, 24, 24],
    ["Type=filter, Filled?=default", "filter", 196, 64, 24, 24],
    ["Type=back, Filled?=default", "back", 240, 64, 24, 24],
    ["Type=close, Filled?=default", "close", 284, 64, 24, 24],
    ["Type=minus, Filled?=default", "minus", 328, 64, 24, 24],
    ["Type=plus, Filled?=default", "plus", 372, 64, 24, 24],
    ["Type=icon, Filled?=24px", "download", 416, 64, 24, 24],
  ],
  "frame-map.svg": [
    ["Type=tree", "tree", 20, 20, 24, 24],
    ["Type=camera", "camera", 64, 20, 24, 24],
    ["Type=walk", "walk", 108, 20, 24, 24],
    ["Type=info", "info", 152, 20, 24, 24],
  ],
  "frame-weather.svg": [
    ["Type=cloud-sun", "cloud-sun", 20, 20, 24, 24],
    ["Type=sunny", "sunny", 64, 20, 24, 24],
    ["Type=rain", "rain", 108, 20, 24, 24],
    ["Type=lightning-rain", "lightning-rain", 152, 20, 24, 25],
    ["Type=windy", "windy", 196, 20, 24, 24],
    ["Type=typhoon", "typhoon", 240, 20, 24, 24],
    ["Type=cloud-snow", "cloud-snow", 284, 20, 24, 24],
  ],
};

// Figma canvas chrome that must never end up in a shipped icon. Note this is
// deliberately NOT a colour blocklist for the glyph itself: extraction already
// excludes ancestor chrome by only taking what is inside the `Type=` group, and
// some of these values are legitimate icon colours in their own right (the Map
// glyphs are genuinely #FDFDFC white, since they sit on a coloured pin).
const CHROME_COLORS = new Set(["#1E1E1E", "#9747FF", "#8A38F5", "#F3F5EE"]);

/** Returns the full `<g id="ID" …> … </g>` slice, honouring nested <g>. */
function sliceGroup(svg, id) {
  // The opening tag may carry extra attributes (e.g. clip-path), so match the
  // id then scan to the end of that tag rather than assuming `<g id="X">`.
  const marker = `<g id="${id}"`;
  const start = svg.indexOf(marker);
  if (start === -1) throw new Error(`group not found: ${id}`);
  const openEnd = svg.indexOf(">", start);
  if (openEnd === -1) throw new Error(`unterminated <g> tag for ${id}`);
  let i = openEnd + 1;
  let depth = 1;
  while (depth > 0) {
    const nextOpen = svg.indexOf("<g", i);
    const nextClose = svg.indexOf("</g>", i);
    if (nextClose === -1) throw new Error(`unbalanced <g> for ${id}`);
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 2;
    } else {
      depth -= 1;
      i = nextClose + 4;
    }
  }
  return svg.slice(start, i);
}

const manifest = [];
for (const [file, glyphs] of Object.entries(FRAMES)) {
  const svg = readFileSync(path.join(here, file), "utf8");
  for (const [gid, name, x, y, w, h] of glyphs) {
    let inner = sliceGroup(svg, gid);

    // Drop the purple component-boundary rect if it got swept in.
    inner = inner.replace(/<rect[^>]*#9747FF[^>]*\/>/g, "");

    // Every clip-path in these exports is a rect identical to the glyph's own
    // box, so once the glyph is re-origined the viewBox already clips to the
    // same region. Drop the references rather than carrying <defs> across.
    inner = inner.replace(/\s*clip-path="url\(#[^)]*\)"/g, "");

    // Colours appear both as attributes (fill="#RRGGBB") and inside the
    // style="fill:#RRGGBB;…" Figma emits alongside them — the Map glyphs only
    // have the latter, so matching attributes alone under-reports them.
    const colors = [...inner.matchAll(/(?:stroke|fill)(?:="|:)(#[0-9A-Fa-f]{6})/g)]
      .map((m) => m[1].toUpperCase());
    const distinct = [...new Set(colors)];
    const leaked = distinct.filter((c) => CHROME_COLORS.has(c));
    if (leaked.length) {
      throw new Error(`${name}: Figma canvas chrome leaked through (${leaked.join(", ")})`);
    }

    const out = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(${-x}, ${-y})">
${inner}
</g>
</svg>
`;
    const dir = file.replace("frame-", "").replace(".svg", "");
    mkdirSync(path.join(outDir, dir), { recursive: true });
    writeFileSync(path.join(outDir, dir, `${name}.svg`), out);
    manifest.push({ set: dir, name, w, h, colors: distinct });
  }
}

writeFileSync(path.join(here, "manifest.json"), JSON.stringify(manifest, null, 2));

// Report which glyphs are monochrome (template-tintable) vs multi-colour.
const mono = manifest.filter((m) => m.colors.length <= 1);
const multi = manifest.filter((m) => m.colors.length > 1);
console.log(`extracted ${manifest.length} glyphs`);
console.log(`  monochrome (template-tintable): ${mono.length}`);
console.log(`  multi-colour (keep original)  : ${multi.length}`);
for (const m of multi) console.log(`     ${m.set}/${m.name}  ${m.colors.join(" ")}`);

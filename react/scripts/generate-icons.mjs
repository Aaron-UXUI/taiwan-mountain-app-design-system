#!/usr/bin/env node
// Generates react/src/components/icons/glyphs.generated.tsx from the *same*
// per-glyph SVGs the SwiftUI kit ships, so both platforms draw identical
// Figma artwork.
//
// Those SVGs are produced by swiftui/Tools/extract.mjs from frame-level Figma
// exports — see swiftui/Tools/README.md. Before this existed the React icons
// were hand-authored `<path d="M…">` approximations, and at least one (radio)
// was measurably wrong: a 16pt ring with an 8pt centre in gray-800, where
// Figma has a 20pt ring with a 12pt centre in gray-black.
//
// Run: node scripts/generate-icons.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const toolsDir = path.resolve(here, "../../swiftui/Tools");
const iconsDir = path.join(toolsDir, "icons");
const outFile = path.resolve(here, "../src/components/icons/glyphs.generated.tsx");

/** Figma ink -> CSS. The two ink greys become `currentColor` so callers can
 *  tint a glyph (an IconButton's white-on-green, say); the rest are semantic
 *  or knockout colours that must not follow the caller. Mirrors the
 *  `DSIcon.defaultTint` rule on the SwiftUI side. */
const COLORS = {
  "#1D1F1B": "currentColor",
  "#494C44": "currentColor",
  "#FDFDFC": "var(--color-gray-white)",
  "#FFD966": "var(--color-accent-yellow-100)",
  "#396100": "var(--color-semantic-success-700)",
  "#CF0000": "var(--color-semantic-destruct-600)",
};

/** SVG attribute -> JSX prop. */
const ATTRS = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "stroke-dasharray": "strokeDasharray",
  "fill-rule": "fillRule",
  "fill-opacity": "fillOpacity",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
};

/** React's canonical name where it differs from the Figma export's. */
const rename = (name) => name.replace(/-fill$/, "-filled");

function toJsx(svgSource) {
  let inner = svgSource
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim();

  // The `style="fill:…;fill:color(display-p3 …)"` duplicates carry no extra
  // information — the plain fill/stroke attribute already holds the colour,
  // and it is about to be remapped anyway.
  inner = inner.replace(/\s+style="[^"]*"/g, "");
  // ids would collide once several glyphs share a page.
  inner = inner.replace(/\s+id="[^"]*"/g, "");

  for (const [from, to] of Object.entries(COLORS)) {
    inner = inner.replaceAll(from, to);
  }
  for (const [from, to] of Object.entries(ATTRS)) {
    inner = inner.replaceAll(`${from}=`, `${to}=`);
  }

  return inner
    .split("\n")
    .map((line) => (line.trim() ? `      ${line.trim()}` : ""))
    .filter(Boolean)
    .join("\n");
}

const sets = readdirSync(iconsDir).filter((d) =>
  readdirSync(path.join(iconsDir, d), { withFileTypes: true }).length > 0
);

let out = `// GENERATED FILE — do not edit by hand.
// Source: swiftui/Tools/icons/**, the per-glyph SVGs extracted from Figma
// frame exports (see swiftui/Tools/README.md). The SwiftUI kit bundles the
// same files as imagesets, so both platforms draw identical artwork.
// Regenerate with: node scripts/generate-icons.mjs
import type { ReactNode } from "react";

`;

const summary = [];

for (const set of sets.sort()) {
  const dir = path.join(iconsDir, set);
  const files = readdirSync(dir).filter((f) => f.endsWith(".svg")).sort();
  const key = `GLYPHS_${set.toUpperCase()}`;
  const names = files.map((f) => rename(path.basename(f, ".svg")));

  out += `export const ${key}: Record<string, ReactNode> = {\n`;
  for (const file of files) {
    const name = rename(path.basename(file, ".svg"));
    const jsx = toJsx(readFileSync(path.join(dir, file), "utf8"));
    out += `  ${JSON.stringify(name)}: (\n    <>\n${jsx}\n    </>\n  ),\n`;
  }
  out += `};\n\n`;
  summary.push(`${set}: ${files.length}`);
}

writeFileSync(outFile, out);
console.log(`Wrote ${path.relative(process.cwd(), outFile)}`);
console.log(`Glyph sets — ${summary.join(", ")}`);

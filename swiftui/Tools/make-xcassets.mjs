#!/usr/bin/env node
// Builds DSIcons.xcassets (one imageset per glyph) from the extracted SVGs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const manifest = JSON.parse(readFileSync(path.join(here, "manifest.json"), "utf8"));
const outRoot = path.join(here, "../Sources/DesignSystemKit/Resources/DSIcons.xcassets");

rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });
writeFileSync(
  path.join(outRoot, "Contents.json"),
  JSON.stringify({ info: { author: "xcode", version: 1 } }, null, 2) + "\n"
);

// Glyphs whose multiple colours ARE the design and so must not be flattened to
// a single tint: the weather sun glyphs (yellow sun + grey cloud) and the radio
// glyphs (white centre knocked out of a dark ring — tinting would fill it in).
const KEEP_ORIGINAL = new Set(["weather/cloud-sun", "weather/sunny", "24/radio", "24/radio-fill"]);

let template = 0;
let original = 0;
for (const g of manifest) {
  const key = `${g.set}/${g.name}`;
  const assetName = `ds-${g.set}-${g.name}`;
  const dir = path.join(outRoot, `${assetName}.imageset`);
  mkdirSync(dir, { recursive: true });

  copyFileSync(path.join(here, "icons", g.set, `${g.name}.svg`), path.join(dir, `${g.name}.svg`));

  const isTemplate = !KEEP_ORIGINAL.has(key);
  isTemplate ? template++ : original++;

  const contents = {
    images: [{ filename: `${g.name}.svg`, idiom: "universal" }],
    info: { author: "xcode", version: 1 },
    properties: {
      "preserves-vector-representation": true,
      ...(isTemplate ? { "template-rendering-intent": "template" } : {}),
    },
  };
  writeFileSync(path.join(dir, "Contents.json"), JSON.stringify(contents, null, 2) + "\n");
}

console.log(`wrote ${manifest.length} imagesets to DSIcons.xcassets`);
console.log(`  template-rendered (tintable): ${template}`);
console.log(`  original-rendered (fixed)   : ${original}`);

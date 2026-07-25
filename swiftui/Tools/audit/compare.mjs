#!/usr/bin/env node
// Extracts the real fill/stroke colours Figma uses for each component out of
// the section exports, maps them onto design tokens, and diffs that against
// the tokens the corresponding SwiftUI component actually references.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const swiftDir = path.resolve(here, "../../Sources/DesignSystemKit/Components");

// hex -> DSColor member name
const TOKEN = {
  "#ECF0E4": "primaryGreen50", "#D6E0C3": "primaryGreen100", "#5C6647": "primaryGreen700",
  "#464F34": "primaryGreen800", "#343C25": "primaryGreen900",
  "#FFF19C": "accentYellow50", "#FFD966": "accentYellow100",
  "#695400": "accentYellow700", "#493700": "accentYellow900",
  "#006AD1": "info600", "#0051B8": "info700",
  "#467800": "success600", "#396100": "success700",
  "#CF0000": "destruct600", "#B20000": "destruct700",
  "#1D1F1B": "black", "#FDFDFC": "white", "#F3F5EE": "gray50",
  "#DBDED5": "gray100", "#C5C8BE": "gray200", "#989C91": "gray400", "#494C44": "gray800",
};
// Figma canvas chrome + section backdrop, never part of a component.
const CHROME = new Set(["#1E1E1E", "#9747FF", "#8A38F5"]);

// Figma component group name -> SwiftUI file basename
const MAP = {
  "sec-clickable.svg": {
    "Buttons": "DSButton",
    "CheckBox": "DSCheckBox",
    "Chips / Large": "DSChips",
    "Chips / Small": "DSChips",
    "Chips / Salient": "DSChips",
    "Toggles": "DSToggle",
    "Radio button": "DSRadioSelection",
    "Location Pin": "DSLocationPin",
    "Segmented Controls": "DSSegmentedControl",
    "Stepper": "DSStepper",
    "Text Field": "DSTextField",
    "User Location": "DSUserLocationMarker",
    "Icon Buttons": "DSIconButton",
    "Link / Further Info": "DSLinkFurtherInfo",
    "Link": "DSLink",
  },
  "sec-indicators.svg": {
    "Progress Indicator": "DSStepProgressIndicator",
    "Badge": "DSBadge",
    "Label": "DSStatusTags",
    "Payment Info": "DSPaymentInfo",
    "Carousel Indicators": "DSPageIndicator",
    "Banner": "DSBanner",
    "Crowdedness": "DSStatusTags",
    "Snackbar": "DSSnackbar",
    "OfflineMap": "DSOfflineMapCard",
  },
  "sec-containers.svg": {
    "Cards / Scene": "DSCardScene",
    "Cards / Description": "DSCardDescription",
    "Cards / Tickets": "DSCardTickets",
    "Cards / Notification": "DSCardNotification",
    "Cards / Saved Items": "DSCardSavedItems",
    "List / weather": "DSListRows",
    "List / Setting": "DSListRows",
    "List / DownloadMap": "DSListRows",
    "List / Notification": "DSListRows",
  },
  "sec-disclosure.svg": {
    "Collapse / Text": "DSCollapseText",
    "Accordion / Chips": "DSAccordion",
    "Accordion / CheckBox": "DSAccordion",
    "Bottom Sheets": "DSBottomSheet",
    "Tooltip": "DSTooltip",
    "Tab": "DSTabBar",
  },
  "sec-navigation.svg": {
    "Navigation Bar": "DSAppTabView",
    "Search Bar": "DSSearchable",
    "App Bar": "DSAppBar",
    "Bottom Bar": "DSBottomBar",
  },
};

function walk(d) {
  const o = [];
  for (const e of readdirSync(d)) {
    const f = path.join(d, e);
    if (statSync(f).isDirectory()) o.push(...walk(f));
    else if (e.endsWith(".swift")) o.push(f);
  }
  return o;
}
const swiftByName = new Map(walk(swiftDir).map((f) => [path.basename(f, ".swift"), f]));

/** Balanced slice of `<g id="NAME" …> … </g>`. */
function sliceGroup(svg, id) {
  const marker = `<g id="${id}"`;
  const start = svg.indexOf(marker);
  if (start === -1) return null;
  // Guard against prefix collisions (e.g. "Label" vs "Label_2").
  const after = svg[start + marker.length];
  if (after !== ">" && after !== " ") return null;
  const openEnd = svg.indexOf(">", start);
  let i = openEnd + 1, depth = 1;
  while (depth > 0) {
    const o = svg.indexOf("<g", i), c = svg.indexOf("</g>", i);
    if (c === -1) break;
    if (o !== -1 && o < c) { depth++; i = o + 2; } else { depth--; i = c + 4; }
  }
  return svg.slice(start, i);
}

const results = [];
for (const [file, comps] of Object.entries(MAP)) {
  const svg = readFileSync(path.join(here, file), "utf8");
  for (const [figmaName, swiftName] of Object.entries(comps)) {
    const seg = sliceGroup(svg, figmaName);
    if (!seg) { results.push({ figmaName, swiftName, error: "group not found in export" }); continue; }

    const figmaTokens = new Set();
    const unknown = new Set();
    for (const m of seg.matchAll(/(?:fill|stroke)(?:="|:)(#[0-9A-Fa-f]{6})/g)) {
      const hex = m[1].toUpperCase();
      if (CHROME.has(hex)) continue;
      if (TOKEN[hex]) figmaTokens.add(TOKEN[hex]);
      else unknown.add(hex);
    }

    const p = swiftByName.get(swiftName);
    if (!p) { results.push({ figmaName, swiftName, error: "swift file missing" }); continue; }
    const used = new Set([...readFileSync(p, "utf8").matchAll(/DSColor\.([A-Za-z0-9]+)/g)].map((m) => m[1]));

    results.push({
      figmaName, swiftName,
      missing: [...figmaTokens].filter((t) => !used.has(t)),
      unknown: [...unknown],
    });
  }
}

console.log("Figma colour tokens NOT referenced by the matching SwiftUI component");
console.log("(shared files like DSChips/DSListRows/DSStatusTags cover several Figma components)\n");
for (const r of results) {
  if (r.error) { console.log(`!! ${r.figmaName.padEnd(24)} ${r.error}`); continue; }
  if (!r.missing.length && !r.unknown.length) continue;
  console.log(`${r.figmaName.padEnd(24)} -> ${r.swiftName}`);
  if (r.missing.length) console.log(`     missing tokens : ${r.missing.join(", ")}`);
  if (r.unknown.length) console.log(`     non-token hexes: ${r.unknown.join(", ")}`);
}

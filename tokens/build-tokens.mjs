#!/usr/bin/env node
// Generates the platform-specific token files from the single canonical
// tokens/design-tokens.json. Run `npm run tokens:build` after editing that
// JSON — never hand-edit the generated files listed in its `_meta.generatedOutputs`.
//
// Outputs:
//   tokens/design-tokens.css                          (spacing / radius / color)
//   react/src/tokens.css                              (typeface / font-weight / typography / elevation)
//   swiftui/Sources/DesignSystemKit/Tokens/Generated/*.swift

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const tokens = JSON.parse(readFileSync(path.join(root, "tokens/design-tokens.json"), "utf8"));

const GENERATED_NOTICE_CSS = `/* GENERATED FILE — do not edit by hand.
 * Source of truth: tokens/design-tokens.json
 * Regenerate with: npm run tokens:build (node tokens/build-tokens.mjs)
 */\n`;
const GENERATED_NOTICE_SWIFT = `// GENERATED FILE — do not edit by hand.
// Source of truth: tokens/design-tokens.json
// Regenerate with: npm run tokens:build (node tokens/build-tokens.mjs)
`;

// ---------- tokens/design-tokens.css (spacing / radius / color) ----------

function buildDesignTokensCss() {
  const lines = [GENERATED_NOTICE_CSS, ":root {", "  /* Spacing */"];
  for (const entry of Object.values(tokens.spacing)) {
    lines.push(`  ${entry.cssVar}: ${entry.value}px;`);
  }
  lines.push("", "  /* Radius */");
  for (const entry of Object.values(tokens.radius)) {
    const suffix = entry.note ? ` /* ${entry.note} */` : "";
    lines.push(`  ${entry.cssVar}: ${entry.value}px;${suffix}`);
  }
  for (const [groupName, group] of Object.entries(tokens.color)) {
    lines.push("", `  /* Color — ${groupName} */`);
    for (const entry of Object.values(group)) {
      lines.push(`  ${entry.cssVar}: ${entry.value};`);
    }
  }
  lines.push("}", "");
  writeFileSync(path.join(root, "tokens/design-tokens.css"), lines.join("\n"));
}

// ---------- src/tokens.css (typeface / font-weight / typography / elevation) ----------

function buildSrcTokensCss() {
  const lines = [
    `@import "../../tokens/design-tokens.css";`,
    "",
    GENERATED_NOTICE_CSS,
    "/*",
    " * Typography + Elevation tokens — canonical values pulled from the Figma file's",
    " * own \"🔶 Design System\" → Style Guide → Typography / Elevation documentation",
    " * frames, not from individual component instances. See tokens/design-tokens.json",
    " * `_meta.typographyElevationSource` and each entry's own `note` field for the",
    " * known Style Guide inconsistencies (kept faithfully, not silently corrected).",
    " */",
    ":root {"
  ];

  for (const entry of Object.values(tokens.typeface)) {
    lines.push(`  ${entry.cssVar}: ${entry.value};`);
  }
  lines.push("");
  for (const entry of Object.values(tokens.fontWeight)) {
    lines.push(`  ${entry.cssVar}: ${entry.value};`);
  }

  let lastGroup = null;
  const groupOf = (key) => key.replace(/[A-Z0-9].*$/, "");
  for (const [key, entry] of Object.entries(tokens.typography)) {
    if (key.startsWith("_")) continue;
    const group = groupOf(key);
    if (group !== lastGroup) {
      lines.push("", `  /* ${group[0].toUpperCase()}${group.slice(1)} */`);
      lastGroup = group;
    }
    const note = entry.note ? ` /* ${entry.note} */` : "";
    lines.push(`  ${entry.cssSizeVar}: ${entry.size}px;${note}`);
    // Number/L and Number/M share one line-height var — only emit it once.
    const alreadyEmitted = lines.some((l) => l.trimStart().startsWith(`${entry.cssLineHeightVar}:`));
    if (!alreadyEmitted) {
      lines.push(`  ${entry.cssLineHeightVar}: ${entry.lineHeight}px;`);
    }
  }

  lines.push("", "  /* Elevation */");
  for (const [key, entry] of Object.entries(tokens.elevation)) {
    if (key.startsWith("_")) continue;
    const varName = `--elevation-${entry.swiftName.replace("level", "")}`;
    lines.push(`  ${varName}: ${entry.css};`);
  }

  lines.push("}", "");
  writeFileSync(path.join(root, "react/src/tokens.css"), lines.join("\n"));
}

// ---------- Swift generated tokens ----------

const swiftOutDir = path.join(root, "swiftui/Sources/DesignSystemKit/Tokens/Generated");

function writeSwift(filename, body) {
  mkdirSync(swiftOutDir, { recursive: true });
  writeFileSync(path.join(swiftOutDir, filename), `${GENERATED_NOTICE_SWIFT}import SwiftUI\n\n${body}`);
}

function buildSwiftColor() {
  const lines = ["public enum DSColor {"];
  for (const [groupName, group] of Object.entries(tokens.color)) {
    lines.push(`    // MARK: ${groupName}`);
    for (const entry of Object.values(group)) {
      const hex = entry.value.replace("#", "0x");
      lines.push(`    public static let ${entry.swiftName} = Color(hex: ${hex})`);
    }
  }
  lines.push("}");
  writeSwift("DSColor.swift", lines.join("\n") + "\n");
}

function buildSwiftSpacingAndRadius() {
  const spacingLines = ["public enum DSSpacing {"];
  for (const entry of Object.values(tokens.spacing)) {
    spacingLines.push(`    public static let ${entry.swiftName}: CGFloat = ${entry.value}`);
  }
  spacingLines.push("}");

  const radiusLines = ["public enum DSRadius {"];
  for (const entry of Object.values(tokens.radius)) {
    if (entry.swiftName === null) {
      radiusLines.push(`    // "${entry.cssVar}" intentionally omitted: ${entry.swiftNote}`);
      continue;
    }
    radiusLines.push(`    public static let ${entry.swiftName}: CGFloat = ${entry.value}`);
  }
  radiusLines.push("}");

  writeSwift("DSSpacing.swift", `${spacingLines.join("\n")}\n\n${radiusLines.join("\n")}\n`);
}

const RELATIVE_TEXT_STYLE = new Set([
  "largeTitle", "title", "title2", "title3", "headline", "subheadline", "body", "callout", "footnote", "caption", "caption2"
]);

function buildSwiftTypography() {
  const lines = ["public extension DSTypeStyle {"];
  for (const [key, entry] of Object.entries(tokens.typography)) {
    if (key.startsWith("_")) continue;
    if (!RELATIVE_TEXT_STYLE.has(entry.swiftRelativeTo)) {
      throw new Error(`Unknown Font.TextStyle "${entry.swiftRelativeTo}" for typography.${key}`);
    }
    const weight = entry.weight === "semibold" ? ".semibold" : ".regular";
    const design = entry.family === "sf-mono" ? ", design: .monospaced" : "";
    if (entry.note) lines.push(`    /// ${entry.note}`);
    lines.push(
      `    static let ${entry.swiftName} = DSTypeStyle(baseSize: ${entry.size}, relativeTo: .${entry.swiftRelativeTo}, weight: ${weight}${design})`
    );
  }
  lines.push("}");
  writeSwift("DSTypography+Tokens.swift", lines.join("\n") + "\n");
}

const SWIFT_COLOR_REFS = {
  gray100: "DSColor.gray100",
  black8: "Color.black.opacity(0.08)",
  black12: "Color.black.opacity(0.12)",
  black16: "Color.black.opacity(0.16)"
};

function buildSwiftElevation() {
  const lines = ["public extension DSElevationStyle {"];
  for (const [key, entry] of Object.entries(tokens.elevation)) {
    if (key.startsWith("_")) continue;
    const layers = entry.swiftLayers
      .map((l) => {
        const color = SWIFT_COLOR_REFS[l.colorRef];
        if (!color) throw new Error(`Unknown swiftColorRef "${l.colorRef}" in elevation.${key}`);
        return `(${color}, ${l.radius}, ${l.x}, ${l.y})`;
      })
      .join(", ");
    lines.push(`    static let ${entry.swiftName} = DSElevationStyle(layers: [${layers}])`);
  }
  lines.push("}");
  writeSwift("DSElevation+Tokens.swift", lines.join("\n") + "\n");
}

function buildSwiftMotion() {
  const lines = ["public extension DSMotion {"];
  for (const [key, entry] of Object.entries(tokens.motion)) {
    if (key.startsWith("_")) continue;
    lines.push(`    /// ${entry.note}`);
    lines.push(`    static let ${entry.swiftName} = Animation.easeInOut(duration: ${entry.duration})`);
  }
  lines.push("}");
  writeSwift("DSMotion+Tokens.swift", lines.join("\n") + "\n");
}

buildDesignTokensCss();
buildSrcTokensCss();
buildSwiftColor();
buildSwiftSpacingAndRadius();
buildSwiftTypography();
buildSwiftElevation();
buildSwiftMotion();

console.log("Tokens generated:");
console.log("  tokens/design-tokens.css");
console.log("  react/src/tokens.css");
console.log("  swiftui/Sources/DesignSystemKit/Tokens/Generated/*.swift");

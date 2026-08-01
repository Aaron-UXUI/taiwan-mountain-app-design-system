import type { Meta, StoryObj } from "@storybook/react";
import { STYLE_PAGE_NOTE, STYLE_PAGE_TITLE, STYLE_TILE, STYLE_TILE_CAPTION, STYLE_TILE_ROW } from "./styleGuide";

/**
 * Figma: Style Guide → Radius (node `12948:43758`).
 *
 * The Style Guide draws each step as a single rounded corner rather than a
 * fully rounded box, which is what makes the difference between 12 and 16
 * legible at all — reproduced here for the same reason. It also drops the
 * tile's fill and draws only the top and left edges in black, so the corner
 * itself is the whole illustration.
 */
type RadiusToken = { label: string; variable: string; token: string };

const RADII: RadiusToken[] = [
  { label: "0", variable: "--radius-none", token: "radius.none" },
  { label: "4", variable: "--radius-xxs", token: "radius.xxs" },
  { label: "8", variable: "--radius-xs", token: "radius.xs" },
  { label: "12", variable: "--radius-s", token: "radius.s" },
  { label: "16", variable: "--radius-m", token: "radius.m" },
  { label: "Rounded", variable: "--radius-rounded", token: "radius.rounded" },
];

function RadiusScale() {
  return (
    <div style={{ fontFamily: "var(--typeface-pingfang-tc)", color: "var(--color-gray-black)" }}>
      <h2 style={STYLE_PAGE_TITLE}>Radius</h2>
      <div style={STYLE_TILE_ROW}>
        {RADII.map((r) => {
          const isRounded = r.label === "Rounded";
          return (
            <div key={r.variable} style={{ textAlign: "center" }}>
              <div
                title={`var(${r.variable})`}
                style={{
                  ...STYLE_TILE,
                  // "Rounded" needs the extra width for its word, and Figma
                  // pushes the word to the right edge so the corner stays clear.
                  width: isRounded ? 90 : 60,
                  justifyContent: isRounded ? "flex-end" : "center",
                  ...(isRounded
                    ? {
                        fontSize: "var(--type-scale-headline-4)",
                        lineHeight: "var(--line-height-h4)",
                      }
                    : null),
                  backgroundColor: "transparent",
                  borderRadius: 0,
                  // Only the top-left corner is rounded, as in the Style Guide.
                  borderTopLeftRadius: `var(${r.variable})`,
                  borderTop: "1px solid var(--color-gray-black)",
                  borderLeft: "1px solid var(--color-gray-black)",
                }}
              >
                {r.label}
              </div>
              <code style={STYLE_TILE_CAPTION}>{r.token}</code>
            </div>
          );
        })}
      </div>

      <p style={STYLE_PAGE_NOTE}>
        <strong>Rounded</strong> is a fully-rounded shape, not a number. It ships as{" "}
        <code>--radius-rounded: 10000px</code> for CSS — the literal value of the Figma variable — but is deliberately{" "}
        <em>not</em> exposed as a SwiftUI constant —
        use <code>Capsule()</code> there instead, so the shape stays correct at any size rather than relying on an
        arbitrarily large corner.
      </p>
    </div>
  );
}

const meta: Meta = {
  title: "Style/Radius",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

export const Scale: Story = {
  render: () => <RadiusScale />,
};

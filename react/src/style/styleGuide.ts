import type { CSSProperties } from "react";

/**
 * Shared chrome for the Style section, taken from the Figma file's
 * 🔶 Design System → Style Guide (node `12948:43829`).
 *
 * Every frame there is built the same way — an H1 title, a 24px gap, then a
 * row of 60×60 tiles 32px apart — so the pages share these rather than each
 * re-deriving them and drifting apart.
 */

/** Figma draws every Style Guide frame title at Headline/1, Semibold. */
export const STYLE_PAGE_TITLE: CSSProperties = {
  fontSize: "var(--type-scale-headline-1)",
  lineHeight: "var(--line-height-h1)",
  letterSpacing: "var(--letter-spacing-h1)",
  fontWeight: "var(--font-weight-semibold)",
  margin: "0 0 24px",
};

/** The 32px gap between tiles, used by Elevation, Radius and Spacing. */
export const STYLE_TILE_ROW: CSSProperties = {
  display: "flex",
  gap: 32,
  alignItems: "center",
  flexWrap: "wrap",
};

/**
 * The tile itself: 60×60, radius `xs`, white, carrying Elevation/1. Elevation
 * overrides `boxShadow` to show its own level; Radius overrides the corners
 * and swaps the fill for two black edges.
 */
export const STYLE_TILE: CSSProperties = {
  width: 60,
  height: 60,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
  borderRadius: "var(--radius-xs)",
  backgroundColor: "var(--color-gray-white)",
  boxShadow: "var(--elevation-1)",
  // Figma labels each tile in Headline/3.
  fontSize: "var(--type-scale-headline-3)",
  lineHeight: "var(--line-height-h3)",
  fontWeight: "var(--font-weight-semibold)",
};

/** The token name printed under each tile — a Storybook addition, not Figma. */
export const STYLE_TILE_CAPTION: CSSProperties = {
  display: "block",
  marginTop: 6,
  fontSize: 10,
  color: "var(--color-gray-800)",
};

/** The explanatory paragraph that closes several of the pages. */
export const STYLE_PAGE_NOTE: CSSProperties = {
  marginTop: 32,
  fontSize: "var(--type-scale-body-s)",
  lineHeight: "var(--line-height-body-s)",
  color: "var(--color-gray-800)",
  maxWidth: 720,
};

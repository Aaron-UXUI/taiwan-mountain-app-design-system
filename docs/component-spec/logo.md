# Logo

> **Figma is the source of truth for anything visual.** Node `12649:28641` (`Logo`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
The app's own brand mark (wordmark/simplified mark), used in places like a splash screen, an About section, or an AppBar. Unlike the icon sets, this represents a specific, singular piece of brand identity rather than a selectable glyph from a set.

## Interaction
None — static brand mark, not interactive.

## Accessibility
- Exposed with an image semantic and a fixed, meaningful accessible name identifying the brand ("台灣山林"), since — unlike the generic icon sets — this graphic *is* the primary conveyor of meaning at its point of use and must not be hidden from assistive technology.

## State
None — static.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| Size | Large / Small | Matches the mark's prominence to its placement (e.g. splash screen vs. compact header). |

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Mark color | `color.primary.green-800` |
| Background (if boxed) | `color.gray-white` |
| Corner radius (if boxed) | `radius.xxs` |
| Wordmark typography | `font-weight.semibold`, `typeface.pingfang-tc` |

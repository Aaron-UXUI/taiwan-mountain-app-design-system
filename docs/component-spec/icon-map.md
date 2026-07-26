# IconMap

## Component Behavior
A fixed 24px glyph set specialized for map/place-context iconography: tree, camera, walk (trail), and info. Renders exactly one glyph at a time, selected by name.

## Interaction
None — decorative graphic, typically embedded inside CardScene, BottomSheet Map_Info content, or similar place-detail contexts.

## Accessibility
- Marked as decorative/hidden from assistive technology by default.
- Where a glyph conveys categorical meaning on its own (e.g. "this is a hiking trail" indicated only by the walk glyph), the containing content must restate that meaning in text (visible or accessible-only) rather than relying on the glyph alone.

## State
None — static graphic.

## Variant
| Axis | Values |
|---|---|
| Glyph (`name`) | tree, camera, walk, info |

## Animation
None.

## Token Mapping
Renders via `currentColor` — inherits color from its containing context. No spacing/radius/elevation tokens apply. Fixed intrinsic size: 24×24px.

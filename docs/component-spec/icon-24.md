# Icon24

## Component Behavior
The largest and most general-purpose glyph set (fixed 24px), covering 22 glyphs spanning navigation (map, search, notify, member), map/location actions (heart, radio/gps), and other general-purpose iconography, including matching outline/filled pairs for glyphs that need an active/inactive visual distinction. Renders exactly one glyph at a time, selected by name.

## Interaction
None on its own — this is the glyph set most frequently embedded inside interactive controls (Button, IconButton, NavigationBar, AppBar, etc.), which own the actual interaction.

## Accessibility
- Marked as decorative/hidden from assistive technology by default.
- Every interactive control that embeds an Icon24 glyph as its *only* content is responsible for supplying its own accessible name (as seen in IconButton, NavigationBar, AppBar, CheckBoxNavigation, all of which attach explicit labels alongside their icon-only buttons).
- Outline/filled glyph pairs are a purely visual encoding of an active/inactive state; the containing control must also expose that state programmatically (e.g. `aria-current`, `aria-pressed`), matching the pattern already used in NavigationBar and CheckBoxNavigation.

## State
None — static graphic; outline vs. filled selection is driven by the parent's state.

## Variant
| Axis | Values |
|---|---|
| Glyph (`name`) | 22 glyphs, including outline/filled pairs (e.g. map, search, notify, member, heart, radio/gps and related) |

## Animation
None.

## Token Mapping
Renders via `currentColor`/`fill="currentColor"` — inherits color from its containing context. No spacing/radius/elevation tokens apply. Fixed intrinsic size: 24×24px.

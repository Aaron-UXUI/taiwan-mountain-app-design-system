# Icon16

## Component Behavior
A fixed 16px glyph renderer covering exclamation, external-link (arrow-up-right), notification-bell (notified/non-notified), and heart (outline/filled) glyphs. Renders exactly one glyph at a time, selected by name.

## Interaction
None — decorative graphic content, not an interactive control by itself (it is commonly placed inside an interactive parent such as IconButton or a chip).

## Accessibility
- Marked as decorative/hidden from assistive technology by default.
- When used as the sole content of an interactive control (e.g. a bare heart-icon save button), the *containing* control is responsible for supplying an accessible name — Icon16 itself never exposes one.
- The notified/non-notified and heart/heart-filled glyph pairs are visually-only distinctions; if that distinction is meaningful to the user, it must also be exposed through the containing control's accessible state (e.g. a toggle-button's pressed state), not through the glyph choice alone.

## State
None — static graphic; glyph selection (e.g. heart vs. heart-filled) is driven by the parent's state, not an internal state of Icon16.

## Variant
| Axis | Values |
|---|---|
| Glyph (`name`) | exclamation, arrow-up-right, notified, non-notified, heart, heart-filled |

## Animation
None.

## Token Mapping
Renders via `currentColor` — inherits color from its containing context. No spacing/radius/elevation tokens apply. Fixed intrinsic size: 16×16px.

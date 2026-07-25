# Icon20

## Component Behavior
A fixed 20px glyph renderer covering search, microphone, check, info, credit-card, and password-visibility (open-eye/close-eye) glyphs. Renders exactly one glyph at a time, selected by name.

## Interaction
None on its own — the password-visibility pair (open-eye/close-eye) is typically the visual face of a toggle control on a password field, so the actual interaction (toggling text visibility) belongs to the containing field, not to Icon20.

## Accessibility
- Marked as decorative/hidden from assistive technology by default.
- When paired with an interactive parent (e.g. a "show password" toggle), that parent must expose its own accessible name/state reflecting what the glyph currently represents — Icon20 does not.

## State
None — static graphic.

## Variant
| Axis | Values |
|---|---|
| Glyph (`name`) | search, microphone, check, info, credit-card, open-eye, close-eye |

## Animation
None.

## Token Mapping
Renders via `currentColor` — inherits color from its containing context. No spacing/radius/elevation tokens apply. Fixed intrinsic size: 20×20px.

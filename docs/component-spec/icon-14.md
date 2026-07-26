# Icon14

## Component Behavior
A fixed 14px glyph renderer covering a small set of compact glyphs (chevron, secured/lock) used inline with small text (e.g. inside a Badge or a caption). Renders exactly one glyph at a time, selected by name; it has no independent visual states.

## Interaction
None — purely decorative graphic content, not an interactive control.

## Accessibility
- Marked as decorative/hidden from assistive technology by default, because the glyph alone rarely carries meaning independent of the text or control it sits beside.
- When a glyph is used as the *only* content conveying meaning (e.g. a lock icon standing alone for "secured", with no adjacent text), the consumer must supply an accessible label at the point of use — this component does not supply one itself.

## State
None — static graphic.

## Variant
| Axis | Values |
|---|---|
| Glyph (`name`) | chevron, secured |

## Animation
None — any rotation/motion (e.g. a chevron flipping on expand/collapse) is applied by the *containing* component (see AccordionCheckBox, AccordionChips, CollapseText), not by Icon14 itself.

## Token Mapping
Renders via `currentColor`/`stroke="currentColor"` — inherits text color from its containing context rather than referencing a color token directly. No spacing/radius/elevation tokens apply (no background or box). Fixed intrinsic size: 14×14px.

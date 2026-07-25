# ChipsSmall

## Component Behavior
A compact, tappable filter chip carrying a short text label, used for secondary/dense filter groups (e.g. a horizontally scrolling row of filter tags under a map or list). Functionally equivalent to ChipsLarge but sized for higher density contexts.

## Interaction
- **Toggle active**: pointer click/tap toggles the active value.
- **Keyboard**: focusable as a button; Enter/Space toggles.
- Commonly arranged in a horizontally-scrollable row, so swipe/scroll (not chip activation) is used to reach off-screen chips.

## Accessibility
- Exposed as a toggle **button**; active/inactive state communicated to assistive tech via the toggle-button semantic.
- Label text is the accessible name.
- When placed in a horizontally-scrolling row, the row itself should be reachable and scrollable by keyboard/assistive scroll gestures, independent of any individual chip's focus.

## State
| State | Description |
|---|---|
| Inactive | Default appearance. |
| Active | Emphasized fill/border. |

## Variant
No variant axis — single style, label text only.

## Animation
None defined.

## Token Mapping
| Role | Token |
|---|---|
| Inactive fill | `color.gray-white` / border `color.gray-100` |
| Active fill | `color.primary.green-50` / border `color.primary.green-900` |
| Label text | `color.gray-800` (inactive) / `color.primary.green-900` (active) |
| Corner radius | `radius.xs` |
| Padding | `spacing.m` |
| Label typography | `typography.body-s`, weight switches `font-weight.regular` → `font-weight.semibold` on active |

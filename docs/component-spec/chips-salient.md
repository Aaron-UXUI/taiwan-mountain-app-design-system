# ChipsSalient

## Component Behavior
A non-interactive, high-emphasis status label used to call attention to important contextual information about the content it's attached to (e.g. a special notice or a warning about a place or item). Unlike a chip used for filtering, this is read-only — it is never toggled by the user.

## Interaction
None — purely informational, not a focusable or actionable control.

## Accessibility
- Rendered as plain text content; its meaning must be conveyed through the visible label text itself (there is no separate accessible-name mechanism), so label copy should be self-explanatory without relying on color alone (e.g. don't rely on the Warning color to convey "warning" — say so in the text).
- Because it's non-interactive, it is not part of the keyboard tab order.

## State
No interactive state — content is static once rendered.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `type` | General / Special / Warning | Selects the semantic emphasis color — General for neutral/brand emphasis, Special for a highlighted/featured note, Warning for cautionary information. |

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| General fill | `color.primary.green-900` |
| Special fill | `color.accent.yellow-900` |
| Warning fill | `color.semantic.destruct-700` |
| Label text | `color.gray-white` |
| Corner radius | `radius.xs` |
| Padding | `spacing.m` |
| Label typography | `typography.body-s`, `font-weight.semibold` |

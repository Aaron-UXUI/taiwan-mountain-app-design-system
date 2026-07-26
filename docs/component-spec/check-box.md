# CheckBox

## Component Behavior
A binary selection control paired with a text label, used when a user can independently select any number of items in a list (non-exclusive choice). The label is part of the control's hit target — activating either the box or its label toggles the same value.

## Interaction
- **Toggle**: pointer click/tap anywhere on the control-plus-label toggles checked/unchecked.
- **Keyboard**: focusable; Space toggles the value.
- **Disabled**: no input accepted; value cannot change until re-enabled.

## Accessibility
- Exposed as a native **checkbox** input, so assistive tech announces "checked"/"unchecked" state automatically.
- The associated text is programmatically bound as the control's label (not just visually adjacent), so the accessible name matches what's on screen.
- The visual box itself is decorative (`aria-hidden`) — the underlying input carries the real semantics.
- Disabled state is exposed as the native disabled attribute, so it's both visually and programmatically non-operable.

## State
| State | Description |
|---|---|
| Unchecked | Default, not selected. |
| Checked | Selected. |
| Disabled | Not operable (checked or unchecked value is not editable). |

## Variant
No visual variant axis — one style, label text is the only customizable content.

## Animation
None — state change is instantaneous (no transition defined).

## Token Mapping
| Role | Token |
|---|---|
| Box border / checked fill | `color.primary.green-800` |
| Checkmark color | `color.gray-white` |
| Label text color | `color.gray-800` |
| Box corner radius | `radius.xxs` |
| Label-to-box spacing | `spacing.s` |
| Row spacing | `spacing.m` |
| Label typography | `typography.body-m`, `font-weight.regular` |

# PaymentInfo

## Component Behavior
A summary card presenting a title, a set of ticket/line-item entries, and a total amount — used to confirm what's being purchased before checkout. Can be shown in a Selected or Unselected visual state, e.g. when presented as one of several payment/order options.

## Interaction
- If used as a selectable option among several, activation (selecting this card) is handled by a containing control (e.g. wrapped in a RadioButton or click handler); PaymentInfo itself is a display surface.

## Accessibility
- All line items and the total must be exposed as readable text; the total should be clearly associated with (e.g. immediately follow, or be explicitly labeled relative to) the line items it sums.
- If used as a selectable option, the containing control must expose the Selected/Unselected state programmatically (matching the visual state), not rely on styling alone.

## State
| State | Description |
|---|---|
| Selected | Emphasized appearance, indicating this is the chosen option. |
| Unselected | De-emphasized appearance. |

## Variant
No structural variant — content-driven (title, line items, total).

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Text | `color.gray-800` / `color.gray-black` |
| Total emphasis typography | `typography.headline-1` / `headline-3`, `font-weight.semibold` |
| Line-item typography | `typography.body-m` / `body-s`, `font-weight.regular` |
| Spacing | `spacing.lm`, `spacing.m`, `spacing.sm`, `spacing.xs` |

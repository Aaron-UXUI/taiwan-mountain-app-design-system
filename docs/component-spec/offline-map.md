# OfflineMap

## Component Behavior
A collapsible status card reporting offline-map signal coverage, broken down by carrier, with a signal-quality summary (e.g. "some" vs. "most" carriers missing signal) and an expand/collapse control to reveal per-carrier detail rows.

## Interaction
- **Expand/collapse**: pointer click/tap on the row header toggles visibility of the per-carrier detail.
- **Keyboard**: header is focusable as a button; Enter/Space toggles expansion.

## Accessibility
- Header is exposed as a **button** with an expanded/collapsed state.
- The signal-summary text ("Some"/"Most" missing) is the primary carrier of meaning and must remain as visible/accessible text — not conveyed by icon or color alone.
- Each carrier's icon inside the expanded detail is decorative; the carrier name must be present as text alongside it.

## State
| State | Description |
|---|---|
| Collapsed | Summary only. |
| Expanded | Per-carrier detail rows visible. |
| Signal: Some missing | Partial coverage gap. |
| Signal: Most missing | Widespread coverage gap. |

`expanded` and `signalMissing` are independent axes.

## Variant
No separate variant axis beyond the states above.

## Animation
None defined — expand/collapse is an instant show/hide.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-white` |
| Warning tone | `color.accent.yellow-700` |
| Success tone | `color.semantic.success-700` |
| Alert tone | `color.semantic.destruct-700` |
| Divider/detail bg | `color.gray-100` |
| Text | `color.gray-800` |
| Corner radius | `radius.xs` / `radius.xxs` |
| Typography | `typography.body-m`, `font-weight.regular` / `semibold` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.xs` |

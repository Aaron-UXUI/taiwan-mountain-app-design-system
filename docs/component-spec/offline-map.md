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
| Axis | Values | Description |
|---|---|---|
| `signalMissing` | **None** / Some / Most | How much coverage is unstable. `None` = nothing missing, every area stable (green); `Some` = partial gap (amber); `Most` = widespread gap (red). |
| `expanded` | No / Yes | Whether the per-carrier detail rows are visible. |

Figma authors the expanded view only for `signalMissing=Some`, and it always
shows the same three-carrier breakdown, so the expanded content does not vary
with the signal value.

## Variant
No separate variant axis beyond the states above.

## Animation
None defined — expand/collapse is an instant show/hide.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-white` |
| `None` summary fill | `color.semantic.success-700` |
| `Some` summary fill | `color.accent.yellow-700` |
| `Most` summary fill | `color.semantic.destruct-700` |
| Summary text | `color.gray-white` |
| Divider/detail bg | `color.gray-100` |
| Text | `color.gray-800` |
| Corner radius | `radius.xs` / `radius.xxs` |
| Typography | `typography.body-m`, `font-weight.regular` / `semibold` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.xs` |

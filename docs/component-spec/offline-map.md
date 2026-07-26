# OfflineMap

> **Figma is the source of truth for anything visual.** Node `16343:7890`.
> This document records behaviour and accessibility decisions only.

## Component Behavior
A collapsible readout of offline-map signal coverage, broken down by carrier.
It is a **stack of per-carrier rows**, not a card: each row is
"[carrier mark] [carrier name] [coverage pill]", and each carrier carries its
*own* coverage value and colour. Collapsed, only the first row is shown, with
a disclosure chevron; expanded, the remaining carriers appear beneath it.

> Earlier ports read this as a bordered card wrapping a single summary pill,
> with the carriers listed underneath in a different row format. There is no
> card, no surrounding padding, and no aggregate summary in the design.

## Interaction
- **Expand/collapse**: pointer click/tap on the first row toggles visibility of the remaining carrier rows.
- **Keyboard**: the first row is focusable as a button; Enter/Space toggles expansion.
- With only one carrier there is nothing to disclose, so no chevron is shown and the row is not a button.

## Accessibility
- The first row is exposed as a **button** with an expanded/collapsed state.
- Each row's coverage text is the primary carrier of meaning and must remain as visible/accessible text — not conveyed by colour alone.
- The carrier mark is decorative; the carrier name must be present as text alongside it.

## State
| Axis | Values | Description |
|---|---|---|
| `signalMissing` | **None** / Some / Most | How much coverage is unstable, **per carrier**. `None` = nothing missing, every area stable (green); `Some` = partial gap (amber); `Most` = widespread gap (red). |
| `expanded` | No / Yes | Whether the remaining carrier rows are visible. |

Figma authors the expanded view only for `signalMissing=Some`, and it always
shows the same three-carrier breakdown, so the expanded content does not vary
with the first row's signal value.

## Variant
No separate variant axis beyond the states above.

## Animation
None defined — expand/collapse is an instant show/hide.

## Token Mapping
| Role | Token |
|---|---|
| Container fill | none — the rows sit directly on the surrounding surface |
| `None` pill fill | `color.semantic.success-700` |
| `Some` pill fill | `color.accent.yellow-700` |
| `Most` pill fill | `color.semantic.destruct-700` |
| Pill text | `color.gray-white`, `typography.body-m`, `font-weight.regular` |
| Carrier name | `color.gray-800`, `typography.body-m` |
| Pill corner radius | `radius.xs` |
| Spacing | `spacing.s` (row gap), `spacing.sm` (pill padding), `spacing.xs` |

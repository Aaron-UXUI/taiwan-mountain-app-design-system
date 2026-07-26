# ProgressIndicator

> **Figma is the source of truth for anything visual.** Node `1274:20052`.
> This document records behaviour and accessibility decisions only.

## Component Behavior
A three-step progress readout (選擇票券 → 付款方式 → 付款資訊 in the checkout flow) showing which step of a fixed sequence the user currently occupies, with labels for each step. Steps are joined by plain rules — there are no status dots, and completed steps are not styled differently from upcoming ones.

## Interaction
None in the base component — it is a status readout; if steps are made tappable to jump back, that behavior belongs to the containing flow, not to ProgressIndicator itself.

## Accessibility
- Should be exposed as a **progress**/step-indicator semantic communicating current step number and total steps (e.g. "Step 2 of 3: Method"), not conveyed by visual position or connecting-line color alone.
- Each step's label must be present as visible/accessible text.

## State
| State | Description |
|---|---|
| Choice | First step is current. |
| Method | Second step is current. |
| Info | Third step is current. |

## Variant
No separate variant axis beyond current step.

## Animation
None defined — the connecting-line/step emphasis updates instantly as the current step changes.

## Token Mapping
| Role | Token |
|---|---|
| Current step | `color.primary.green-900`, `font-weight.semibold` |
| Every other step (completed **and** upcoming — they are not distinguished) | `color.gray-800`, `font-weight.regular` |
| Connecting rule | `color.gray-800` at a hairline weight — not a light grey line |
| Typography | `typography.body-m` |
| Spacing | `spacing.lm` (horizontal), `spacing.sm` (vertical) |

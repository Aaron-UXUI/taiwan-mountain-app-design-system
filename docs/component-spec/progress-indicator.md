# ProgressIndicator

## Component Behavior
A three-step progress readout (e.g. Choice → Method → Info in a checkout flow) showing which step of a fixed sequence the user currently occupies, with labels for each step.

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
| Completed/current step | `color.primary.green-900` |
| Upcoming step | `color.gray-200` |
| Text | `color.gray-800` |
| Typography | `typography.body-m`, `font-weight.regular` / `semibold` |
| Spacing | `spacing.lm`, `spacing.sm`, `spacing.xs` |

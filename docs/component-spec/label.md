# Label

## Component Behavior
A general-purpose status label used for conditions such as a place's open/partial/closed hours state. Semantically similar to Crowdedness but for a different fact (operating status rather than crowd level).

## Interaction
None — read-only status display.

## Accessibility
- The visible text itself must state the condition in words ("Open" / "Partial" / "Closed" or the relevant family of states) — never rely on color alone to distinguish states.

## State
| State | Description |
|---|---|
| Open | Fully operating. |
| Partial | Limited/partial operating hours. |
| Close | Not currently operating. |

(Additional related states in the same family follow the same pattern.)

## Variant
No separate variant axis — the state values above are the only variation.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Open | `color.primary.green-900` |
| Partial | `color.accent.yellow-900` |
| Closed | `color.semantic.destruct-700` |
| Text | `color.gray-white` |
| Corner radius | `radius.xxs` |
| Typography | `typography.body-s`, `font-weight.regular` |
| Spacing | `spacing.xs` |

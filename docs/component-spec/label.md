# Label

> **Figma is the source of truth for anything visual.** Node `9037:15126` (`Label`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A general-purpose status label used for conditions such as a place's open/partial/closed hours state. Semantically similar to Crowdedness but for a different fact (operating status rather than crowd level).

## Interaction
None — read-only status display.

## Accessibility
- The visible text itself must state the condition in words ("Open" / "Partial" / "Closed" or the relevant family of states) — never rely on color alone to distinguish states.

## State
| State | Default text | Description |
|---|---|---|
| Open | 今日開放 | Fully operating today. |
| Partial | 部分開放 | Limited/partial operating hours. |
| Close | 暫停開放 | Not currently operating. |
| family | 親子友善 | Family-friendly. Authored in Figma as lowercase `family`, alongside the three operating states rather than as a separate component. |

## Variant
No separate variant axis — the state values above are the only variation.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Open | `color.primary.green-900` |
| Partial | `color.primary.green-900` — deliberately the **same** fill as Open in Figma |
| Close | `color.semantic.destruct-700` |
| family | `color.accent.yellow-900` |
| Text | `color.gray-white` |
| Corner radius | `radius.xxs` |
| Typography | `typography.body-s`, `font-weight.regular` |
| Spacing | `spacing.xs` |

# Crowdedness

## Component Behavior
A status label communicating a place's current real-time crowd level, on a three-point scale from comfortable to crowded (e.g. shown inside BottomSheet's Map_Info layout for a trail or scenic spot).

## Interaction
None — read-only status display.

## Accessibility
- The label text itself must state the condition in words ("Comfortable" / "Partially Crowded" / "Crowded") — color must never be the sole means of distinguishing the three levels, since color-blind users or screen-reader users would otherwise have no way to perceive the distinction.

## State
| State | Description |
|---|---|
| Comfortable | Low crowd level. |
| Partial Crowded | Moderate crowd level. |
| Crowded | High crowd level. |

## Variant
No separate variant axis — the three states above are the only variation.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Comfortable | `color.semantic.success-700` |
| Partial Crowded | `color.accent.yellow-700` |
| Crowded | `color.semantic.destruct-700` |
| Fill | `color.gray-white` |
| Text | `color.gray-800` |
| Corner radius | `radius.xs` |
| Typography | `typography.body-m`, `font-weight.regular` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.xs` |

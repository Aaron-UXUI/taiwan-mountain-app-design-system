# Banner

> **Figma is the source of truth for anything visual.** Node `15301:14557` (`Banner`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A full-width, persistent notice bar (e.g. an offline-mode indicator) shown at a fixed position in the layout — distinct from Snackbar, which is transient and dismissible. A Banner communicates an ongoing condition that remains true until the underlying condition changes.

## Interaction
None currently defined — the present implementation is read-only; if a dismiss or action control is added in the future, that action must be independently focusable and labeled.

## Accessibility
- Because it represents a state change that the user should be made aware of as it happens (e.g. going offline), it should be exposed as a live region so assistive tech announces its appearance without requiring the user to discover it by navigating there manually.
- The message text is the banner's entire accessible content — must be self-explanatory without relying on position or color alone.

## State
Presence/absence only — shown while its underlying condition is true, removed once it no longer applies.

## Variant
| Axis | Values |
|---|---|
| `type` | Default (currently the only defined type; reserved for future severity variants such as warning/error) |

## Animation
None defined — currently appears/disappears instantly with its underlying condition.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-800` |
| Text | `color.gray-white` |
| Typography | `typography.body-s`, `font-weight.regular` |
| Spacing | `spacing.lm`, `spacing.xs` |

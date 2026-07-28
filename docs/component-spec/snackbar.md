# Snackbar

> **Figma is the source of truth for anything visual.** Node `16014:7927` (`Snackbar`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A transient, bottom-anchored message bar (e.g. confirming an action just completed), optionally dismissible via a close control, that disappears on its own after a short duration or when dismissed — distinct from Banner, which persists as long as its underlying condition holds.

## Interaction
- **Dismiss**: pointer click/tap on the close control (when shown) hides the Snackbar immediately.
- **Auto-dismiss**: disappears automatically after a timeout, handled by the surrounding flow.
- **Keyboard**: the close control, when present, is focusable and activated by Enter/Space.

## Accessibility
- Should be exposed as a live region so its message is announced automatically when it appears, since it's transient and the user isn't necessarily looking at it.
- The close control is icon-only and requires a fixed accessible name ("關閉").
- Auto-dismiss timing must be generous enough (or pausable/extendable) for assistive technology users to have time to perceive and act on the message before it disappears — a very short, non-adjustable timeout is an accessibility risk.

## State
Content toggle: close control shown/hidden.

## Variant
No structural variant — content-driven (message text).

## Animation
None defined at the component level (enter/exit slide or fade, if used, is handled by the presentation/toast system that mounts and unmounts it).

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-800` |
| Text | `color.gray-white` |
| Corner radius | `radius.xxs` |
| Elevation | `elevation.3` |
| Typography | `typography.body-m`, `font-weight.regular` |
| Spacing | `spacing.m`, `spacing.s`, `spacing.sm` |

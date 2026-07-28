# Keyboard

> **Figma is the source of truth for anything visual.** Node `1631:21178` (`Keyboard`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.
> **Not implemented on either platform.** The OS already draws this chrome;
> reproducing it would work against native behaviour rather than with it.


## Component Behavior
A mockup of the standard system text keyboard (full QWERTY-equivalent layout with configurable return-key and space-key labels), used only to compose realistic input-flow mockups. It does not accept or process real keystrokes — any actual text entry happens through the platform's real system keyboard, not through this component.

## Interaction
None — non-interactive; keys are visual only and do not respond to input.

## Accessibility
- Should be hidden from assistive technology entirely, since it is a static illustration of a keyboard rather than a functioning input surface — exposing individual "keys" to a screen reader would be misleading, as pressing them does nothing.
- The real text input the mockup accompanies must have its own, separate, fully operable accessible input control.

## State
No interactive state.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| Return-key label | free text | Mirrors how the return key's label changes contextually on real system keyboards (e.g. "Search", "Go", "Done"). |
| Space-key label | free text | Mirrors contextual space-bar labeling on real system keyboards. |

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Key fill | `color.gray-white` |
| Key border/shadow | `color.gray-200` |
| Text | `color.gray-black` |
| Accent key (e.g. return) | `color.semantic.info-600` |
| Typography | `typography.body-m` |
| Spacing | `spacing.xs` |

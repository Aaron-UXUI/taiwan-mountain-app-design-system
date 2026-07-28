# SpinnerOnDark

> **Figma is the source of truth for anything visual.** Node `12469:18955` (`Spinner / On Dark`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
The dark-surface counterpart to SpinnerOnWhite — same dot-ring fade animation, using light-colored dots so it remains visible against a dark/filled background (e.g. inside a Primary Button's Loading state).

## Interaction
None — non-interactive busy/waiting signal.

## Accessibility
- Exposed with a **status** semantic and a fixed accessible label ("Loading"), identical in behavior to SpinnerOnWhite — the light/dark distinction is purely visual contrast tuning, not a difference in meaning or announced state.

## State
No discrete states — single continuous animated appearance while mounted.

## Variant
No variant axis — single style, tuned for dark/filled backgrounds; shares its animation data with SpinnerOnWhite.

## Animation
8-dot sequential fade: **1s, linear, infinite** loop while visible.

## Token Mapping
| Role | Token |
|---|---|
| Dot color | `color.gray-white` |
| Dot shape | `radius.rounded` |

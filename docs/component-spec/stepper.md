# Stepper

## Component Behavior
A numeric quantity control with decrement and increment actions flanking a numeric display (e.g. selecting ticket count). Supports an error sub-state that surfaces an inline error message below the control (e.g. exceeding available quantity).

## Interaction
- **Decrement / Increment**: pointer click/tap on either edge control adjusts the displayed amount by one step; each edge control can be independently suppressed (e.g. decrement disabled at the minimum).
- **Keyboard**: each edge control is a focusable button activated by Enter/Space; consumers may additionally support arrow-key adjustment when the numeric display itself is focused.
- **Error**: triggered by the surrounding flow (e.g. requesting more than available) — shows a message but does not itself prevent further attempts unless the specific edge control is also disabled.

## Accessibility
- The decrement and increment controls are each exposed as **buttons** with fixed accessible labels ("減少" / "增加") since they carry icon-only content.
- The numeric amount should be exposed as a live value (e.g. via a live region or as part of a labelled numeric field) so a screen reader announces the updated quantity after each adjustment, not just silently re-rendered text.
- The error message must be programmatically associated with the control (e.g. as a description) so assistive tech announces it, not just visually presented below.
- Each edge button independently reflects disabled state at range limits.

## State
| State | Description |
|---|---|
| Default | Fully interactive. |
| Error | Inline error message shown. |
| Disabled | Not operable. |

## Variant
No variant axis beyond state — one visual style.

## Animation
None defined — amount changes render instantly.

## Token Mapping
| Role | Token |
|---|---|
| Button border / icon | `color.gray-800` / `color.gray-black` |
| Disabled | `color.gray-200` |
| Error text/border | `color.semantic.destruct-600` / `destruct-700` |
| Corner radius | `radius.s` |
| Spacing | `spacing.s`, `spacing.xs` |
| Amount typography | `typography.number-l` (SF Mono), `font-weight.semibold` |
| Error text typography | `typography.body-s` |

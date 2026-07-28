# Stepper

> **Figma is the source of truth for anything visual.** Node `12190:23425` (`Stepper`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


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
| 0 | At the minimum. Still interactive, but with nothing left to remove, so **decrement is disabled** while increment stays available. Authored in Figma literally as `State=0`. |
| Default | Fully interactive. |
| Error | Inline error message shown. |
| Disabled | Not operable. |

A platform whose native stepper takes a value range (e.g. SwiftUI's
`Stepper(value:in:)`) gets the `0` state for free — the control disables
decrement at the lower bound itself — and does not need it as a separate
named state.

## Variant
No variant axis beyond state — one visual style.

## Animation
None defined — amount changes render instantly.

## Token Mapping
| Role | Token |
|---|---|
| Container border | Default `color.gray-200` (1pt) / Error `color.semantic.destruct-600` (2pt) / Disabled `color.gray-100` (1pt) |
| Icons | `color.gray-black`, `color.gray-200` when that end is at its limit |
| Disabled amount text | `color.gray-200` |
| Error text/border | `color.semantic.destruct-600` / `destruct-700` |
| Corner radius | `radius.s` |
| Spacing | `spacing.s`, `spacing.xs` |
| Amount typography | `typography.number-l` (SF Mono), `font-weight.semibold` |
| Error text typography | `typography.body-s` |

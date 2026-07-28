# SegmentedControls

> **Figma is the source of truth for anything visual.** Node `598:6408` (`Segmented Controls`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A two-option exclusive switch (e.g. sort order: distance vs. popularity) rendered as a single track with a sliding indicator behind whichever option is currently selected. Exactly one of the two options is selected at all times — there is no "neither selected" state.

## Interaction
- **Select**: pointer click/tap on either option moves the selection (and the sliding indicator) to that side; the previously selected side is deselected.
- **Keyboard**: focusable; arrow keys move the indicator between Left and Right; Enter/Space on a focused option also selects it.
- This is a controlled component from the consumer's perspective — activation reports the newly selected side back to the caller rather than managing selection internally.

## Accessibility
- Exposed as a **toggle group** / pair of toggle buttons, each carrying `aria-pressed` reflecting whether it is the currently selected side, so assistive tech can announce "Distance, selected" vs. "Popularity, not selected."
- Each option's own label text is its accessible name.
- The sliding indicator itself is purely decorative and hidden from assistive tech — the pressed-state on each button conveys the actual selection.

## State
| State | Description |
|---|---|
| Left selected | Indicator and emphasis on the left option. |
| Right selected | Indicator and emphasis on the right option. |

## Variant
No variant axis — always exactly two labeled options.

## Animation
Sliding indicator transition: **0.15s, ease**, moving between the two option positions on selection change.

## Token Mapping
| Role | Token |
|---|---|
| Track fill | `color.gray-50` |
| Indicator fill | `color.primary.green-800` |
| Selected label text | `color.gray-white` |
| Unselected label text | `color.gray-800` |
| Corner radius | `radius.xs` |
| Padding | `spacing.s`, `spacing.lm` |
| Elevation (indicator) | `elevation.1` |
| Typography | `typography.body-m`, `font-weight.regular` |

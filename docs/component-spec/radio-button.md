# RadioButton

> **Figma is the source of truth for anything visual.** Node `816:4968`; the
> control itself is the shared `icon / 24px, Type=Radio` component (`816:4626`
> / `816:4627`), so render that glyph rather than drawing a ring by hand.
> This document records behaviour and accessibility decisions only.

## Component Behavior
A single-choice-among-a-set selection control paired with a text label, used when exactly one option must be chosen from a group. Supports an "Expanded" style where selecting the option reveals an additional inline text input for the user to supply a custom value tied to that option (e.g. "其他" with a free-text follow-up).

## Interaction
- **Select**: pointer click/tap on the control or its label selects it, and — because radio semantics are mutually exclusive — deselects any other option in the same group.
- **Keyboard**: arrow keys move selection among the group's options; Space/Enter also selects the focused option.
- **Expanded style**: once selected, an inline text field appears for supplementary input; typing in that field does not change the radio selection itself.

## Accessibility
- Exposed as a native **radio** input grouped with its siblings so assistive tech announces group membership, position ("2 of 4"), and checked state.
- The associated text is programmatically bound as the accessible name.
- When Expanded reveals a text input, that input must have its own accessible label distinct from the radio option's label (not just a generic placeholder), and its appearance/disappearance should be announced (e.g. via a live region or by being a natural part of tab order right after the radio).

## State
Native checked/unchecked, plus an expanded sub-state that shows/hides the supplementary text field.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `radioStyle` | Default / Expanded | Default is a plain choice; Expanded additionally reveals a text input when selected, for options that need a custom value. |

## Animation
None defined — the supplementary input's appearance is an instant show/hide, not an animated reveal.

## Token Mapping
| Role | Token |
|---|---|
| Radio glyph (ring **and** checked centre) | `color.gray-black` — the control is not tinted brand green in either state |
| Row separator | `color.gray-200` |
| Label text | `color.gray-black`, `typography.body-l`, `font-weight.regular` |
| Expanded input border | `color.gray-400` |
| Input field radius | `radius.xxs` |
| Row spacing | `spacing.s` (glyph→label), `spacing.sm` (row padding), `spacing.xs` |

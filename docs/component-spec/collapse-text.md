# CollapseText

## Component Behavior
A long text passage that is initially clamped to a limited number of lines with a "show more"/"show less" affordance to expand or re-collapse the full text in place.

## Interaction
- **Expand/collapse**: pointer click/tap on the show-more/show-less affordance toggles between clamped and full text.
- **Keyboard**: affordance is focusable as a button; Enter/Space toggles.

## Accessibility
- The affordance is exposed as a **button** with an expanded/collapsed state, so assistive tech announces the current state and that more content is available.
- The full text should already be present in the accessible tree even while visually clamped (i.e. visual truncation only, not content removal), so assistive tech users are never blocked from the complete text regardless of the visual state.

## State
| State | Description |
|---|---|
| Collapsed | Text visually clamped; affordance reads "show more" (or equivalent). |
| Expanded | Full text shown; affordance reads "show less". |

## Variant
No variant axis — content-driven (text length varies).

## Animation
Expand-arrow rotation: **0.15s, ease** on the affordance icon.

## Token Mapping
| Role | Token |
|---|---|
| Text | `color.gray-800` |
| Affordance text | `color.primary.green-800` |
| Typography | `typography.body-m`, `font-weight.regular` / `semibold` |
| Spacing | `spacing.lm`, `spacing.s`, `spacing.xs` |

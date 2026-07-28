# ChipsLarge

> **Figma is the source of truth for anything visual.** Node `812:5259` (`Chips / Large`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A large, tappable filter/selection chip carrying a single short text label. Used where filter options need higher visual prominence than a standard small chip (e.g. a primary category selector). Selection is binary and toggled by direct interaction with the chip itself.

## Interaction
- **Toggle select**: pointer click/tap toggles the selected value; typically used as one of several chips where multiple can be selected independently (non-exclusive), unless the containing flow restricts it to one-at-a-time.
- **Keyboard**: focusable as a button; Enter/Space toggles selection.

## Accessibility
- Exposed as a **button** with a pressed/toggled state communicated via a toggle-button semantic (selected ⇄ not selected), so assistive tech can announce the current selection state.
- Label text is the accessible name.

## State
| State | Description |
|---|---|
| Unselected | Default appearance. |
| Selected | Emphasized fill/border indicating active selection. |

## Variant
No variant axis beyond state — single visual style, label text only.

## Animation
None defined — selection state changes are instantaneous.

## Token Mapping
| Role | Token |
|---|---|
| Unselected fill | `color.gray-white` / border `color.gray-100` |
| Selected fill | `color.primary.green-50` / border `color.primary.green-900` |
| Label text | `color.gray-800` (unselected) / `color.primary.green-900` (selected) |
| Corner radius | `radius.xs` |
| Internal padding | `spacing.s`, `spacing.m` |
| Label typography | `typography.body-m`, weight switches `font-weight.regular` → `font-weight.semibold` on select |

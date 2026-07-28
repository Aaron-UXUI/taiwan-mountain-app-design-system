# AccordionChips

> **Figma is the source of truth for anything visual.** Node `1242:16464` (`Accordion / Chips`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A collapsible filter group functionally parallel to AccordionCheckBox, but revealing a wrapped/flowing set of selectable chip options (each rendered as a small Badge-style toggle) rather than a vertical CheckBox list. Header shows the title and a count of currently selected chips.

## Interaction
- **Expand/collapse**: pointer click/tap on the header toggles visibility of the chip options.
- **Option selection**: each revealed chip option toggles independently on click/tap.
- **Keyboard**: header is focusable as a button; Enter/Space toggles expansion; once expanded, Tab moves into the chip options, each activated by Enter/Space.

## Accessibility
- Header is exposed as a **button** with an expanded/collapsed state.
- The selected-count badge is part of the header's accessible name/description.
- Each revealed chip option is exposed as a toggle button with its own accessible name (the chip's label) and pressed/selected state.
- The chip group should be programmatically associated with the header controlling it.

## State
| State | Description |
|---|---|
| Collapsed, none selected | Default resting appearance. |
| Collapsed, some selected | Header shows a non-zero selected count. |
| Expanded | Chip options visible. |

`expanded` and `selected` are independent boolean flags.

## Variant
No structural variant — content-driven (title and chip option list vary per instance).

## Animation
Expand-arrow rotation: **0.15s, ease**.

## Token Mapping
| Role | Token |
|---|---|
| Text | `color.gray-black` |
| Chip fill (unselected/selected) | `color.gray-100` / `color.primary.green-800` |
| Corner radius | `radius.xs` |
| Typography | `typography.body-m`, `font-weight.regular` |
| Spacing | `spacing.m`, `spacing.s`, `spacing.xs` |
| (Nested) Badge tokens | see [badge.md](badge.md) |

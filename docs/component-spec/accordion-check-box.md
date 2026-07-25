# AccordionCheckBox

## Component Behavior
A collapsible filter group: a header (title + count of currently selected options) that expands to reveal a list of CheckBox options, and collapses to hide them again. The header additionally reflects whether any option within it is currently selected, independent of its expanded/collapsed state.

## Interaction
- **Expand/collapse**: pointer click/tap on the header toggles visibility of the option list; does not change any option's checked value.
- **Option selection**: each revealed option is an independent CheckBox — toggling one does not affect others or the expand/collapse state.
- **Keyboard**: header is focusable as a button; Enter/Space toggles expansion; once expanded, Tab moves into the revealed CheckBox list in order.

## Accessibility
- Header is exposed as a **button** with an expanded/collapsed state so assistive tech announces "expanded"/"collapsed".
- The selected-count badge is part of the header's accessible name/description (not decorative), since it communicates state that would otherwise be lost.
- The revealed option list should be programmatically associated with the header that controls it (e.g. as its controlled region), so assistive tech understands the relationship even before expansion.
- Each option inside follows CheckBox's own accessibility spec.

## State
| State | Description |
|---|---|
| Collapsed, none selected | Default resting appearance. |
| Collapsed, some selected | Header shows a non-zero selected count. |
| Expanded | Option list visible. |

`expanded` and `selected` (any option checked) are independent boolean flags — all four combinations are valid.

## Variant
No structural variant — content-driven (title text and option list vary per instance).

## Animation
Expand-arrow rotation: **0.15s, ease** when toggling between collapsed and expanded.

## Token Mapping
| Role | Token |
|---|---|
| Text | `color.gray-black` |
| Fill | `color.gray-white` |
| Typography | `typography.body-m`, `font-weight.regular` |
| Spacing | `spacing.s` |
| (Nested) Badge / CheckBox tokens | see [badge.md](badge.md), [check-box.md](check-box.md) |

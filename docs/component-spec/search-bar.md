# SearchBar

> **Figma is the source of truth for anything visual.** Node `376:456` (`Search Bar`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A text search entry point with a filter action, a cancel action, and a dropdown of search history/suggestion items shown while the field holds focus. Distinct from TextField in that it's a dedicated search entry surface with its own filter/cancel actions and result-suggestion list rather than a generic form input.

## Interaction
- **Focus/type**: tapping the field or typing moves it through Default → Focused → Typing appearances; suggestion/history items appear once focused.
- **Select a suggestion/history item**: pointer click/tap on an item fills the field with that value (and typically triggers the search).
- **Filter**: pointer click/tap on the filter action opens filtering UI (e.g. a BottomSheet Filter_MapSearch/Filter_Discover).
- **Cancel**: pointer click/tap on the cancel action clears the field and/or exits search mode.
- **Keyboard**: field is a standard text input; suggestion/history items are reachable and selectable via arrow keys + Enter, matching standard combobox behavior.

## Accessibility
- The field should be exposed as a **search** input (or combobox when suggestions are shown), with the suggestion/history list programmatically associated with it so assistive tech understands they are options for the current field, not unrelated content.
- Filter and cancel controls are icon-only and require fixed accessible names ("篩選" / "取消").
- The suggestion list's currently-highlighted item (during arrow-key navigation) must be announced, consistent with standard combobox/listbox behavior.

## State
| State | Description |
|---|---|
| Default | Empty, not focused. |
| Focused | Holds focus; history/suggestions may show. |
| Typing | Actively receiving input. |

## Variant
No structural variant — content-driven (placeholder text, history items, suggestion items).

## Animation
None defined — state and dropdown appearance/disappearance render instantly.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-50` / `color.gray-white` |
| Border | `color.gray-200` / `color.gray-400` |
| Text | `color.gray-800` / `color.gray-black` |
| Corner radius | `radius.m` / `radius.s` |
| Elevation (suggestion dropdown) | `elevation.3` / `elevation.5` |
| Typography | `typography.body-l` / `body-s` |
| Spacing | `spacing.s`, `spacing.sm` |

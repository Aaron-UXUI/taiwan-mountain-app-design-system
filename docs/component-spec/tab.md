# Tab

> **Figma is the source of truth for anything visual.** Node `13518:14481` (`Tab`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A single item in a set of tabs used to switch between mutually-exclusive content panels (e.g. categories within a screen). Carries a label and an optional count badge; exactly one tab in a given set is active at a time.

## Interaction
- **Select**: pointer click/tap on a tab activates it and, by convention, deactivates the previously active tab in the same set.
- **Keyboard**: within a tab set, arrow keys move focus between tabs; Enter/Space (or automatic activation on arrow-key focus, depending on platform convention) activates the focused tab.

## Accessibility
- Exposed with a **tab** semantic, grouped under a tablist, with the active tab's selected state exposed (`aria-selected`-equivalent) so assistive tech announces which tab is currently active and its position within the set.
- Each tab's activated panel must be programmatically associated with it (e.g. as its controlled region) so switching tabs is understood as switching content, not just switching appearance.
- The optional badge count is part of the tab's accessible name/description, not decorative.

## State
| State | Description |
|---|---|
| Inactive | Default. |
| Active | Currently selected tab; its associated panel is shown. |

## Variant
| Axis | Values | Purpose |
|---|---|---|
| Size | Small / Medium / Large | Matches tab prominence to the density of the tab set's context. |

## Animation
None defined at the individual Tab level (a shared active-indicator slide, if present, belongs to the containing tab set, not to an individual Tab).

## Token Mapping
| Role | Token |
|---|---|
| Active underline | `color.primary.green-800` |
| Active label | `color.primary.green-900` |
| Inactive underline | `color.gray-200` — every tab is underlined, not just the active one |
| Inactive text | `color.gray-800` |
| Disabled-adjacent tone | `color.gray-200` |
| Badge (error-adjacent use) | `color.semantic.destruct-700` |
| Corner radius (badge) | `radius.rounded` |
| Typography | `typography.body-l` / `body-m` / `body-s` / `headline-4` depending on size, `font-weight.regular` / `semibold` |
| Spacing | `spacing.m`, `spacing.xs` |

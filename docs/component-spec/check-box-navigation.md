# CheckBoxNavigation

> **Figma is the source of truth for anything visual.** Node `355:60400` (`CheckBox / Navigation`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A single destination button used inside NavigationBar and BottomBar, combining an icon, a text label, and an optional badge (none / unread dot / unread count) with an active/inactive appearance.

## Interaction
- **Activate**: pointer click/tap selects this destination.
- **Keyboard**: focusable; Enter/Space activates.

## Accessibility
- Exposed as a **button**/tab-like control with a current-page indicator on the active item.
- The icon is always paired with its own visible text label — the label, not the icon, is the primary accessible name.
- The badge (dot or count) is part of the item's accessible name/description when present (e.g. "Notifications, 3 unread"), not conveyed by appearance alone.

## State
| State | Description |
|---|---|
| Inactive | Default. |
| Active | Currently selected destination; shown with an active-indicator. |

## Variant
| Axis | Values | Purpose |
|---|---|---|
| Badge | none / dot / count | Communicates absence, presence, or a specific quantity of pending items (e.g. unread notifications) for this destination. |

## Animation
None defined — active-indicator appears/disappears instantly on selection change.

## Token Mapping
| Role | Token |
|---|---|
| Active indicator/text | `color.primary.green-50` |
| Text | `color.gray-800` / `color.gray-black` |
| Corner radius (badge) | `radius.rounded` |
| Typography | `typography.body-s`, `font-weight.semibold` |
| Spacing | `spacing.sm`, `spacing.xs` |

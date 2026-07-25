# NavigationBar

## Component Behavior
The app's primary bottom navigation bar, presenting four top-level destinations (activity/map/notify/member). Exactly one destination is active at a time, reflecting the currently displayed top-level screen. Internally composed of four CheckBoxNavigation items.

## Interaction
- **Switch destination**: pointer click/tap on any item navigates to that top-level destination and marks it active; the previously active item is deactivated.
- **Keyboard**: each item is independently focusable in sequence; Enter/Space activates the focused item.

## Accessibility
- Exposed as a navigation landmark containing a set of destination controls, each carrying a current-page indicator (`aria-current`-equivalent) on the active item, so assistive tech announces which top-level section is currently displayed.
- Each item's icon-only content is paired with a visible/accessible text label (via CheckBoxNavigation) — never icon-only without a label.

## State
| State | Description |
|---|---|
| `activity` active | Activity tab is the current destination. |
| `map` active | Map tab is the current destination. |
| `notify` active | Notifications tab is the current destination. |
| `member` active | Member/profile tab is the current destination. |

Exactly one of the four is active at any time.

## Variant
No variant axis — fixed four-item set.

## Animation
None defined at the bar level (each item's own active-indicator transition belongs to CheckBoxNavigation).

## Token Mapping
| Role | Token |
|---|---|
| Bar fill | `color.gray-white` |
| Item tokens | see [check-box-navigation.md](check-box-navigation.md) |

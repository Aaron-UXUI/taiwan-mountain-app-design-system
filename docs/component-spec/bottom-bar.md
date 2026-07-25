# BottomBar

## Component Behavior
A configurable bottom action area for a screen — not the persistent app-wide NavigationBar, but a per-screen action surface that can present a single button, two buttons, the full NavigationBar, or an order-summary + "place order" action, depending on the screen's needs. Always terminates with the system HomeIndicator area.

## Interaction
- **Button / 2 Buttons types**: pointer click/tap on either button triggers its respective action (see Button).
- **Navigation type**: embeds a full NavigationBar — see its own interaction spec.
- **Place Order type**: pointer click/tap on the primary action commits the order; the ticket summary itself is not interactive.
- **Keyboard**: each embedded control follows its own keyboard behavior.

## Accessibility
- Follows the accessibility spec of whichever control(s) it embeds (Button, NavigationBar, CheckBoxNavigation).
- Order-summary text (ticket title, line items, price) in the Place Order type must be exposed as readable text, associated with the action button so assistive tech understands what is being committed (e.g. "Place order — NT$450, 2 tickets"), not just a bare "Place order" label.

## State
No dedicated state of its own — reflects the states of whichever controls it embeds.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `type` | Button / 2 Buttons / Navigation / Place Order | Selects which action configuration the bottom bar presents for the current screen. |

## Animation
None defined at this component's level; embedded controls animate per their own specs.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-white` |
| Text | `color.gray-800` / `color.gray-black` |
| Elevation | `elevation.2` |
| Typography | `typography.body-s` / `headline-1` / `headline-3` (price emphasis), `font-weight.semibold` |
| Spacing | `spacing.lm`, `spacing.m`, `spacing.s`, `spacing.sm`, `spacing.xs` |
| Nested component tokens | see [button.md](button.md), [navigation-bar.md](navigation-bar.md), [check-box-navigation.md](check-box-navigation.md), [home-indicator.md](home-indicator.md) |

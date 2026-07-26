# BottomBar

> **Figma is the source of truth for anything visual.** Node `1480:37613`.
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.

## Component Behavior
A configurable bottom action area for a screen — not the persistent app-wide NavigationBar, but a per-screen action surface that can present a single button, a button paired with a navigation shortcut, the full NavigationBar, or an order-summary + "place order" action, depending on the screen's needs. Always terminates with the system HomeIndicator area.

> **Naming trap:** the Figma variant is called `2 Buttons`, but it is *not* two
> buttons. It is the primary button plus a single tab-style shortcut (glyph
> over a caption, e.g. 地圖) in a fixed-width slot. Both platforms originally
> read the variant name and shipped a secondary + primary button pair.

## Interaction
- **Button type**: pointer click/tap on the button triggers its action (see Button).
- **2 Buttons type**: the primary button triggers its action; the shortcut beside it navigates, and behaves as a navigation item rather than a form action.
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
| `type` | Button / 2 Buttons / Navigation / Place Order | Selects which action configuration the bottom bar presents for the current screen. `2 Buttons` is a button + navigation shortcut, not two buttons — see the note above. |

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

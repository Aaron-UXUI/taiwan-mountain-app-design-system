# CardTickets

> **Figma is the source of truth for anything visual.** Node `1373:16817` (`Cards / Tickets`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A ticket summary card showing the scene/venue name, ticket type, an optional additional item, a due date/deadline, and a price, separated by a visual divider. Used in checkout/order-summary contexts. Can be shown in a Disabled state (e.g. a ticket type no longer available).

## Interaction
- If selectable (e.g. choosing among several ticket cards), selection is handled by a containing control (such as RadioButton or a click handler on the whole card) — CardTickets itself is a display surface, not an input.

## Accessibility
- All shown fields (name, ticket type, due date, price) are plain text, so they're inherently accessible; when disabled, the card's content should still be readable by assistive tech (informational, not hidden) even though it is not actionable.
- If the whole card is wrapped in an interactive control by the consumer (e.g. a selectable ticket option), that control must expose the disabled state programmatically, matching CardTickets' visual Disabled appearance.

## State
| State | Description |
|---|---|
| Default | Fully emphasized, available. |
| Disabled | De-emphasized appearance, indicating unavailability. |

## Variant
No structural variant — content-driven only (scene, ticket type, additional item are all free-form fields).

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Card fill | `color.gray-white` |
| Corner radius | `radius.m` |
| Divider / border / ticket stub | `color.primary.green-700` (all three share one colour); `color.gray-400` throughout when disabled |
| Price/emphasis text | `color.primary.green-700` / `green-800` |
| Body text | `color.gray-800` / `color.gray-black` |
| Typography | `typography.body-m` / `body-s`, `font-weight.regular` / `semibold` |
| Spacing | `spacing.m`, `spacing.s`, `spacing.sm`, `spacing.xs` |

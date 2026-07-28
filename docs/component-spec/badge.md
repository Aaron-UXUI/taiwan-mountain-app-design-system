# Badge

> **Figma is the source of truth for anything visual.** Node `8233:6131` (`Badge`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A small numeric/dot indicator overlaid on another element to communicate a count or presence of pending items (e.g. number of active filters selected inside an Accordion, or an unread count on a navigation item). Never appears standalone — it always annotates a host element.

## Interaction
None — purely informational; any interaction belongs to the host element it's attached to.

## Accessibility
- The badge's value must be included in the accessible name/description of its host element (e.g. "Filters, 3 selected"), not exposed as a separate, disconnected piece of text — a badge floating unassociated in the accessible tree is a common accessibility failure to avoid.
- Purely decorative dot forms (no number) must still have their meaning ("has selection" / "has unread items") conveyed through the host's accessible name/description.

## State
No interactive state — value-driven only (the number/presence it displays).

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `for` | Accordion / Notification | Selects context-appropriate styling for where the badge is hosted. |
| `attribute` (size) | Small / Large / Maximum | Matches badge prominence/capacity ("Maximum" caps a very large count as "99+"). |

**The two axes are not freely combinable.** Figma authors 4 of the 6:

| Combination | Form |
|---|---|
| `Small` / `Accordion` | Counted pill, brand green |
| `Small` / `Notification` | Bare dot, no number |
| `Large` / `Notification` | Counted pill, alert red |
| `Maximum` / `Notification` | Capped "99+" pill |

`Large/Accordion` and `Maximum/Accordion` do not exist in the design. Both
implementations model this as a single variant union, so those two are
unrepresentable rather than merely undocumented. Note that `Small` means two
different things by context — the dot on a Notification badge, a counted pill
on an Accordion one — which is the design's own shape, not a simplification.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.primary.green-800` |
| Alert-context fill | `color.semantic.destruct-700` |
| Text | `color.gray-white` |
| Corner radius | `radius.rounded` |
| Padding | `spacing.xs` |
| Typography | `typography.body-s`, `font-weight.regular` |

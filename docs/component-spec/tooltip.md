# Tooltip

> **Figma is the source of truth for anything visual.** Node `8558:23555` (`Tooltip`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A small, dark, floating label used to surface supplementary explanatory text anchored to another element (e.g. clarifying an icon-only control), shown transiently rather than as persistent content.

## Interaction
- **Reveal**: triggered by the anchored element — typically a hover, long-press, or focus event on that element, not on the Tooltip itself.
- **Dismiss**: automatically hidden when the triggering hover/focus ends, or after a timeout.

## Accessibility
- Exposed with a **tooltip** semantic, programmatically associated with the element that triggers it (e.g. as its accessible description), so assistive tech announces the supplementary text when that element receives focus — not only on mouse hover, which excludes keyboard and touch users.
- Must never contain the *only* copy of essential information — a tooltip's content should be supplementary, since it's not guaranteed to be discovered by every input method.

## State
| State | Description |
|---|---|
| Hidden | Not currently shown. |
| Visible | Shown, anchored to its trigger. |

## Variant
No variant axis — content-driven (message text).

## Animation
None defined at the component level (fade/position transition, if used, is typically handled by the anchoring/positioning logic rather than the Tooltip surface itself).

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-black` |
| Text | `color.gray-white` |
| Corner radius | `radius.xxs` |
| Elevation | `elevation.4` |
| Typography | `typography.body-s`, `font-weight.regular` |
| Spacing | `spacing.s` |

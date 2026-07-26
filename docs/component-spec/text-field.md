# TextField

> **Figma is the source of truth for anything visual.** Node `12190:16599`.
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.

## Component Behavior
A single-line text input with an associated visible label, used for free-text entry (search terms, form fields). Supports an inline error state with a validation message, and an optional leading/trailing icon slot.

## Interaction
- **Focus**: pointer tap or keyboard tab-in moves the field into a Typing appearance while it holds input focus.
- **Typing → Typed**: once focus leaves a field that has content, it settles into a "Typed" (filled, not focused) appearance distinct from an empty Default field.
- **Error**: entering an invalid value (per the consumer's validation) switches the field to an Error appearance with an inline message; this is a state driven by the surrounding form logic, not by the field internally.
- Sizes (S/M/L/XL) do not change behavior. They select the field's **width**; every size keeps the same height and the same type size. (They are not a density or type-scale axis — reading them that way is what shrank the smaller fields' text in an earlier SwiftUI port.)

## Accessibility
- The visible label is programmatically bound to the input (not just visually adjacent), so its accessible name matches what's on screen.
- The Error message must be programmatically associated with the input (e.g. as an error description) and the input's invalid state exposed to assistive tech, not conveyed by color/icon alone.
- Placeholder text (if any) must never be the sole label — a real, persistent label is required so the field's purpose isn't lost once text is entered.
- Decorative icons inside the field are hidden from assistive tech.

## State
| State | Description |
|---|---|
| Default | Empty, not focused. |
| Typing | Currently focused, accepting input. |
| Typed | Not focused, contains a value. |
| Error | Invalid value; inline message shown. |

## Variant
| Axis | Values | Purpose |
|---|---|---|
| Size | S / M / L / XL | Selects the field's width so it matches the data it holds (a 3-digit CVV vs. a full-width form field). Height and type size are identical across all four. |

## Animation
None defined — state transitions (border/label color) render instantly on focus/blur.

## Token Mapping
| Role | Token |
|---|---|
| Border (Default / Typed / Typing) | `color.gray-800` — the rule keeps one colour and only changes weight between states |
| Label | `color.gray-black`, `typography.body-m` |
| Value text | `color.gray-black`; placeholder `color.gray-400` |
| Error border / message | `color.semantic.destruct-600` / `destruct-700` |
| Fill | `color.gray-white` |
| Corner radius | `radius.xxs` |
| Padding | `spacing.s` |
| Value typography | `typography.body-l` at every size, `font-weight.regular` |

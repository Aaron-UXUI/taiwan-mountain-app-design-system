# Logos

> **Figma is the source of truth for anything visual.** Node `8503:22571` (`Logos`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A set of third-party brand mark placeholders (payment/login providers — credit card networks, LINE Pay, etc.), used where the UI needs to indicate which payment or login methods are supported. Renders exactly one brand mark at a time, selected by name.

## Interaction
None on its own — typically laid out alongside other brand marks in a payment-method or login-method list; any actual selection is handled by a containing interactive control (e.g. PaymentInfo, RadioButton), not by Logos itself.

## Accessibility
- **Known gap**: unlike Logo, the current implementation does not attach an accessible name to the rendered mark. Because each mark is a distinct, meaningful brand identifier (not decorative), each one needs its own accessible name (e.g. "Mastercard", "LINE Pay") rather than being hidden from assistive technology — this should be added at the point of use until fixed in the component itself.

## State
None — static.

## Variant
| Axis | Values |
|---|---|
| Brand (`name`) | 12 brand marks — credit card network marks, Mastercard, JCB, LINE Pay, and other supported payment/login providers |

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Fallback fill (generic card) | `color.gray-100` |
| Fallback text | `color.gray-800` |
| Corner radius | `radius.xxs` |
| Padding | `spacing.s` |
| Typography (text-based marks) | `font-weight.semibold`, `typeface.pingfang-tc` |

# IconWeather

> **Figma is the source of truth for anything visual.** Node `1743:13737` (`icon / 24px / weather`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A fixed 24px glyph set covering weather conditions: cloud-sun, sunny, rain, lightning-rain, windy, typhoon, cloud-snow. Renders exactly one glyph at a time, selected by name, typically driven by forecast data (see ListWeather).

## Interaction
None — decorative graphic reflecting current/forecast weather condition.

## Accessibility
- Marked as decorative/hidden from assistive technology by default.
- Because the glyph is the primary (sometimes only) visual encoding of a forecast condition, the containing content (e.g. ListWeather) must also expose the condition as text (visible or accessible-only), so the information isn't lost to a screen-reader user.

## State
None — static graphic; which glyph renders is driven entirely by the forecast data supplied by the consumer.

## Variant
| Axis | Values |
|---|---|
| Glyph (`name`) | cloud-sun, sunny, rain, lightning-rain, windy, typhoon, cloud-snow |

## Animation
None.

## Token Mapping
Renders via `currentColor`/multi-tone fill — inherits/sets its own condition-appropriate colors internally (e.g. sun yellow, rain blue) rather than referencing the shared color token set, since weather iconography needs realistic, condition-specific coloring. No spacing/radius/elevation tokens apply. Fixed intrinsic size: 24×24px.

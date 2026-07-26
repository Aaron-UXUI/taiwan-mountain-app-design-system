# ListWeather

> **Figma is the source of truth for anything visual.** Node `877:8425`.
> This document records behaviour and accessibility decisions only.

## Component Behavior
A single day's forecast as a **vertical column**, meant to be laid out side by
side with other days in a horizontally scrolling strip. Top to bottom: the
condition glyph (see IconWeather), then date + weekday, temperature, apparent
temperature, precipitation rate, UV index + UV level, sunrise, sunset,
humidity, wind speed and wind direction. Purely a data-display surface.

> Despite the "List" name this is not a horizontal row. An earlier SwiftUI
> port read it as one (date · glyph · temperature) and shipped 3 of the fields.

## Interaction
None — read-only forecast display; if part of a tappable day-selector, that behavior is external to this component.

## Accessibility
- Every data field rendered must be readable as text by assistive technology — the weather icon alone must never be the sole carrier of the forecast condition (see IconWeather's own accessibility note); ListWeather is the natural place to also expose the condition as a text label (e.g. "Sunny", "Rain") alongside the icon.
- Numeric fields (temperature, UV, precipitation rate) should include their unit as part of the accessible text, not rely on a visually-adjacent unit symbol alone.

## State
None.

## Variant
No variant axis — content-driven (which fields are populated varies by data availability).

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-white` |
| Text | `color.gray-black` |
| Corner radius | `radius.xs` |
| Typography | `typography.body-l` / `body-s`, `font-weight.regular` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.xs` |

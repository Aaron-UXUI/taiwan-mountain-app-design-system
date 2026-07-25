# ListWeather

## Component Behavior
A single day's forecast row/column, combining a date, a weather condition icon (see IconWeather), a temperature, and a wider set of supplementary data fields (precipitation rate, UV index, sunrise/sunset, and others — 13 fields total). Purely a data-display surface.

## Interaction
None — read-only forecast display; if part of a tappable day-selector, that behavior is external to this component.

## Accessibility
- Every data field rendered must be readable as text by assistive technology — the weather icon alone must never be the sole carrier of the forecast condition (see IconWeather's own accessibility note); ListWeather is the natural place to also expose the condition as a text label (e.g. "Sunny", "Rain") alongside the icon.
- Numeric fields (temperature, UV, precipitation rate) should include their unit as part of the accessible text, not rely on a visually-adjacent unit symbol alone.

## State
None.

## Variant
No variant axis — content-driven (which of the 13 fields are populated varies by data availability).

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

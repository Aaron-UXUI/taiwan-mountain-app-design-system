# StatusBar

## Component Behavior
A mockup of the device's own system status row (time, signal, battery), used purely to compose realistic full-screen mockups/screenshots of the app. It does not reflect the real device clock or real signal/battery level — it's a static visual reference, not a live system readout.

## Interaction
None — non-interactive, decorative mockup.

## Accessibility
- Should be hidden from assistive technology entirely, since it does not represent real, actionable device state — surfacing it to a screen reader would misrepresent the actual system status (which the OS already announces through its own accessibility layer).

## State
No interactive state; the displayed time is a static prop, not a live clock.

## Variant
No variant axis — single fixed layout (time + signal + battery icon cluster).

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Text/icon color | `color.gray-black` (or `color.gray-white` on dark mockup surfaces) |
| Typography | `typography.body-m`, `font-weight.semibold` |
| Spacing | `spacing.m`, `spacing.sm`, `spacing.xs` |

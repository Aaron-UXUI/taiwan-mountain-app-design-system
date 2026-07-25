# KeyboardNumbers

## Component Behavior
A mockup of the system's numeric keypad layout, used for composing realistic mockups of numeric-entry flows (e.g. entering a PIN or a quantity). Like Keyboard, it is a static illustration, not a functioning input surface.

## Interaction
None — non-interactive; keys are visual only.

## Accessibility
- Should be hidden from assistive technology entirely, for the same reason as Keyboard — it does not process real input, and exposing its keys would misrepresent actual functionality.
- The real numeric input the mockup accompanies must have its own, separate, fully operable accessible input control.

## State
No interactive state.

## Variant
No variant axis — single fixed numeric layout.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Key text | `color.gray-800` |
| Key fill | `color.gray-white` |
| Bar/home-indicator area | `color.gray-black` |
| Corner radius | `radius.rounded` |
| Typography | `typography.body-m`, `font-weight.semibold` |
| Spacing | `spacing.xs` |

# SpinnerOnWhite

## Component Behavior
A loading indicator made of dots arranged in a ring that fade in sequence, designed for use on light-colored surfaces (e.g. inside a filled Button in its Loading state). Purely a busy/waiting signal — carries no other information.

## Interaction
None — non-interactive; presence on screen communicates "an operation is in progress."

## Accessibility
- Exposed with a **status** semantic and a fixed accessible label ("Loading"), so assistive tech announces that a background operation is running without needing to interpret the animation visually.
- Because it's a `status`-type region, updates should be announced politely (not interrupting the user), consistent with its role as a passive progress signal rather than an urgent alert.

## State
No discrete states — a single continuous animated appearance while mounted; it is added/removed from the screen by its containing component's own Loading state (see Button).

## Variant
No variant axis — single style, tuned for light backgrounds.

## Animation
8-dot sequential fade: **1s, linear, infinite** loop while visible.

## Token Mapping
| Role | Token |
|---|---|
| Dot color | dark tone appropriate to a light surface (component-local, not a shared color token) |
| Dot shape | `radius.rounded` |

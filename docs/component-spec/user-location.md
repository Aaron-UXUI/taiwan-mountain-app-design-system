# UserLocation

> **Figma is the source of truth for anything visual.** Node `12846:34701` (`User Location`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A map overlay marker representing the device's own current position, combining a directional cone (showing heading) and a center dot. Purely a live status indicator — it is not something the user selects or acts on directly.

## Interaction
None — non-interactive; it is a passive readout of the device's position/heading on the map.

## Accessibility
- Should be hidden from assistive technology as a decorative overlay, since it carries no actionable content and its meaning ("you are here") is redundant with the map's own accessible description of the viewport, if any.
- If the app needs to expose "your current location" to assistive tech, that should be a separate, explicit announcement or control — not derived from this visual marker.

## State
No interactive state; visually reflects heading (rotation of the direction cone) as a continuously updating value driven by device sensors, not a discrete design state.

## Variant
No variant axis — single style.

## Animation
None defined at the component level — any rotation is driven by live heading data from outside the component, not an internal animation.

## Token Mapping
| Role | Token |
|---|---|
| Pin/dot fill | `color.gray-white` |
| Direction cone | `color.semantic.info-700` |
| Corner radius | `radius.rounded` |
| Elevation | `elevation.3` |

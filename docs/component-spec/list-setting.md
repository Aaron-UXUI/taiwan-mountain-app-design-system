# ListSetting

> **Figma is the source of truth for anything visual.** Node `493:1903` (`List / Setting`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A single row in a settings list, showing a text label and an optional trailing chevron indicating the row navigates to a deeper screen. The entire row is a single activation target.

## Interaction
- **Activation**: pointer click/tap anywhere in the row triggers navigation (when the chevron is shown) or an in-place action (when it isn't).
- **Keyboard**: focusable as a button; Enter/Space activates.

## Accessibility
- Exposed as a **button** (or link, if it navigates to a distinct screen) whose accessible name is the row's label text.
- The chevron is decorative and hidden from assistive technology — the fact that the row navigates further should instead be conveyed through consistent, predictable app-wide navigation patterns, or via an accessible description if that distinction matters for the user.

## State
Content toggle: chevron shown/hidden (indicates whether the row navigates deeper or performs a direct action).

## Variant
No variant axis — label text only.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-white` |
| Text | `color.gray-black` |
| Typography | `typography.body-l`, `font-weight.regular` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.lm` |

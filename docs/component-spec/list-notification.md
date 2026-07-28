# ListNotification

> **Figma is the source of truth for anything visual.** Node `13452:15906` (`List / Notification`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A settings row that pairs a text label with an embedded on/off switch (visually resembling Toggle, implemented as a native binary control), used specifically for notification preference rows.

## Interaction
- **Toggle**: pointer click/tap anywhere on the row (label or switch) toggles the value immediately.
- **Keyboard**: focusable; Space toggles.
- **Disabled**: row does not respond to input.

## Accessibility
- Exposed as a native **checkbox**-equivalent control with the row's label programmatically bound as its accessible name (unlike the standalone Toggle component, this row supplies its own label, closing the gap noted in Toggle's spec).
- Disabled state is exposed via the native disabled attribute.

## State
| State | Description |
|---|---|
| Off | Default, inactive. |
| On | Active. |
| Disabled | Not operable. |

## Variant
No variant axis — label text only.

## Animation
Switch transition: **0.15s, ease** on toggle, matching Toggle's own timing.

## Token Mapping
| Role | Token |
|---|---|
| Off track | `color.primary.green-100` |
| On track | `color.primary.green-800` |
| Knob | On `color.gray-white` / Off `color.primary.green-800` |
| Off track border | 2pt `color.primary.green-800` |
| Label text | `color.gray-black` |
| Corner radius | `radius.rounded` |
| Typography | `typography.body-l`, `font-weight.regular` |
| Spacing | `spacing.s`, `spacing.sm` |

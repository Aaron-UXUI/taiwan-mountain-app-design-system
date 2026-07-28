# LinkFurtherInfo

> **Figma is the source of truth for anything visual.** Node `11167:23076` (`Link / Further Info`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A boxed, bordered action control (white fill, colored border, trailing arrow icon) used to point to supplementary information (e.g. "查看更多資訊" linking out from a place detail sheet). Sits between Link (plain text) and Button (filled, high emphasis) in visual weight.

## Interaction
- **Activation**: pointer click/tap triggers navigation to the referenced information.
- **Keyboard**: focusable as a button/link; Enter or Space activates.

## Accessibility
- Exposed as a **button** or **link** depending on whether activation navigates within the app or to an external destination; the visible label is the accessible name.
- The trailing arrow icon is purely decorative and hidden from assistive tech — the label text alone conveys the destination/action.

## State
Single resting state; no disabled variant defined.

## Variant
No variant axis — label text only.

## Animation
None defined.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-white` |
| Border / text / icon | `color.primary.green-800` |
| Corner radius | `radius.s` |
| Padding | `spacing.sm`, gap `spacing.xs` |
| Elevation | `elevation.3` |
| Typography | `typography.body-m`, `font-weight.semibold` |

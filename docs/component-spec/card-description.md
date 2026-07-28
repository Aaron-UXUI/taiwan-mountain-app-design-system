# CardDescription

> **Figma is the source of truth for anything visual.** Node `11441:11209` (`Cards / Description`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A text-first informational card (optional title, supporting body text, optional image) used for descriptive content that doesn't need the photo emphasis of CardScene — e.g. an explanatory blurb about a feature or place. Title and image are each independently toggleable so the same card can flex between a plain text block and a text+image layout.

## Interaction
None — purely presentational; if the card is tappable in context, that behavior belongs to the containing list, not to CardDescription.

## Accessibility
- Title (when shown) should be marked up as a heading appropriate to its position in the page outline, so it participates in heading navigation.
- Supporting text is plain, readable body content.
- If an image is shown, it must carry appropriate alternative text (or be marked decorative if the title/body text already conveys the same information).

## State
No interactive state. Content toggles: title shown/hidden, image shown/hidden.

## Variant
No variant axis — a single layout that flexes via the title/image toggles above.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Title text | `color.gray-black`, `typography.headline-3`, `font-weight.semibold` |
| Body text | `color.gray-800`, `typography.body-m`, `font-weight.regular` |
| Corner radius | `radius.s` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.xs` |

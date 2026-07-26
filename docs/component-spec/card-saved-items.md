# CardSavedItems

## Component Behavior
A collection-summary card representing a user's saved-items folder/list, shown as a title with a liked/favorited marker and a 2×2 grid of up to four thumbnail photos drawn from the collection's contents.

## Interaction
Typically tappable to open the full collection; handled by the containing list, not by CardSavedItems itself.

## Accessibility
- The title text is the card's accessible name.
- The liked marker, if purely decorative/redundant with the title, should be hidden from assistive tech; if it conveys distinct information (e.g. "you liked this collection"), it must be exposed as part of the accessible name/description.
- Each thumbnail photo should carry alternative text describing its content, or be marked decorative if the collection title already sufficiently describes the contents.

## State
No interactive state — purely a display summary; fewer than four photos is a valid content configuration, not a distinct visual state.

## Variant
No variant axis — one layout.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Title text | `color.gray-black`, `font-weight.semibold` |
| Meta text | `color.gray-800`, `font-weight.regular` |
| Corner radius | `radius.s` |
| Typography | `typography.body-m` / `body-s` |
| Spacing | `spacing.s`, `spacing.xs` |

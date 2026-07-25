# CarouselIndicators

## Component Behavior
A row of dots indicating position within a paged carousel (e.g. the hero photo carousel inside BottomSheet's Map_Info layout), with one dot emphasized to reflect the currently visible page. Purely a positional readout — it does not itself control paging.

## Interaction
None inherent to the indicators themselves in the current implementation (read-only position display); if made tappable to jump to a page in the future, each dot would need to be an independently focusable, labeled control (e.g. "Go to photo 2 of 5").

## Accessibility
- Must not be the only way page position is communicated — the carousel it belongs to should separately expose current-page information to assistive tech (e.g. "Photo 2 of 5"), since a row of undifferentiated dots carries no accessible meaning on its own.
- Should be hidden from assistive technology as decorative, with the carousel container itself owning the accessible position announcement.

## State
Reflects the carousel's current page index — not an independent state of its own, but a mirror of the carousel's position.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `background` | White / Dark | Matches dot contrast to the surface it's overlaid on (e.g. a photo vs. a light card). |

## Animation
None defined — the active-dot indicator updates instantly with page changes (any easing belongs to the carousel's own page-transition, not to the indicators).

## Token Mapping
| Role | Token |
|---|---|
| Active dot | `color.gray-black` (on white bg) / `color.gray-white` (on dark bg) |
| Inactive dot | `color.gray-200` / `color.gray-400` |
| Corner radius | `radius.rounded` / `radius.xs` |
| Spacing | `spacing.s`, `spacing.xs` |

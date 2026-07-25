# BottomSheet

## Component Behavior
A panel that slides up from the bottom edge of the screen to present contextual content without leaving the current screen. It is the design system's single largest composition surface, supporting three distinct content layouts selected by a style setting:
- **Filter_Discover** — a scrollable set of filter groups (segmented control, checkbox accordions, chip accordions) ending in a fixed "apply" action bar.
- **Map_Info** — a place-detail layout: hero photo with carousel indicators, status/warning tags, a horizontally-scrolling row of small filter chips, crowdedness indicator, a "further info" link, and a purchase-ticket action bar.
- **Filter_MapSearch** — a scrollable list of CardScene results.

All three share a drag handle at the top and a trailing system home-indicator area.

## Interaction
- **Reveal/dismiss**: the sheet is shown or hidden by the surrounding flow (e.g. tapping a map pin, opening a filter); dismissal is typically via a swipe-down gesture on the handle, tapping outside the sheet, or an explicit close/apply action, depending on the style.
- **Drag handle**: a vertical drag gesture on the handle resizes or dismisses the sheet.
- **Internal scrolling**: Filter_Discover and Filter_MapSearch content areas scroll independently of the sheet's own reveal/dismiss gesture once the sheet is at its full extent.
- Each nested control (chips, accordions, buttons, carousel) follows its own interaction spec.

## Accessibility
- The sheet should be exposed as a **dialog**-equivalent region when presented modally, so assistive tech announces entry into it and traps focus within it until dismissed.
- The drag handle is decorative; an equivalent non-gesture dismiss action (e.g. a close button, or a swipe-down accessibility action) must be available for users who cannot perform a drag gesture.
- Because Filter_Discover and Filter_MapSearch scroll internally, that scrollable region must be independently reachable/operable via assistive scrolling, distinct from the sheet's overall presence.
- All nested components retain their own accessibility semantics (see AccordionCheckBox, AccordionChips, SegmentedControls, ChipsSmall/Salient, CardScene, CarouselIndicators, Crowdedness, LinkFurtherInfo, Button, HomeIndicator).

## State
No dedicated internal state beyond which `style` is active; each style's own nested controls carry their own states independently.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `style` | Filter_Discover / Map_Info / Filter_MapSearch | Selects which of the three content layouts (and therefore which nested components) the sheet presents. |

## Animation
- Reveal/dismiss: a slide transition from off-screen to its resting position (and reverse), typically eased.
- All nested component animations apply independently within their own areas (e.g. SegmentedControls' 0.15s indicator slide, AccordionCheckBox/AccordionChips' 0.15s arrow rotation).

## Token Mapping
| Role | Token |
|---|---|
| Sheet fill | `color.gray-white` |
| Corner radius (top corners only) | `radius.m` |
| Elevation | `elevation.3` |
| Drag handle | `color.gray-200`, `radius.rounded` |
| Section title | `typography.label-m`, `font-weight.semibold` |
| Hero title | `typography.headline-3`, `font-weight.semibold` |
| Spacing | `spacing.lm`, `spacing.s`, `spacing.sm`, `spacing.xs` |
| Hero image corner radius | `radius.xs` |
| Pill-button (Map_Info quick actions) fill/border | `color.gray-white` / `color.primary.green-800`, `elevation.3` |
| Nested component tokens | see [segmented-controls.md](segmented-controls.md), [accordion-check-box.md](accordion-check-box.md), [accordion-chips.md](accordion-chips.md), [button.md](button.md), [chips-salient.md](chips-salient.md), [chips-small.md](chips-small.md), [crowdedness.md](crowdedness.md), [link-further-info.md](link-further-info.md), [card-scene.md](card-scene.md), [carousel-indicators.md](carousel-indicators.md), [home-indicator.md](home-indicator.md) |

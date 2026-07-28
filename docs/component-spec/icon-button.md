# IconButton

> **Figma is the source of truth for anything visual.** Node `7297:15056` (`Icon Buttons`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A compact, icon-only action control dedicated to one of three specific purposes: centering the map on the user's location, saving/favoriting an item, or downloading an offline map region. Because the icon alone is ambiguous, each purpose carries its own fixed accessible label baked into the component — the consumer selects a purpose, not a generic icon. The Offline-Map purpose additionally tracks download progress and communicates a distinct "already downloaded" end state.

## Interaction
- **Location purpose**: single activation re-centers the map; no persistent state.
- **Save purpose**: activation toggles a saved/unsaved value; visually confirmed via a distinct clicked appearance.
- **Offline-Map purpose**: activation starts a download; control shows indeterminate/percentage progress while Loading, then transitions to a distinct Downloaded appearance once complete, at which point it is no longer actionable (already downloaded).
- **Disabled**: any purpose can be suppressed from responding to input.

## Accessibility
- Exposed as a **button**; because there is no visible text label, each purpose supplies its own fixed accessible name ("定位" for Location, "收藏" for Save, "下載中"/"已下載"/"離線地圖下載" for the Offline-Map states) so assistive tech always has a meaningful name even though only an icon is visible.
- Save purpose additionally exposes a pressed/toggled state (saved ⇄ not saved).
- Loading and Downloaded sub-states of the Offline-Map purpose are both exposed as non-operable once the action is no longer available to repeat.

## State

> Figma's `State=Loading` / `Loading...` are prototype-only scaffolding — they
> exist to drive the Figma prototype, not as product states — so neither is
> implemented on either platform.
Each purpose has its own state set — the axes are not a free cross-product.

| Purpose (`for`) | `type` | States |
|---|---|---|
| Location | Primary | Default · Pressing · **Enabled** (actively locating, filled GPS glyph) |
| Save | Tertiary | Default · Clicked (filled heart) |
| OfflineMap | Tertiary | Default · Loading (shows progress) · Downloaded (terminal, non-operable) |

`Disabled` is not a Figma state; use the platform's own disabled mechanism.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `for` | Location / Save / OfflineMap | Selects the fixed icon, accessible label, and behavior set — this is a purpose selector, not a free-form icon picker. |
| `type` (emphasis) | Primary / Tertiary | Primary is a filled brand-green circle with elevation; Tertiary is the bare glyph on no background. In Figma this is not freely combinable — Location is authored Primary, Save and OfflineMap are Tertiary — so it is derived from `for` rather than set independently. |

Figma also defines a `State=Loading...` alongside `State=Loading`. The two are
byte-identical in the exported frame, so only `Loading` is implemented.

## Animation
Uses the same rapid hover/press transition timing as Button; the Offline-Map purpose's progress indicator updates continuously while Loading (no fixed easing curve — driven by the actual download percentage).

## Token Mapping
| Role | Token |
|---|---|
| Primary fill | `color.primary.green-800` / pressed `color.primary.green-900` |
| **Primary icon** | `color.gray-white` — a dark-green button always pairs with a **white** glyph |
| Tertiary icon | `color.gray-black` (no background) |
| Tertiary icon, Save `Clicked` | `color.gray-white` — the filled heart sits over a scene photo |
| Corner radius | `radius.rounded` (circular) |
| Padding | `spacing.sm` |
| Elevation | `elevation.4` |
| Progress label typography | `typography.body-m`, `font-weight.semibold` |

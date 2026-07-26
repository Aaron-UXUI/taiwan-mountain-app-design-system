# LocationPin

## Component Behavior
A map marker representing a place. Carries a short label (typically a number or short code) and can represent either a plain location marker or an "info" marker style that indicates the pin currently has an open information card associated with it. Includes an optional badge to indicate a secondary indicator (e.g. unread/notification) on the pin.

## Interaction
- **Activation**: pointer tap selects/focuses the pin, typically opening an associated info card (e.g. BottomSheet Map_Info) elsewhere on screen.
- **Keyboard**: when rendered as an interactive map marker, should be reachable in tab order with Enter/Space equivalent to tap.

## Accessibility
- Exposed as a **button** (or map-marker equivalent) whose accessible name is derived from the place it represents, not the visible short label alone (the visible label may be a number, but the accessible name should be the full place name supplied by the consumer).
- The Focused state should be reflected both visually and via a programmatic selected/expanded indicator so assistive tech knows which pin is currently active.
- Decorative badge dot is hidden from assistive tech; if it represents meaningful information (e.g. unread count) that information must be exposed as part of the accessible name/description instead.

## State
| State | Description |
|---|---|
| Default | Resting marker. |
| Focused | Currently selected / associated info is open. |

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `type` | Default / Info | Default is a plain marker; Info signals the pin is tied to an open information panel. |

## Animation
None defined — state changes are instantaneous.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.primary.green-800` |
| Focused fill | `color.semantic.info-600` / `info-700` |
| Label text | `color.gray-white` |
| Corner radius | `radius.rounded` |
| Elevation | `elevation.4` |
| Typography | `typography.headline-4`, `font-weight.semibold` |

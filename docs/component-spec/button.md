# Button

## Component Behavior
A single-action trigger control carrying one short text label. It represents the primary way a user commits to an action (confirm, submit, proceed). Only one label is shown at a time; when the action is in flight, the label is replaced by a loading indicator rather than shown alongside it. A Button never carries navigational state (it is not a toggle) — activating it fires an action and the control returns to its resting appearance unless the surrounding flow puts it into a new state (e.g. Loading, then Disabled).

## Interaction
- **Primary activation**: pointer press-and-release, or tap, within the control's bounds.
- **Keyboard activation**: control receives focus in tab order; Enter or Space triggers the same action as a pointer activation.
- **Press feedback**: a distinct pressed appearance confirms contact before release, so the user knows the activation registered.
- **Loading suppression**: once activated into a Loading state, further activation is ignored until loading resolves — prevents duplicate submissions.
- **Disabled**: control does not respond to pointer or keyboard input and is excluded from the tab order's actionable set (still perceivable, not operable).

## Accessibility
- Exposed to assistive technology as a **button** control.
- The visible label text is also the accessible name — no separate label needed.
- Disabled and Loading both communicate a non-operable state to assistive tech (so a screen reader announces "dimmed"/"unavailable" rather than silently ignoring input).
- Must keep a visible focus indicator distinct from the Default and Pressing appearances when reached via keyboard.
- Minimum hit target should meet platform touch-target guidance regardless of the visual label length.

## State
| State | Description |
|---|---|
| Default | Resting, fully interactive. |
| Pressing | Transient — active contact registered, not yet released. |
| Loading | Action in flight; label replaced by a spinner; input suppressed. |
| Disabled | Action currently unavailable; no input accepted. |

## Variant
| Axis | Values | Purpose |
|---|---|---|
| Emphasis (`type`) | Primary / Secondary / Tertiary | Communicates the relative importance of the action among others on screen — Primary for the one recommended action, Secondary for an alternative, Tertiary for the least prominent. |
| Size | Large / Small | Matches control prominence to the density of the surrounding layout. |

## Animation
- Hover/press color transition: **0.1s, ease** — near-instant feedback so pressing feels responsive rather than animated.
- Loading indicator: continuous rotation, **1s, linear, infinite**, running only while the Loading state is active.

## Token Mapping
| Role | Token |
|---|---|
| Primary fill | `color.primary.green-800` / pressed `color.primary.green-900` |
| Secondary/Tertiary fill | `color.primary.green-50` / `color.primary.green-100` |
| Disabled fill | `color.gray-400` |
| Label text | `color.gray-white` (on filled) |
| Corner radius | `radius.s` |
| Internal spacing | `spacing.s`, `spacing.m`, `spacing.sm` |
| Label typography | `typography.body-m` (size + line-height) or `typography.headline-4` depending on size, `font-weight.semibold` |
| Elevation | `elevation.3` |
| Font family | `typeface.pingfang-tc` |

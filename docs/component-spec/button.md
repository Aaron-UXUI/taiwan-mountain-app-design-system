# Button

> **Figma is the source of truth for anything visual.** Node `425:5337` (`Buttons`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


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

> Figma authors **19 of the 24** Type × Size × State combinations. Small has no
> Loading at any emphasis, and Tertiary/Small exists only as Default. The
> missing five are not built — both platforms now express the real matrix in
> their types, so asking for one no longer compiles.
| Axis | Values | Purpose |
|---|---|---|
| Emphasis (`type`) | Primary / Secondary / Tertiary | Communicates the relative importance of the action among others on screen — Primary for the one recommended action, Secondary for an alternative, Tertiary for the least prominent. |
| Size | Large / Small | Matches control prominence to the density of the surrounding layout. |

Figma defines **19** of the 24 possible combinations — the rest are simply not
used in the product, so they are not built:

| Size | Type | States defined |
|---|---|---|
| Large | Primary / Secondary / Tertiary | Default · Disabled · Pressing · Loading (complete) |
| Small | Primary | Default · Disabled · Pressing (**no Loading**) |
| Small | Secondary | Default · Disabled · Pressing (**no Loading**) |
| Small | Tertiary | Default only |


## Animation
- Hover/press color transition: **0.1s, ease** — near-instant feedback so pressing feels responsive rather than animated.
- Loading indicator: continuous rotation, **1s, linear, infinite**, running only while the Loading state is active.

## Token Mapping
Resolved per emphasis × state, straight from the Figma component:

| Emphasis | State | Background | Border | Label | Elevation |
|---|---|---|---|---|---|
| Primary | Default | `color.primary.green-800` | — | `color.gray-white` | `elevation.3` |
| Primary | Pressing | `color.primary.green-900` | — | `color.gray-white` | `elevation.3` |
| Primary | Disabled | `color.primary.green-50` | — | `color.gray-400` | none |
| Secondary | Default | `color.gray-white` | `color.primary.green-800` | `color.primary.green-800` | `elevation.3` |
| Secondary | Pressing | `color.primary.green-50` | `color.primary.green-900` | `color.primary.green-900` | `elevation.3` |
| Secondary | Disabled | `color.gray-white` | `color.primary.green-100` | `color.primary.green-100` | none |
| Tertiary | Default | transparent | — | `color.primary.green-800` | none |
| Tertiary | Pressing | `color.primary.green-50` | — | `color.primary.green-900` | none |
| Tertiary | Disabled | transparent | — | `color.primary.green-100` | none |

Shared:

| Role | Token |
|---|---|
| Corner radius | `radius.s` |
| Padding — Large | `spacing.sm` vertical, `spacing.m` horizontal, 44pt min height |
| Padding — Small | `spacing.s` vertical, `spacing.sm` horizontal, 36pt min height |
| Label typography | `typography.headline-4` (Large) / `typography.body-m` (Small), `font-weight.semibold` |
| Font family | `typeface.pingfang-tc` |

Width is driven by **size**, not emphasis: Large fills the content width,
Small hugs its label.

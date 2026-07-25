# Toggle

## Component Behavior
A binary on/off switch, used for settings that take effect immediately upon change (unlike CheckBox, which is typically used inside a form submitted later). Has no text label of its own — the label lives in the surrounding row (see ListNotification, ListSetting).

## Interaction
- **Toggle**: pointer click/tap switches between on and off immediately.
- **Keyboard**: focusable; Space toggles the value.

## Accessibility
- Exposed with a **switch** semantic (not a checkbox), so assistive tech announces "on"/"off" rather than "checked"/"unchecked" — communicating the immediate-effect nature of the control.
- Because it carries no visible text of its own, the accessible name must be supplied by the surrounding context (e.g. the row label it belongs to) — a bare Toggle with no associated label is an accessibility gap.

## State
| State | Description |
|---|---|
| Off | Default, inactive. |
| On | Active. |

## Variant
No variant axis — single style.

## Animation
Knob/track transition: **0.15s, ease** when switching between off and on.

## Token Mapping
| Role | Token |
|---|---|
| Off track | `color.primary.green-100` |
| On track | `color.primary.green-800` |
| Knob | `color.gray-white` |
| Corner radius | `radius.rounded` |

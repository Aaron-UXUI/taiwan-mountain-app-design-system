# CardNotification

## Component Behavior
A single notification entry showing a headline, supporting content, a timestamp, and an optional unread indicator (badge dot). Used inside a notification list/inbox.

## Interaction
- Typically tappable to open the notification's detail, handled by the containing list rather than by CardNotification itself.

## Accessibility
- The unread indicator is a decorative dot hidden from assistive technology; the *unread* status it represents must be additionally exposed as part of the item's accessible name or description (e.g. "Unread: ...") so the information isn't conveyed by color/shape alone.
- Timestamp text should use a format that is unambiguous when read aloud by a screen reader (avoid purely relative/abbreviated forms without a full-text equivalent available).

## State
Content toggle: unread badge shown/hidden (not a mutually exclusive "state," but a presence/absence flag).

## Variant
No variant axis — one layout, content-driven.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Card fill | `color.gray-white` |
| Divider | `color.gray-200` |
| Unread badge | `color.semantic.destruct-700` — the same fill as every other notification badge |
| Headline text | `color.gray-black`, `font-weight.semibold` |
| Body text | `color.gray-800`, `font-weight.regular` |
| Corner radius | `radius.s` / `radius.rounded` (badge) |
| Typography | `typography.body-m` / `body-s` |
| Spacing | `spacing.m`, `spacing.s`, `spacing.sm` |

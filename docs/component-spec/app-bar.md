# AppBar

## Component Behavior
The top header bar for a screen, in one of two forms: a standard navigation bar (optional back action, title, optional settings action) or a profile-info bar (user avatar and name plus a settings action). Provides the primary "where am I / how do I go back" context at the top of a screen.

## Interaction
- **Back**: pointer click/tap on the back control navigates to the previous screen; only present when `showBack` is enabled.
- **Settings**: pointer click/tap on the settings control opens settings-related UI.
- **Keyboard**: both controls are focusable buttons activated by Enter/Space.

## Accessibility
- Exposed as a header/banner landmark.
- Back and settings controls are icon-only and carry fixed accessible names ("返回" / "設定") since they have no visible text.
- The title (nav type) should be marked up as the page's primary heading where appropriate, so it participates in heading navigation.
- The profile-info type's avatar image needs alternative text (the user's name, already shown as adjacent text, may satisfy this if properly associated) or should be marked decorative if the adjacent name text already fully conveys the same identity.

## State
No interactive state — a static header whose content (back button, title/profile info) is configured per screen.

## Variant
| Axis | Values | Purpose |
|---|---|---|
| `type` | nav / ProfileInfo | `nav` is a standard title + optional back button; `ProfileInfo` shows the user's avatar and name instead of a title. |

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Fill | `color.gray-50` |
| Text | `color.gray-black` |
| Corner radius (avatar) | `radius.rounded` |
| Typography | `typography.body-l` / `body-m` |
| Spacing | `spacing.lm`, `spacing.m`, `spacing.s`, `spacing.sm` |

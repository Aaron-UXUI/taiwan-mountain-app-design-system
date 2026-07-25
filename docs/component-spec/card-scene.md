# CardScene

## Component Behavior
A photo-forward card representing a place/scene (e.g. a search result or a saved-items entry), combining a background photo, a gradient scrim for text legibility, an open/closed status label, an optional "family-friendly" label, the place name, location, an optional distance readout, and a save/favorite toggle. Designed to sit inside horizontally- or vertically-scrolling lists (it does not compress below its intrinsic proportions when space is constrained).

## Interaction
- **Save/unsave**: pointer click/tap on the dedicated save control toggles the saved value and updates the icon accordingly; this is the only interactive part of the card.
- **Card body**: tapping the photo/body typically navigates to the place's detail view, handled by the containing list, not by CardScene itself.

## Accessibility
- The save control is exposed as a **button** with a state-dependent accessible name ("加入收藏" / "取消收藏") and a pressed/toggled indicator reflecting saved state — so assistive tech always announces both the action and the current value, not just a static "save" label.
- The status label and family-friendly label are visible text, so they're inherently accessible; they should not be the only way condition is conveyed (already satisfied here since they're plain text, not icon-only).
- The gradient scrim is decorative and hidden from assistive technology.
- If the whole card is tappable to navigate, the containing list must expose that as an accessible action (e.g. the card wrapped in a link/button role) — CardScene's own save button must not conflict with a card-level tap target (nested interactive elements should never overlap).

## State
| State | Description |
|---|---|
| Not saved | Default save-icon appearance. |
| Saved | Filled/active save-icon appearance. |

Optional content toggles (not visual "states" but presence/absence of content): distance shown/hidden, family-friendly label shown/hidden.

## Variant
No structural variant axis — one layout; content and toggles vary per instance.

## Animation
None defined — save-icon fill change is instantaneous.

## Token Mapping
| Role | Token |
|---|---|
| Card fill / corner radius | `color.gray-white` / `radius.m` |
| Status label fill | `color.primary.green-900` |
| Family-friendly label fill | `color.accent.yellow-900` |
| Title / meta text | `color.gray-white` |
| Title typography | `typography.headline-3`, `font-weight.semibold` |
| Meta typography | `typography.body-s`, `font-weight.regular` |
| Label corner radius | `radius.xxs` |
| Content-bar corner radius | `radius.s` |
| Divider dot | `radius.rounded` |
| Spacing | `spacing.s`, `spacing.sm`, `spacing.xs` |

# Link

## Component Behavior
Inline, text-only navigational or action trigger, used where an action needs to read as part of the surrounding text flow rather than as a boxed control (e.g. "了解更多" inside a sentence).

## Interaction
- **Activation**: pointer click/tap on the text triggers navigation or an action.
- **Keyboard**: focusable; Enter activates.

## Accessibility
- Exposed as a **link** (or equivalent text-action semantic); the visible text is the accessible name.
- Must remain visually distinguishable from surrounding non-interactive text (color alone) — should not rely solely on color where contrast/color-blindness is a concern; underline or equivalent secondary cue is recommended if used adjacent to body copy of a similar color family.

## State
Only two implicit states: resting and pressed/active (no dedicated visual disabled state defined).

## Variant
No variant axis — label text only.

## Animation
None defined.

## Token Mapping
| Role | Token |
|---|---|
| Text color | `color.accent.yellow-700` / pressed `color.accent.yellow-900` |
| Typography | `typography.body-m`, `font-weight.semibold` |

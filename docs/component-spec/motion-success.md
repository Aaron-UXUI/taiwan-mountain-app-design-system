# MotionSuccess

> **Figma is the source of truth for anything visual.** Node `4188:21162` (`Motion / Success`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.


## Component Behavior
A full-motion success confirmation — a checkmark that draws itself inside a circle, looping — used to confirm that an action completed successfully (e.g. after a payment or a submission).

## Interaction
None — non-interactive, purely a confirmation signal shown transiently by the surrounding flow.

## Accessibility
- Exposed with an image semantic and a fixed accessible label ("成功"/"Success"), so the confirmation is communicated to assistive tech even though it's conveyed visually through motion.
- Because success confirmations are often momentary and important, the containing flow should also make the underlying result (e.g. "Payment successful") available as persistent text, not rely on the animation alone — especially since it loops rather than playing once, which alone doesn't imply "done."

## State
No discrete states — a single looping animated appearance while mounted; shown/removed entirely by the containing flow.

## Variant
No variant axis — single style.

## Animation
Checkmark draw-and-loop: **2.4s, ease-in-out, infinite**.

## Token Mapping
No shared color/spacing tokens referenced — this component renders self-contained success-green strokes independent of the shared token set.

# MotionTransaction

## Component Behavior
A full-motion illustration depicting a contactless payment/transaction gesture (e.g. tapping a card near a reader), looping continuously — used to instruct or reassure the user during a payment flow (e.g. "hold your card here").

## Interaction
None — non-interactive illustrative animation.

## Accessibility
- Exposed with an image semantic and a fixed accessible label ("交易感應動畫"/"transaction tap animation"), so assistive tech has a textual equivalent for what is otherwise a purely visual, looping instruction.
- Because this animation typically illustrates an instruction ("tap your card here"), the same instruction must also be present as text elsewhere in the flow — the animation should be treated as reinforcement, not the sole source of instruction.

## State
No discrete states — single looping animated appearance while mounted.

## Variant
No variant axis — single style.

## Animation
Tap/transaction loop: **4s, ease-in-out, infinite**.

## Token Mapping
| Role | Token |
|---|---|
| Accent color | `color.semantic.success-600` |
| Muted/device color | `color.gray-400` |

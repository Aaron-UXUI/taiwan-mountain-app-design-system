# HomeIndicator

> **Figma is the source of truth for anything visual.** Node `367:21084` (`Home Indicator`).
> This document records behaviour and accessibility decisions only — for
> sizes, spacing, colour and type, read the node with `get_design_context`.
> **Not implemented on either platform.** The OS already draws this chrome;
> reproducing it would work against native behaviour rather than with it.


## Component Behavior
A thin horizontal bar mimicking the system's home-gesture indicator at the bottom of the screen. Used to reserve visual space and provide a realistic bottom edge in mockups that include screens with a gesture-based home affordance (e.g. at the bottom of BottomSheet, BottomBar, or Keyboard mockups).

## Interaction
None — purely decorative; the real home gesture is handled entirely by the operating system, not by this component.

## Accessibility
Should be hidden from assistive technology — it carries no information and represents no operable control within the app itself.

## State
No interactive state.

## Variant
No variant axis — single fixed bar.

## Animation
None.

## Token Mapping
| Role | Token |
|---|---|
| Bar color | `color.gray-black` |
| Corner radius | `radius.rounded` |

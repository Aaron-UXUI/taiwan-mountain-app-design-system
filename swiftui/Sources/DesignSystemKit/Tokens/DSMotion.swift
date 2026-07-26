import SwiftUI

/// Motion tokens ported from the spec's Motion section (durations were
/// hardcoded per-component there; centralized here as named constants).
/// Every animation in this kit is applied through `View.dsAnimation(_:)`,
/// which automatically drops to no animation when the user has enabled
/// Reduce Motion — SwiftUI does not do this for you, and HIG requires it.
///
/// This enum is just the hand-written namespace; the actual duration
/// constants (`.quick`, `.standard`) are generated from
/// `tokens/design-tokens.json` into `Tokens/Generated/DSMotion+Tokens.swift`
/// — see the root README.
public enum DSMotion {}

public extension View {
    /// Applies `animation` to changes in `value`, unless the user has
    /// Reduce Motion enabled, in which case the change is applied instantly.
    @ViewBuilder
    func dsAnimation<V: Equatable>(_ animation: Animation?, value: V) -> some View {
        modifier(DSReduceMotionAnimationModifier(animation: animation, value: value))
    }
}

private struct DSReduceMotionAnimationModifier<V: Equatable>: ViewModifier {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let animation: Animation?
    let value: V

    func body(content: Content) -> some View {
        content.animation(reduceMotion ? nil : animation, value: value)
    }
}

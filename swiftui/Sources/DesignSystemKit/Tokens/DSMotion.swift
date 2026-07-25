import SwiftUI

/// Motion tokens ported from the spec's Motion section (durations were
/// hardcoded per-component there; centralized here as named constants).
/// Every animation in this kit is applied through `View.dsAnimation(_:)`,
/// which automatically drops to no animation when the user has enabled
/// Reduce Motion — SwiftUI does not do this for you, and HIG requires it.
public enum DSMotion {
    /// Button press / hover feedback — 0.1s ease.
    public static let quick = Animation.easeInOut(duration: 0.1)
    /// Selection / expand-collapse transitions — 0.15s ease (the value used
    /// by six different components in the spec; centralized here as the
    /// de-facto "standard" transition).
    public static let standard = Animation.easeInOut(duration: 0.15)
}

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

import SwiftUI

/// Native port of `spinner-on-white.md` / `spinner-on-dark.md` — Figma
/// `Spinner / On White` (12469:18532) and `Spinner / On Dark` (12469:18955).
///
/// This was a tinted `ProgressView` up to now. Figma's spinner is eight 8pt
/// dots on the circumference of a 40pt box, fading in a trail around it — the
/// system indicator is a gapped spinning ring, which reads differently. Same
/// call as `DSToggle` / `DSSegmentedControl`: follow Figma.
///
/// Both things the native indicator gave us for free are kept explicitly:
/// - `.accessibilityLabel` plus the `.updatesFrequently` trait, so assistive
///   tech still announces it as busy.
/// - **Reduce Motion**: the rotation is dropped and the dots hold a static
///   trail instead, rather than spinning regardless.
public struct DSSpinner: View {
    private let tint: Color
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isAnimating = false

    public init(tint: Color = DSColor.primaryGreen800) {
        self.tint = tint
    }

    /// Dark dots, for light surfaces (e.g. a Secondary/Tertiary button).
    public static let onWhite = DSSpinner(tint: DSColor.primaryGreen800)
    /// White dots, for the brand-green fills (e.g. a Primary button's Loading).
    public static let onDark = DSSpinner(tint: DSColor.white)

    private static let dotCount = 8

    public var body: some View {
        ZStack {
            ForEach(0..<Self.dotCount, id: \.self) { index in
                Circle()
                    .fill(tint)
                    .frame(width: 8, height: 8)
                    // Place the dot at the top, then rotate it into position
                    // about the box centre — 16pt from centre to dot centre.
                    .offset(y: -16)
                    .rotationEffect(.degrees(Double(index) / Double(Self.dotCount) * 360))
                    .opacity(opacity(for: index))
            }
        }
        .frame(width: 40, height: 40)
        .rotationEffect(.degrees(isAnimating ? 360 : 0))
        .animation(
            reduceMotion ? nil : .linear(duration: 1).repeatForever(autoreverses: false),
            value: isAnimating
        )
        .onAppear { isAnimating = true }
        .accessibilityElement()
        .accessibilityLabel("載入中")
        .accessibilityAddTraits(.updatesFrequently)
    }

    /// The trail: the leading dot is opaque and each one behind it fades,
    /// bottoming out at the same 0.15 the React keyframes use.
    private func opacity(for index: Int) -> Double {
        let step = (1.0 - 0.15) / Double(Self.dotCount - 1)
        return 1.0 - step * Double(index)
    }
}

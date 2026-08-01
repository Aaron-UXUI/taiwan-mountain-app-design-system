import SwiftUI

/// Typography tokens ported from the Design Specification's Typography
/// scale. Every level scales with Dynamic Type: instead of a fixed pixel
/// size (as in the CSS token set), each level carries a *base* size plus the
/// closest built-in `Font.TextStyle` to scale relative to, applied through
/// `ScaledMetric` in `DSTypeStyleModifier`. This means every label built on
/// these tokens grows and shrinks correctly across all Dynamic Type
/// categories, including the accessibility sizes (AX1–AX5) — something a
/// fixed CSS `font-size` cannot do.
///
/// Line-height tokens from the spec are intentionally **not** reproduced as
/// fixed `.lineSpacing()` values. A fixed line height that looks right at the
/// base size becomes cramped or overlapping at larger accessibility sizes;
/// the system font's own built-in leading already scales correctly, so
/// components rely on that instead.
///
/// This struct is the hand-written *mechanism*; the actual token values
/// (`.headline1`, `.bodyM`, etc.) are generated from `tokens/design-tokens.json`
/// into `Tokens/Generated/DSTypography+Tokens.swift` — see the root README.
public struct DSTypeStyle {
    public let baseSize: CGFloat
    public let relativeTo: Font.TextStyle
    public let weight: Font.Weight
    public let design: Font.Design
    /// Figma's `Spacing` column, as a fraction of the font size (2% → 0.02).
    /// Kept relative rather than as points so it scales with Dynamic Type
    /// alongside the size it is a percentage of.
    public let letterSpacing: CGFloat

    public init(
        baseSize: CGFloat,
        relativeTo: Font.TextStyle,
        weight: Font.Weight,
        design: Font.Design = .default,
        letterSpacing: CGFloat = 0
    ) {
        self.baseSize = baseSize
        self.relativeTo = relativeTo
        self.weight = weight
        self.design = design
        self.letterSpacing = letterSpacing
    }
}

private struct DSTypeStyleModifier: ViewModifier {
    @ScaledMetric private var size: CGFloat
    let weight: Font.Weight
    let design: Font.Design
    let letterSpacing: CGFloat

    init(style: DSTypeStyle) {
        self._size = ScaledMetric(wrappedValue: style.baseSize, relativeTo: style.relativeTo)
        self.weight = style.weight
        self.design = style.design
        self.letterSpacing = style.letterSpacing
    }

    func body(content: Content) -> some View {
        content
            .font(.system(size: size, weight: weight, design: design))
            .tracking(size * letterSpacing)
    }
}

public extension View {
    /// Applies a Design Specification typography token as a Dynamic
    /// Type-scaling font.
    func dsFont(_ style: DSTypeStyle) -> some View {
        modifier(DSTypeStyleModifier(style: style))
    }
}

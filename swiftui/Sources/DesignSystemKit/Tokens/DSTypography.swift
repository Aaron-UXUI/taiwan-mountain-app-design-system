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
public struct DSTypeStyle {
    public let baseSize: CGFloat
    public let relativeTo: Font.TextStyle
    public let weight: Font.Weight
    public let design: Font.Design

    public init(baseSize: CGFloat, relativeTo: Font.TextStyle, weight: Font.Weight, design: Font.Design = .default) {
        self.baseSize = baseSize
        self.relativeTo = relativeTo
        self.weight = weight
        self.design = design
    }

    // Heading
    /// Known Style Guide inconsistency (also flagged in the spec): H1 is
    /// documented as Regular weight while H2–H4 are Semibold. Reproduced
    /// faithfully per the spec rather than silently "fixed".
    public static let headline1 = DSTypeStyle(baseSize: 40, relativeTo: .largeTitle, weight: .regular)
    public static let headline2 = DSTypeStyle(baseSize: 24, relativeTo: .title, weight: .semibold)
    public static let headline3 = DSTypeStyle(baseSize: 20, relativeTo: .title2, weight: .semibold)
    public static let headline4 = DSTypeStyle(baseSize: 16, relativeTo: .headline, weight: .semibold)

    // Body
    public static let bodyL = DSTypeStyle(baseSize: 16, relativeTo: .body, weight: .regular)
    public static let bodyM = DSTypeStyle(baseSize: 14, relativeTo: .subheadline, weight: .regular)
    public static let bodyS = DSTypeStyle(baseSize: 12, relativeTo: .footnote, weight: .regular)

    // Label
    public static let labelM = DSTypeStyle(baseSize: 14, relativeTo: .subheadline, weight: .semibold)
    public static let labelS = DSTypeStyle(baseSize: 12, relativeTo: .caption, weight: .semibold)

    // Number (SF Mono equivalent: .monospaced design)
    public static let numberL = DSTypeStyle(baseSize: 16, relativeTo: .body, weight: .semibold, design: .monospaced)
    public static let numberM = DSTypeStyle(baseSize: 16, relativeTo: .body, weight: .regular, design: .monospaced)
}

private struct DSTypeStyleModifier: ViewModifier {
    @ScaledMetric private var size: CGFloat
    let weight: Font.Weight
    let design: Font.Design

    init(style: DSTypeStyle) {
        self._size = ScaledMetric(wrappedValue: style.baseSize, relativeTo: style.relativeTo)
        self.weight = style.weight
        self.design = style.design
    }

    func body(content: Content) -> some View {
        content.font(.system(size: size, weight: weight, design: design))
    }
}

public extension View {
    /// Applies a Design Specification typography token as a Dynamic
    /// Type-scaling font.
    func dsFont(_ style: DSTypeStyle) -> some View {
        modifier(DSTypeStyleModifier(style: style))
    }
}

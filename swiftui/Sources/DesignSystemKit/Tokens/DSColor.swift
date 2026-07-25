import SwiftUI

/// Color tokens ported from the platform-independent Design Specification's
/// Token Mapping tables. Values are the exact hex colors documented there.
///
/// The source Figma library defines only one appearance ("Mode 1") — there is
/// no dark-mode counterpart yet. Rather than inventing dark values, every
/// token below is exposed as a semantic name (never a raw hex literal at the
/// call site) so that once dark variants exist upstream, only this file
/// needs to change — call sites are already written against `DSColor.*`.
///
/// Where a token is used against system chrome (e.g. sheet backgrounds), the
/// component layer prefers native semantic colors (`Color(.systemBackground)`,
/// `.primary`, `.secondary`) instead, so the app still adapts correctly to
/// Dark Mode and Increased Contrast even before brand dark tokens exist.
public enum DSColor {
    // MARK: Primary (brand green)
    public static let primaryGreen50 = Color(hex: 0xECF0E4)
    public static let primaryGreen100 = Color(hex: 0xD6E0C3)
    public static let primaryGreen700 = Color(hex: 0x5C6647)
    public static let primaryGreen800 = Color(hex: 0x464F34)
    public static let primaryGreen900 = Color(hex: 0x343C25)

    // MARK: Accent (yellow)
    public static let accentYellow50 = Color(hex: 0xFFF19C)
    public static let accentYellow100 = Color(hex: 0xFFD966)
    public static let accentYellow700 = Color(hex: 0x695400)
    public static let accentYellow900 = Color(hex: 0x493700)

    // MARK: Semantic
    public static let info600 = Color(hex: 0x006AD1)
    public static let info700 = Color(hex: 0x0051B8)
    public static let success600 = Color(hex: 0x467800)
    public static let success700 = Color(hex: 0x396100)
    public static let destruct600 = Color(hex: 0xCF0000)
    public static let destruct700 = Color(hex: 0xB20000)

    // MARK: Gray
    public static let black = Color(hex: 0x1D1F1B)
    public static let white = Color(hex: 0xFDFDFC)
    public static let gray50 = Color(hex: 0xF3F5EE)
    public static let gray100 = Color(hex: 0xDBDED5)
    public static let gray200 = Color(hex: 0xC5C8BE)
    public static let gray400 = Color(hex: 0x989C91)
    public static let gray800 = Color(hex: 0x494C44)
}

extension Color {
    init(hex: UInt32) {
        let r = Double((hex >> 16) & 0xFF) / 255
        let g = Double((hex >> 8) & 0xFF) / 255
        let b = Double(hex & 0xFF) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: 1)
    }
}

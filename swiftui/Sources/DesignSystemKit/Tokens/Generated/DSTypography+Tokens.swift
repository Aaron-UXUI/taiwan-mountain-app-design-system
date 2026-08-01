// GENERATED FILE — do not edit by hand.
// Source of truth: tokens/design-tokens.json
// Regenerate with: npm run tokens:build (node tokens/build-tokens.mjs)
import SwiftUI

public extension DSTypeStyle {
    /// Figma Style Guide 本身標記 Regular/2% letter-spacing，跟 H2–H4（皆 Semibold/0%）不一致，疑似文件錯誤，忠實保留而非逕自修正
    static let headline1 = DSTypeStyle(baseSize: 40, relativeTo: .largeTitle, weight: .regular, letterSpacing: 0.02)
    static let headline2 = DSTypeStyle(baseSize: 24, relativeTo: .title, weight: .semibold)
    static let headline3 = DSTypeStyle(baseSize: 20, relativeTo: .title2, weight: .semibold)
    static let headline4 = DSTypeStyle(baseSize: 16, relativeTo: .headline, weight: .semibold)
    static let bodyL = DSTypeStyle(baseSize: 16, relativeTo: .body, weight: .regular)
    static let bodyM = DSTypeStyle(baseSize: 14, relativeTo: .subheadline, weight: .regular)
    static let bodyS = DSTypeStyle(baseSize: 12, relativeTo: .footnote, weight: .regular)
    static let labelM = DSTypeStyle(baseSize: 14, relativeTo: .subheadline, weight: .semibold)
    static let labelS = DSTypeStyle(baseSize: 12, relativeTo: .caption, weight: .semibold)
    /// Number/L 與 Number/M 數值完全相同，只有粗細不同，疑似複製貼上遺漏更新，忠實保留
    static let numberL = DSTypeStyle(baseSize: 16, relativeTo: .body, weight: .semibold, design: .monospaced)
    static let numberM = DSTypeStyle(baseSize: 16, relativeTo: .body, weight: .regular, design: .monospaced)
}

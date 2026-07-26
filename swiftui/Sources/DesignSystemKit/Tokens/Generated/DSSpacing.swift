// GENERATED FILE — do not edit by hand.
// Source of truth: tokens/design-tokens.json
// Regenerate with: npm run tokens:build (node tokens/build-tokens.mjs)
import SwiftUI

public enum DSSpacing {
    public static let none: CGFloat = 0
    public static let xs: CGFloat = 4
    public static let s: CGFloat = 8
    public static let sm: CGFloat = 12
    public static let m: CGFloat = 16
    public static let lm: CGFloat = 24
    public static let l: CGFloat = 32
    public static let xl: CGFloat = 40
    public static let xl2: CGFloat = 48
    public static let xl3: CGFloat = 56
    public static let xl4: CGFloat = 64
}

public enum DSRadius {
    public static let none: CGFloat = 0
    public static let xxs: CGFloat = 4
    public static let xs: CGFloat = 8
    public static let s: CGFloat = 12
    public static let m: CGFloat = 16
    // "--radius-rounded" intentionally omitted: Intentionally not exposed as a Swift CGFloat constant — use Capsule()/.clipShape(Capsule()) for a fully-rounded shape at any size instead of an arbitrarily large corner radius.
}

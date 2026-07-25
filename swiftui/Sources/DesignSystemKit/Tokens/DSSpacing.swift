import CoreGraphics

/// Spacing tokens (points), 1:1 with the Design Specification's Spacing scale.
/// Kept as fixed constants — HIG layouts rely on Auto Layout-style flexible
/// stacks to absorb Dynamic Type growth, not on scaling the spacing values
/// themselves.
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

/// Corner radius tokens. `rounded` is intentionally not exposed as a numeric
/// value — call sites should use `Capsule()` / `.clipShape(Capsule())`
/// instead of an arbitrarily large corner radius, which is the correct
/// SwiftUI idiom for a fully-rounded (pill) shape at any size.
public enum DSRadius {
    public static let none: CGFloat = 0
    public static let xxs: CGFloat = 4
    public static let xs: CGFloat = 8
    public static let s: CGFloat = 12
    public static let m: CGFloat = 16
}

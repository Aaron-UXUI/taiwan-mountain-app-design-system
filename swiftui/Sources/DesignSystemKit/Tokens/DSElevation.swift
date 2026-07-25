import SwiftUI

/// Elevation tokens, approximating the spec's multi-layer CSS box-shadows as
/// stacked native `.shadow()` modifiers. Values are tuned to read correctly
/// against opaque surfaces; on Liquid Glass / translucent Material surfaces,
/// prefer the native `.regularMaterial` / `.thinMaterial` backgrounds instead
/// of an elevation shadow, per HIG.
public struct DSElevationStyle {
    let layers: [(color: Color, radius: CGFloat, x: CGFloat, y: CGFloat)]

    public static let level1 = DSElevationStyle(layers: [(DSColor.gray100, 1, 0, 1)])
    public static let level2 = DSElevationStyle(layers: [
        (Color.black.opacity(0.08), 4, 0, 1),
        (Color.black.opacity(0.08), 8, 0, 2)
    ])
    public static let level3 = DSElevationStyle(layers: [
        (Color.black.opacity(0.12), 1, 0, 2),
        (Color.black.opacity(0.12), 12, 0, 2)
    ])
    public static let level4 = DSElevationStyle(layers: [(Color.black.opacity(0.12), 20, 0, 6)])
    public static let level5 = DSElevationStyle(layers: [
        (Color.black.opacity(0.16), 32, 0, 8),
        (Color.black.opacity(0.12), 4, 0, 2)
    ])
}

private struct DSElevationModifier: ViewModifier {
    let style: DSElevationStyle

    func body(content: Content) -> some View {
        var view = AnyView(content)
        for layer in style.layers {
            view = AnyView(view.shadow(color: layer.color, radius: layer.radius, x: layer.x, y: layer.y))
        }
        return view
    }
}

public extension View {
    func dsElevation(_ style: DSElevationStyle) -> some View {
        modifier(DSElevationModifier(style: style))
    }
}

import SwiftUI

/// Elevation tokens, approximating the spec's multi-layer CSS box-shadows as
/// stacked native `.shadow()` modifiers. Values are tuned to read correctly
/// against opaque surfaces; on Liquid Glass / translucent Material surfaces,
/// prefer the native `.regularMaterial` / `.thinMaterial` backgrounds instead
/// of an elevation shadow, per HIG.
///
/// This struct is the hand-written *mechanism*; the actual level data
/// (`.level1`...`.level5`) is generated from `tokens/design-tokens.json`
/// into `Tokens/Generated/DSElevation+Tokens.swift` — see the root README.
public struct DSElevationStyle {
    let layers: [(color: Color, radius: CGFloat, x: CGFloat, y: CGFloat)]
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

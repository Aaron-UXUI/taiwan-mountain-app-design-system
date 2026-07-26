import SwiftUI

/// Native port of `user-location.md`.
///
/// On a real MapKit map, prefer `Map(initialPosition: ...) { UserAnnotation() }`
/// / `.showsUserLocation` directly — MapKit already renders the system's own
/// "you are here" marker with correct heading rotation, so this custom view
/// exists only for non-MapKit contexts (e.g. a static onboarding
/// illustration) and is hidden from accessibility, matching the spec.
public struct DSUserLocationMarker: View {
    private let headingDegrees: Double

    public init(headingDegrees: Double = 0) {
        self.headingDegrees = headingDegrees
    }

    public var body: some View {
        // Figma is a heading cone fading out away from the pin, with a 20pt
        // info-700 dot under it carrying a 3pt white ring and Elevation/3 —
        // not an SF Symbol arrow inside a translucent halo.
        ZStack(alignment: .bottom) {
            HeadingCone()
                .fill(
                    LinearGradient(
                        colors: [DSColor.info700.opacity(0.0), DSColor.info700.opacity(0.45)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(width: 70, height: 70)
                .rotationEffect(.degrees(headingDegrees))
                .offset(y: 8)

            Circle()
                .fill(DSColor.info700)
                .frame(width: 20, height: 20)
                .overlay(Circle().strokeBorder(DSColor.white, lineWidth: 3))
                .dsElevation(.level3)
        }
        .frame(width: 40)
        .accessibilityHidden(true)
    }
}

/// The fan of the heading indicator: a wedge that opens away from the pin.
private struct HeadingCone: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.minY))
        path.closeSubpath()
        return path
    }
}

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
        ZStack {
            Circle()
                .fill(DSColor.info700.opacity(0.25))
                .frame(width: 40, height: 40)
            Image(systemName: "location.north.circle.fill")
                .font(.system(size: 24))
                .foregroundStyle(DSColor.white, DSColor.info700)
                .rotationEffect(.degrees(headingDegrees))
        }
        .accessibilityHidden(true)
    }
}

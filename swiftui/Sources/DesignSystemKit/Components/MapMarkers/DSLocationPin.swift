import SwiftUI

/// Native port of `location-pin.md`. Intended as the content view of a
/// MapKit `Annotation` (`Map { Annotation(place.name, coordinate: ...) { DSLocationPin(...) } }`),
/// not a standalone control — a bare marker view with no map underneath it
/// has nothing to annotate.
public enum DSLocationPinKind { case pin, info }

public struct DSLocationPin: View {
    private let label: String
    private let kind: DSLocationPinKind
    private let isFocused: Bool
    private let placeName: String

    public init(label: String, placeName: String, kind: DSLocationPinKind = .pin, isFocused: Bool = false) {
        self.label = label
        self.placeName = placeName
        self.kind = kind
        self.isFocused = isFocused
    }

    public var body: some View {
        Text(label)
            .dsFont(.headline4)
            .foregroundStyle(DSColor.white)
            .padding(DSSpacing.xs)
            .background(fill)
            .clipShape(Capsule())
            .dsElevation(.level4)
            .accessibilityLabel(placeName)
            .accessibilityAddTraits(isFocused ? .isSelected : [])
    }

    private var fill: Color {
        if isFocused { return DSColor.info700 }
        return kind == .info ? DSColor.info600 : DSColor.primaryGreen800
    }
}

import SwiftUI

/// Native port of `location-pin.md` — Figma `Location Pin` (node 11129:12159).
///
/// Intended as the content view of a MapKit `Annotation`, not a standalone
/// control — a bare marker with no map underneath has nothing to annotate.
///
/// Figma stacks the place name *above* a 24pt circular pin: the label is
/// Headline/4 semibold in the pin's own colour with an Elevation/4 text
/// shadow, and the pin is a filled circle with a 2pt white ring, an
/// Elevation/4 drop shadow, and a Map glyph inside. An earlier version drew a
/// capsule containing a number instead, which is a different component
/// altogether.
public enum DSLocationPinKind {
    /// `Type=Default` — a place marker, brand green.
    case place
    /// `Type=Info` — tied to an open information panel, semantic blue.
    case info
}

public struct DSLocationPin: View {
    private let placeName: String
    private let glyph: DSIcon
    private let kind: DSLocationPinKind
    private let isFocused: Bool

    public init(
        placeName: String,
        glyph: DSIcon = .tree,
        kind: DSLocationPinKind = .place,
        isFocused: Bool = false
    ) {
        self.placeName = placeName
        self.glyph = glyph
        self.kind = kind
        self.isFocused = isFocused
    }

    /// Figma keeps one fill per `Type` across both states — focus does **not**
    /// darken the pin, it *enlarges* it (24pt → 48pt). An earlier version
    /// shifted green-800→900 / info-600→700 on focus and kept the size fixed,
    /// which is the wrong axis entirely.
    private var fill: Color {
        switch kind {
        case .place: return DSColor.primaryGreen800
        case .info: return DSColor.info600
        }
    }

    /// The label does not always match the pin: `Type=Info` pairs an info-600
    /// pin with an info-700 label.
    private var labelColor: Color {
        switch kind {
        case .place: return DSColor.primaryGreen800
        case .info: return DSColor.info700
        }
    }

    private var pinSize: CGFloat { isFocused ? 48 : 24 }

    public var body: some View {
        VStack(spacing: 0) {
            Text(placeName)
                .dsFont(.headline4)
                .foregroundStyle(labelColor)
                .multilineTextAlignment(.center)
                // Figma applies Elevation/4 to the label so it stays legible
                // over map imagery.
                .shadow(color: .black.opacity(0.12), radius: 20, y: 6)

            DSIconView(glyph)
                // The glyph is inset inside the circle rather than filling it.
                .frame(width: pinSize * 0.5, height: pinSize * 0.5)
                .foregroundStyle(DSColor.white)
                .frame(width: pinSize, height: pinSize)
                .background(fill)
                .clipShape(Circle())
                // 2pt white ring around the pin.
                .overlay(Circle().strokeBorder(DSColor.white, lineWidth: 2))
                .dsElevation(.level4)
        }
        .frame(width: 144)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(placeName)
        .accessibilityAddTraits(isFocused ? [.isButton, .isSelected] : .isButton)
    }
}

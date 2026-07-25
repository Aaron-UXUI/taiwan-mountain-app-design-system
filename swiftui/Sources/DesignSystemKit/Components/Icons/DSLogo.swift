import SwiftUI

/// Native port of `logo.md`. No real brand asset exists for this project —
/// the Figma source is a flattened vector this session has no download
/// access to (matching the reasoning already recorded in the React source's
/// own `Logo.tsx`) — so this is a text lockup placeholder, not a final
/// production mark. Swap the `Text` for an `Image` once a real asset exists;
/// callers already only see `DSLogo(size:)`, so nothing else needs to change.
public enum DSLogoSize { case large, small }

public struct DSLogo: View {
    private let size: DSLogoSize

    public init(size: DSLogoSize = .large) {
        self.size = size
    }

    public var body: some View {
        Text("台灣山林")
            .dsFont(size == .large ? .headline2 : .headline4)
            .foregroundStyle(DSColor.primaryGreen800)
            .accessibilityLabel("台灣山林")
            .accessibilityAddTraits(.isImage)
    }
}

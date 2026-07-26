import SwiftUI

/// Native port of `link.md`. For destinations that are real URLs, prefer
/// SwiftUI's own `Link(destination:)` directly (it already opens Safari /
/// universal links correctly) — `DSLink` is for in-app actions that need the
/// same visual weight as a text link.
public struct DSLink: View {
    private let title: String
    private let action: () -> Void

    public init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(title)
        }
        .buttonStyle(DSLinkButtonStyle())
    }
}

private struct DSLinkButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        // Figma sets the link in Label/M — 14pt Semibold, not Regular.
        configuration.label
            .dsFont(.labelM)
            .foregroundStyle(configuration.isPressed ? DSColor.accentYellow900 : DSColor.accentYellow700)
    }
}


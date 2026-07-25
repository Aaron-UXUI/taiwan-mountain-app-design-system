import SwiftUI

/// Native port of `link-further-info.md`. The trailing arrow is decorative
/// (`.accessibilityHidden`) — the label text alone is the accessible name,
/// exactly as the spec requires.
public struct DSLinkFurtherInfo: View {
    private let title: String
    private let action: () -> Void

    public init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            HStack(spacing: DSSpacing.xs) {
                Text(title)
                DSIcon.externalLink.image
                    .accessibilityHidden(true)
            }
        }
        .buttonStyle(DSLinkFurtherInfoStyle())
        .accessibilityLabel(title)
    }
}

private struct DSLinkFurtherInfoStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .dsFont(.bodyM)
            .padding(.vertical, DSSpacing.sm)
            .padding(.horizontal, DSSpacing.sm)
            .foregroundStyle(DSColor.primaryGreen800)
            .background(configuration.isPressed ? DSColor.gray50 : DSColor.white)
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
                    .strokeBorder(DSColor.primaryGreen800)
            )
            .dsElevation(.level3)
            .dsAnimation(DSMotion.quick, value: configuration.isPressed)
    }
}


import SwiftUI

/// Native port of `chips-large.md` / `chips-small.md`. Selection state is
/// exposed via `.accessibilityAddTraits(.isSelected)` — the native trait
/// VoiceOver announces as "selected" — rather than a bespoke toggle-button
/// role.
public struct DSChip: View {
    public enum Size { case large, small }

    private let title: String
    private let size: Size
    @Binding private var isSelected: Bool

    public init(_ title: String, size: Size = .large, isSelected: Binding<Bool>) {
        self.title = title
        self.size = size
        self._isSelected = isSelected
    }

    public var body: some View {
        Button {
            isSelected.toggle()
        } label: {
            Text(title)
                .dsFont(size == .large ? .bodyM : .bodyS)
        }
        .buttonStyle(DSChipStyle(isSelected: isSelected))
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

private struct DSChipStyle: ButtonStyle {
    let isSelected: Bool

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(.vertical, DSSpacing.s)
            .padding(.horizontal, DSSpacing.m)
            .foregroundStyle(isSelected ? DSColor.primaryGreen900 : DSColor.gray800)
            .background(isSelected ? DSColor.primaryGreen50 : DSColor.white)
            .overlay(
                Capsule().strokeBorder(isSelected ? DSColor.primaryGreen900 : DSColor.gray100)
            )
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

/// Native port of `chips-salient.md` — a non-interactive, high-emphasis
/// status tag. Never wrapped in a `Button`: it is read-only content, so it
/// is excluded from the accessibility/tab-focus order like any other text.
public struct DSSalientTag: View {
    public enum Kind { case general, special, warning }

    private let title: String
    private let kind: Kind

    public init(_ title: String, kind: Kind = .general) {
        self.title = title
        self.kind = kind
    }

    public var body: some View {
        Text(title)
            .dsFont(.bodyS)
            .padding(DSSpacing.m)
            .foregroundStyle(DSColor.white)
            .background(fill)
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
    }

    private var fill: Color {
        switch kind {
        case .general: return DSColor.primaryGreen900
        case .special: return DSColor.accentYellow900
        case .warning: return DSColor.destruct700
        }
    }
}


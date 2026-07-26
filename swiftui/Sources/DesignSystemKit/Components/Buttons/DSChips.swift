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
                // Figma switches the label to Semibold when selected.
                .fontWeight(isSelected ? .semibold : .regular)
        }
        .buttonStyle(DSChipStyle(isSelected: isSelected, size: size))
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

private struct DSChipStyle: ButtonStyle {
    let isSelected: Bool
    let size: DSChip.Size

    func makeBody(configuration: Configuration) -> some View {
        // One 8pt rounded-rect shape for both the fill and the 1pt border.
        // These were previously mismatched — the border was drawn as a Capsule
        // while the fill was clipped to a rounded rectangle, so the outline did
        // not follow the shape it was outlining.
        //
        // Large takes 8/16 padding; Small has horizontal padding only and is
        // pinned to a 32pt height in Figma (it was picking up the same 8pt
        // vertical padding and landing short).
        let shape = RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous)
        return configuration.label
            .padding(.vertical, size == .large ? DSSpacing.s : 0)
            .padding(.horizontal, DSSpacing.m)
            .frame(minHeight: size == .large ? 0 : 32)
            .foregroundStyle(isSelected ? DSColor.primaryGreen900 : DSColor.gray800)
            .background(isSelected ? DSColor.primaryGreen50 : DSColor.white, in: shape)
            .overlay {
                // Selected border is green-100 in Figma, not green-900.
                shape.strokeBorder(isSelected ? DSColor.primaryGreen100 : DSColor.gray100, lineWidth: 1)
            }
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
        // Figma: fixed 32pt height with horizontal padding only, and the
        // label uses the Label/S style (Semibold), not a regular weight.
        Text(title)
            .dsFont(.bodyS)
            .fontWeight(.semibold)
            .foregroundStyle(DSColor.white)
            .padding(.horizontal, DSSpacing.m)
            .frame(height: 32)
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


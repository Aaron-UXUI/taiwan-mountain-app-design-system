import SwiftUI

/// Native port of `check-box.md` — Figma `CheckBox` (node 7813:28478).
///
/// Built on SwiftUI's `Toggle` (the platform's real "persisted boolean"
/// abstraction) with a custom `ToggleStyle`, so it keeps native toggle
/// semantics while drawing the designed control: a 20pt rounded square that
/// is outlined when off and filled brand-green with a white check when on.
///
/// The label is part of the hit target and changes colour with the state,
/// which the earlier SF Symbol version did not reproduce.
public struct DSCheckBox: View {
    private let label: String
    @Binding private var isChecked: Bool

    public init(_ label: String, isChecked: Binding<Bool>) {
        self.label = label
        self._isChecked = isChecked
    }

    public var body: some View {
        Toggle(isOn: $isChecked) {
            Text(label).dsFont(.bodyM)
        }
        .toggleStyle(DSCheckBoxStyle())
    }
}

private struct DSCheckBoxStyle: ToggleStyle {
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        Button {
            configuration.isOn.toggle()
        } label: {
            HStack(alignment: .top, spacing: DSSpacing.s) {
                box(isOn: configuration.isOn)
                configuration.label
                    // Figma tints the label brand-green once checked.
                    .foregroundStyle(labelColor(isOn: configuration.isOn))
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(DSSpacing.m)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        // A plain Button is announced as "button" and never conveys
        // checked/unchecked, which the spec requires — re-project the real
        // Toggle semantics so VoiceOver reports the state.
        .accessibilityRepresentation {
            Toggle(isOn: configuration.$isOn) { configuration.label }
        }
    }

    /// 20pt square, 4pt corner radius: 1pt gray-800 outline when off, solid
    /// green-800 with a white check when on.
    private func box(isOn: Bool) -> some View {
        let shape = RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous)
        return ZStack {
            if isOn {
                shape.fill(isEnabled ? DSColor.primaryGreen800 : DSColor.gray400)
                DSIcon.check.image
                    .resizable()
                    .scaledToFit()
                    // The glyph's own semantic tint is green; on the filled
                    // box it has to be white.
                    .foregroundStyle(DSColor.white)
                    .frame(width: 14, height: 14)
            } else {
                shape.strokeBorder(isEnabled ? DSColor.gray800 : DSColor.gray400, lineWidth: 1)
            }
        }
        .frame(width: 20, height: 20)
        // Decorative — the Toggle projection above carries the real state.
        .accessibilityHidden(true)
    }

    private func labelColor(isOn: Bool) -> Color {
        guard isEnabled else { return DSColor.gray400 }
        return isOn ? DSColor.primaryGreen800 : DSColor.gray800
    }
}

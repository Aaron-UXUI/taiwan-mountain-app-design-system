import SwiftUI

/// Native port of `check-box.md`. Built on SwiftUI's `Toggle` (the platform's
/// real "persisted boolean" abstraction) with a custom `ToggleStyle` that
/// renders it as a checkbox glyph — the multi-select idiom Apple's own apps
/// (Files, Photos "Select" mode) use on iOS, since iOS has no native
/// standalone checkbox control.
public struct DSCheckBox: View {
    private let label: String
    @Binding private var isChecked: Bool

    public init(_ label: String, isChecked: Binding<Bool>) {
        self.label = label
        self._isChecked = isChecked
    }

    public var body: some View {
        Toggle(isOn: $isChecked) {
            Text(label)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.gray800)
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
            HStack(spacing: DSSpacing.s) {
                Image(systemName: configuration.isOn ? "checkmark.square.fill" : "square")
                    .imageScale(.large)
                    .foregroundStyle(isEnabled ? (configuration.isOn ? DSColor.primaryGreen800 : DSColor.gray400) : DSColor.gray200)
                configuration.label
            }
        }
        .buttonStyle(.plain)
    }
}

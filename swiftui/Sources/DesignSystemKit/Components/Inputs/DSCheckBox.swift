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
                    // Spec: "The visual box itself is decorative" — the
                    // control's real semantics come from the Toggle below.
                    .accessibilityHidden(true)
                configuration.label
            }
        }
        .buttonStyle(.plain)
        // Wrapping the content in a plain Button is what gives us the
        // checkbox *look*, but a Button alone is announced as "button" and
        // never conveys checked/unchecked — which the spec explicitly
        // requires ("assistive tech announces 'checked'/'unchecked' state
        // automatically"). Re-project the real Toggle semantics onto it so
        // VoiceOver reports both the state and that it is togglable.
        .accessibilityRepresentation {
            Toggle(isOn: configuration.$isOn) { configuration.label }
        }
    }
}

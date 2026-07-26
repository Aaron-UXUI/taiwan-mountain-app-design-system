import SwiftUI

/// Native port of `toggle.md` — Figma `Toggles` (node 10291:14552).
///
/// This was a tinted native `Toggle` up to now, on the grounds that the system
/// switch is the platform-correct control. The design's Off state is far enough
/// from the native one to be obvious side by side — Figma draws a green-100
/// track with a 2pt green-800 outline and a **green-800** knob, where iOS draws
/// a grey track with a white knob — and the call was made to follow Figma for
/// brand consistency. So the track and knob are drawn here.
///
/// What stays native is everything that matters for behaviour: this is still a
/// `Toggle` with a custom `ToggleStyle`, so VoiceOver reports it as a switch
/// with on/off state (not "button"), and it keeps working with `.disabled(_:)`
/// and Dynamic Type. Unlike the spec's standalone Toggle (which has no label of
/// its own — a documented gap there), this initializer requires a label,
/// closing that gap by construction.
public struct DSToggle: View {
    private let label: String
    @Binding private var isOn: Bool

    public init(_ label: String, isOn: Binding<Bool>) {
        self.label = label
        self._isOn = isOn
    }

    public var body: some View {
        Toggle(label, isOn: $isOn)
            .dsFont(.bodyL)
            .toggleStyle(DSSwitchStyle())
    }
}

/// Figma: a 52x32 capsule with a 24pt knob inset 4pt, so the knob travels
/// between a 4pt leading and a 4pt trailing inset.
struct DSSwitchStyle: ToggleStyle {
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        HStack(spacing: DSSpacing.s) {
            configuration.label
                .foregroundStyle(isEnabled ? DSColor.black : DSColor.gray400)
            Spacer(minLength: 0)
            track(isOn: configuration.isOn)
        }
        .contentShape(Rectangle())
        .onTapGesture { configuration.isOn.toggle() }
        .dsAnimation(DSMotion.quick, value: configuration.isOn)
        // A custom style renders its own chrome, which strips the native
        // switch semantics with it — re-project the real Toggle so VoiceOver
        // still announces "switch, on/off" rather than describing shapes.
        .accessibilityRepresentation {
            Toggle(isOn: configuration.$isOn) { configuration.label }
        }
    }

    private func track(isOn: Bool) -> some View {
        let trackFill: Color = isEnabled
            ? (isOn ? DSColor.primaryGreen800 : DSColor.primaryGreen100)
            : DSColor.gray100
        let knobFill: Color = isEnabled
            ? (isOn ? DSColor.white : DSColor.primaryGreen800)
            : DSColor.gray400

        return ZStack(alignment: isOn ? .trailing : .leading) {
            Capsule()
                .fill(trackFill)
                // Only the Off state carries the outline; On is a solid fill.
                .overlay {
                    if !isOn {
                        Capsule().strokeBorder(
                            isEnabled ? DSColor.primaryGreen800 : DSColor.gray400,
                            lineWidth: 2
                        )
                    }
                }
            Circle()
                .fill(knobFill)
                .frame(width: 24, height: 24)
                .padding(DSSpacing.xs)
        }
        .frame(width: 52, height: 32)
    }
}

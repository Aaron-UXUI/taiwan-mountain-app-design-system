import SwiftUI

/// Native port of `toggle.md`. SwiftUI's `Toggle` already *is* the native
/// "switch" control the spec describes, including the correct on/off
/// (rather than checked/unchecked) VoiceOver semantics it calls for — this
/// wrapper only applies brand tint. Unlike the spec's standalone Toggle
/// (which has no label of its own — a documented gap there), this
/// initializer requires a label, closing that gap by construction.
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
            .tint(DSColor.primaryGreen800)
    }
}

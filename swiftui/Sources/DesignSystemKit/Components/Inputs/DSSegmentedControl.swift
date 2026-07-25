import SwiftUI

/// Native port of `segmented-controls.md` — a direct, near 1:1 match onto
/// SwiftUI's `Picker` with `.pickerStyle(.segmented)`, which already
/// provides the sliding-indicator animation, press feedback, and correct
/// "tab"-like VoiceOver semantics natively.
public enum DSSegmentSide: Hashable { case left, right }

public struct DSSegmentedControl: View {
    private let leftLabel: String
    private let rightLabel: String
    @Binding private var selected: DSSegmentSide

    public init(leftLabel: String, rightLabel: String, selected: Binding<DSSegmentSide>) {
        self.leftLabel = leftLabel
        self.rightLabel = rightLabel
        self._selected = selected
    }

    public var body: some View {
        Picker("", selection: $selected) {
            Text(leftLabel).tag(DSSegmentSide.left)
            Text(rightLabel).tag(DSSegmentSide.right)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
    }
}

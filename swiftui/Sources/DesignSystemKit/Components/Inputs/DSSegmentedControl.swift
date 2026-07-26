import SwiftUI

/// Native port of `segmented-controls.md` — Figma `Segmented Controls`
/// (node 598:6408).
///
/// This was `Picker(.segmented)` up to now. The native control inverts the
/// design: Figma fills the selected indicator green-800 and sets its label
/// white, while iOS draws a white indicator with a dark label. Following the
/// same call made for `DSToggle`, the track and indicator are drawn here.
///
/// The selection still behaves natively — each segment is a `Button` inside an
/// `accessibilityRepresentation` that projects a real `Picker`, so VoiceOver
/// announces it as a picker with the selected value rather than as two loose
/// buttons, and the indicator animates with `matchedGeometryEffect` (the same
/// technique `DSTabBar` uses).
public enum DSSegmentSide: Hashable { case left, right }

public struct DSSegmentedControl: View {
    private let leftLabel: String
    private let rightLabel: String
    @Binding private var selected: DSSegmentSide
    @Namespace private var indicatorNamespace

    public init(leftLabel: String, rightLabel: String, selected: Binding<DSSegmentSide>) {
        self.leftLabel = leftLabel
        self.rightLabel = rightLabel
        self._selected = selected
    }

    public var body: some View {
        HStack(spacing: 0) {
            segment(.left, label: leftLabel)
            segment(.right, label: rightLabel)
        }
        // Figma: gray-50 track at an 8pt radius, with the indicator inset 2pt.
        .padding(2)
        .background(DSColor.gray50, in: RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
        .frame(maxWidth: 480)
        .dsAnimation(DSMotion.quick, value: selected)
        .accessibilityRepresentation {
            Picker("", selection: $selected) {
                Text(leftLabel).tag(DSSegmentSide.left)
                Text(rightLabel).tag(DSSegmentSide.right)
            }
            .pickerStyle(.segmented)
            .labelsHidden()
        }
    }

    private func segment(_ side: DSSegmentSide, label: String) -> some View {
        let isSelected = selected == side
        return Button {
            selected = side
        } label: {
            Text(label)
                .dsFont(.bodyM)
                .foregroundStyle(isSelected ? DSColor.white : DSColor.gray800)
                .lineLimit(1)
                .padding(.vertical, DSSpacing.s)
                .padding(.horizontal, DSSpacing.lm)
                .frame(maxWidth: .infinity, minHeight: 32)
                .background {
                    if isSelected {
                        RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous)
                            .fill(DSColor.primaryGreen800)
                            .dsElevation(.level1)
                            .matchedGeometryEffect(id: "indicator", in: indicatorNamespace)
                    }
                }
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

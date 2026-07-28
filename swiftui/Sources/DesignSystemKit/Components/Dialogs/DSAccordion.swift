import SwiftUI

/// Native port of `accordion-check-box.md` / `accordion-chips.md`. Both are
/// direct matches onto SwiftUI's own `DisclosureGroup`, which already
/// provides the expanded/collapsed accessibility state and arrow rotation —
/// so these are thin convenience initializers over it, not a rebuilt
/// disclosure widget.

/// Figma's disclosure indicator is the brand **14pt chevron**, right-aligned
/// on a 48pt title row. `DisclosureGroup`'s default style draws the system
/// SF Symbol chevron at its own size and adds its own row insets, so the
/// indicator is replaced here via a style rather than left to the system.
struct DSDisclosureStyle: DisclosureGroupStyle {
    func makeBody(configuration: Configuration) -> some View {
        VStack(spacing: 0) {
            Button {
                configuration.isExpanded.toggle()
            } label: {
                HStack(spacing: DSSpacing.s) {
                    configuration.label
                        .frame(maxWidth: .infinity, alignment: .leading)
                    DSIconView(.chevron)
                        .foregroundStyle(DSColor.black)
                        .rotationEffect(.degrees(configuration.isExpanded ? 180 : 0))
                        .accessibilityHidden(true)
                }
                .frame(height: 48)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            // There is no "expanded" trait on iOS; VoiceOver conveys
            // disclosure state through the value, as the system's own
            // DisclosureGroup does.
            .accessibilityAddTraits(.isButton)
            .accessibilityValue(configuration.isExpanded ? "已展開" : "已收合")

            if configuration.isExpanded {
                configuration.content
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        // Routed through `dsAnimation` rather than a `withAnimation` in the
        // button so it still honours Reduce Motion.
        .dsAnimation(DSMotion.standard, value: configuration.isExpanded)
    }
}

public struct DSAccordionCheckBox: View {
    private let title: String
    private let options: [String]
    @Binding private var isExpanded: Bool
    @Binding private var checkedOptions: Set<String>

    public init(title: String, options: [String], isExpanded: Binding<Bool>, checkedOptions: Binding<Set<String>>) {
        self.title = title
        self.options = options
        self._isExpanded = isExpanded
        self._checkedOptions = checkedOptions
    }

    public var body: some View {
        DisclosureGroup(isExpanded: $isExpanded) {
            ForEach(options, id: \.self) { option in
                DSCheckBox(option, isChecked: Binding(
                    get: { checkedOptions.contains(option) },
                    set: { isOn in
                        if isOn { checkedOptions.insert(option) } else { checkedOptions.remove(option) }
                    }
                ))
            }
        } label: {
            header
        }
        // Figma stacks the checkbox rows flush under the title row; the rows
        // carry their own 16pt padding, so there is no extra gap here.
        .disclosureGroupStyle(DSDisclosureStyle())
    }

    private var header: some View {
        HStack(spacing: DSSpacing.s) {
            Text(title).dsFont(.bodyM).foregroundStyle(DSColor.black)
            if !checkedOptions.isEmpty {
                DSBadge(.accordion(count: checkedOptions.count))
            }
            Spacer(minLength: 0)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(checkedOptions.isEmpty ? title : "\(title), 已選 \(checkedOptions.count) 項")
    }
}

public struct DSAccordionChips: View {
    private let title: String
    private let options: [String]
    @Binding private var isExpanded: Bool
    @Binding private var selectedOptions: Set<String>

    public init(title: String, options: [String], isExpanded: Binding<Bool>, selectedOptions: Binding<Set<String>>) {
        self.title = title
        self.options = options
        self._isExpanded = isExpanded
        self._selectedOptions = selectedOptions
    }

    public var body: some View {
        DisclosureGroup(isExpanded: $isExpanded) {
            // Figma fills this row with `Chips / Large` (103pt wide, 8/16
            // padding, 14pt label), not the Small variant.
            DSFlowLayout(spacing: DSSpacing.s) {
                ForEach(options, id: \.self) { option in
                    DSChip(option, size: .large, isSelected: Binding(
                        get: { selectedOptions.contains(option) },
                        set: { isOn in
                            if isOn { selectedOptions.insert(option) } else { selectedOptions.remove(option) }
                        }
                    ))
                }
            }
            // Chips sit in a padded content block, unlike the checkbox rows
            // which carry their own padding.
            .padding(.bottom, DSSpacing.m)
        } label: {
            HStack(spacing: DSSpacing.s) {
                Text(title).dsFont(.bodyM).foregroundStyle(DSColor.black)
                if !selectedOptions.isEmpty {
                    DSBadge(.accordion(count: selectedOptions.count))
                }
                Spacer(minLength: 0)
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel(selectedOptions.isEmpty ? title : "\(title), 已選 \(selectedOptions.count) 項")
        }
        .disclosureGroupStyle(DSDisclosureStyle())
    }
}

/// Minimal wrapping row layout (iOS 16+ `Layout` protocol) used to flow chip
/// options onto multiple lines — SwiftUI has no built-in wrapping HStack.
public struct DSFlowLayout: Layout {
    let spacing: CGFloat

    public init(spacing: CGFloat = 8) {
        self.spacing = spacing
    }

    public func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let maxWidth = proposal.width ?? .infinity
        var rowWidth: CGFloat = 0
        var totalHeight: CGFloat = 0
        var rowHeight: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if rowWidth + size.width > maxWidth, rowWidth > 0 {
                totalHeight += rowHeight + spacing
                rowWidth = 0
                rowHeight = 0
            }
            rowWidth += size.width + (rowWidth > 0 ? spacing : 0)
            rowHeight = max(rowHeight, size.height)
        }
        totalHeight += rowHeight
        return CGSize(width: maxWidth.isFinite ? maxWidth : rowWidth, height: totalHeight)
    }

    public func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var origin = bounds.origin
        var rowHeight: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if origin.x + size.width > bounds.maxX, origin.x > bounds.minX {
                origin.x = bounds.minX
                origin.y += rowHeight + spacing
                rowHeight = 0
            }
            subview.place(at: origin, proposal: .unspecified)
            origin.x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
    }
}

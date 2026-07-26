import SwiftUI

/// Native port of `collapse-text.md`. The full text is always present in
/// the view tree (only `lineLimit` changes), so VoiceOver users are never
/// blocked from the complete text regardless of the visual clamp — matching
/// the spec's accessibility requirement directly.
public struct DSCollapseText: View {
    private let text: String
    private let collapsedLineLimit: Int
    @State private var isExpanded = false

    public init(_ text: String, collapsedLineLimit: Int = 3) {
        self.text = text
        self.collapsedLineLimit = collapsedLineLimit
    }

    public var body: some View {
        // Figma: 24pt horizontal insets, no gap between the copy and the
        // affordance, and the affordance is a full-width centred row labelled
        // 閱讀全文 with the brand 14pt chevron.
        VStack(spacing: DSSpacing.none) {
            Text(text)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.gray800)
                .lineLimit(isExpanded ? nil : collapsedLineLimit)
                .frame(maxWidth: .infinity, alignment: .leading)

            Button {
                isExpanded.toggle()
            } label: {
                HStack(spacing: DSSpacing.xs) {
                    Text(isExpanded ? "收合" : "閱讀全文")
                    DSIconView(.chevron)
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }
                .dsFont(.bodyM)
                .fontWeight(.semibold)
                .foregroundStyle(DSColor.primaryGreen800)
                .frame(maxWidth: .infinity)
                .padding(.vertical, DSSpacing.s)
                .background(DSColor.white)
            }
            .dsAnimation(DSMotion.standard, value: isExpanded)
            .accessibilityLabel(isExpanded ? "收合" : "閱讀全文")
        }
        .padding(.horizontal, DSSpacing.lm)
    }
}

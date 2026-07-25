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
        VStack(alignment: .leading, spacing: DSSpacing.xs) {
            Text(text)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.gray800)
                .lineLimit(isExpanded ? nil : collapsedLineLimit)

            Button {
                isExpanded.toggle()
            } label: {
                HStack(spacing: DSSpacing.xs) {
                    Text(isExpanded ? "顯示較少" : "顯示更多")
                    Image(systemName: "chevron.down")
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }
                .dsFont(.bodyM)
                .fontWeight(.semibold)
                .foregroundStyle(DSColor.primaryGreen800)
            }
            .dsAnimation(DSMotion.standard, value: isExpanded)
            .accessibilityLabel(isExpanded ? "顯示較少" : "顯示更多")
        }
    }
}

import SwiftUI

/// Native port of `payment-info.md`, built on `LabeledContent` (native
/// SwiftUI label+value row, iOS 16+) for each line item — a direct native
/// fit for exactly this pattern.
public struct DSPaymentLineItem: Identifiable {
    public let id = UUID()
    public let label: String
    public let value: String
    public init(label: String, value: String) {
        self.label = label
        self.value = value
    }
}

public struct DSPaymentInfo: View {
    private let title: String
    private let lineItems: [DSPaymentLineItem]
    private let total: String
    private let isSelected: Bool

    public init(title: String, lineItems: [DSPaymentLineItem], total: String, isSelected: Bool = false) {
        self.title = title
        self.lineItems = lineItems
        self.total = total
        self.isSelected = isSelected
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.sm) {
            Text(title)
                .dsFont(.bodyM)
                .fontWeight(.semibold)
                .foregroundStyle(DSColor.black)

            ForEach(lineItems) { item in
                LabeledContent(item.label, value: item.value)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.gray800)
            }

            Divider()

            LabeledContent("總計") {
                Text(total)
            }
            .dsFont(.headline3)
            .fontWeight(.semibold)
            .foregroundStyle(DSColor.black)
        }
        .padding(DSSpacing.lm)
        .overlay(
            RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
                .strokeBorder(isSelected ? DSColor.primaryGreen800 : .clear, lineWidth: 2)
        )
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

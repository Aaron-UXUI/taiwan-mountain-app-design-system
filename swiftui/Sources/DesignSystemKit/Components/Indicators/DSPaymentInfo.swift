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
        // In Figma the two states differ by *what is shown*, not by a border:
        // Selected reveals the scene title and the line-item breakdown above
        // the total, Unselected collapses to the total alone. The previous
        // version always showed everything and drew a green outline instead,
        // which is not in the design at all.
        HStack(alignment: .top) {
            if isSelected {
                VStack(alignment: .leading, spacing: DSSpacing.s) {
                    Text(title)
                        .dsFont(.bodyM)
                        .fontWeight(.semibold)
                        .foregroundStyle(DSColor.black)

                    VStack(alignment: .leading, spacing: DSSpacing.xs) {
                        ForEach(lineItems) { item in
                            Text(item.label)
                                .dsFont(.bodyS)
                                .foregroundStyle(DSColor.gray800)
                        }
                    }
                }
                Spacer(minLength: DSSpacing.m)
            } else {
                Spacer(minLength: 0)
            }

            Text(total)
                .dsFont(.headline1)
                .foregroundStyle(DSColor.black)
        }
        .padding(DSSpacing.lm)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

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
    private let currency: String
    private let total: String
    private let isSelected: Bool

    /// `total` is the bare amount ("425"); `currency` is the symbol Figma sets
    /// alongside it in its own, smaller type style.
    public init(
        title: String,
        lineItems: [DSPaymentLineItem],
        currency: String = "NT$",
        total: String,
        isSelected: Bool = false
    ) {
        self.title = title
        self.lineItems = lineItems
        self.currency = currency
        self.total = total
        self.isSelected = isSelected
    }

    public var body: some View {
        // In Figma the two states differ by *what is shown*, not by a border:
        // Selected reveals the scene title and the line-item breakdown above
        // the total, Unselected collapses to the total alone. The previous
        // version always showed everything and drew a green outline instead,
        // which is not in the design at all.
        //
        // The price is two type styles baseline-aligned, not one: the currency
        // symbol is Headline/3 semibold and the amount Headline/1 regular.
        HStack(alignment: .bottom, spacing: DSSpacing.sm) {
            if isSelected {
                VStack(alignment: .leading, spacing: DSSpacing.sm) {
                    Text(title)
                        .dsFont(.bodyM)
                        .fontWeight(.semibold)
                        .foregroundStyle(DSColor.black)

                    // The breakdown lines run flush against each other.
                    VStack(alignment: .leading, spacing: 0) {
                        ForEach(lineItems) { item in
                            Text(item.label)
                                .dsFont(.bodyS)
                                .foregroundStyle(DSColor.gray800)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            } else {
                Spacer(minLength: 0)
            }

            HStack(alignment: .firstTextBaseline, spacing: DSSpacing.xs) {
                Text(currency)
                    .dsFont(.headline3)
                Text(total)
                    .dsFont(.headline1)
            }
            .foregroundStyle(DSColor.black)
        }
        .padding(.horizontal, DSSpacing.lm)
        .padding(.top, DSSpacing.sm)
        .padding(.bottom, DSSpacing.m)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

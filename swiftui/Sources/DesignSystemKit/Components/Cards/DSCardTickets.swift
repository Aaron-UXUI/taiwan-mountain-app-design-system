import SwiftUI

/// Native port of `card-tickets.md`. The Disabled state uses `.disabled(_:)`
/// plus reduced opacity — content remains present (not hidden) for
/// assistive technology, matching the spec's "informational, not hidden"
/// accessibility note.
public struct DSCardTickets: View {
    private let scene: String
    private let ticketType: String
    private let additionalItem: String?
    private let due: String
    private let price: String
    private let isDisabled: Bool

    public init(scene: String, ticketType: String, additionalItem: String? = nil, due: String, price: String, isDisabled: Bool = false) {
        self.scene = scene
        self.ticketType = ticketType
        self.additionalItem = additionalItem
        self.due = due
        self.price = price
        self.isDisabled = isDisabled
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.s) {
            Text(scene)
                .dsFont(.bodyM)
                .fontWeight(.semibold)
                .foregroundStyle(DSColor.black)

            HStack {
                VStack(alignment: .leading, spacing: DSSpacing.xs) {
                    Text(ticketType).dsFont(.bodyM).foregroundStyle(DSColor.gray800)
                    if let additionalItem {
                        Text(additionalItem).dsFont(.bodyS).foregroundStyle(DSColor.gray800)
                    }
                }
                Spacer()
                Text(price)
                    .dsFont(.bodyM)
                    .fontWeight(.semibold)
                    .foregroundStyle(DSColor.primaryGreen700)
            }

            Divider()

            Text(due)
                .dsFont(.bodyS)
                .foregroundStyle(DSColor.gray800)
        }
        .padding(DSSpacing.m)
        .background(DSColor.white)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.m, style: .continuous))
        .opacity(isDisabled ? 0.4 : 1)
        .disabled(isDisabled)
    }
}

import SwiftUI

/// Native port of `card-tickets.md` — Figma `Cards / Tickets` (node 1373:16817).
///
/// The Disabled state keeps its content readable to assistive technology
/// (informational, not hidden) while greying it visually, and adds the
/// "已使用" marker Figma shows in the header.
public struct DSCardTickets: View {
    private let scene: String
    private let ticketLines: [String]
    private let due: String
    private let price: String
    private let isDisabled: Bool

    public init(
        scene: String,
        ticketLines: [String],
        due: String,
        price: String,
        isDisabled: Bool = false
    ) {
        self.scene = scene
        self.ticketLines = ticketLines
        self.due = due
        self.price = price
        self.isDisabled = isDisabled
    }

    private var ink: Color { isDisabled ? DSColor.gray400 : DSColor.black }
    private var subInk: Color { isDisabled ? DSColor.gray400 : DSColor.gray800 }

    public var body: some View {
        HStack(spacing: 0) {
            // Figma anchors the card with a solid brand-green stub down the
            // leading edge; it greys out along with everything else when used.
            Rectangle()
                .fill(isDisabled ? DSColor.gray400 : DSColor.primaryGreen800)
                .frame(width: 8)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: DSSpacing.sm) {
                // Header: expiry on the left, "已使用" on the right when spent.
                HStack {
                    Text("使用期限 \(due)")
                        .dsFont(.bodyS)
                        .foregroundStyle(subInk)
                    Spacer(minLength: DSSpacing.s)
                    if isDisabled {
                        Text("已使用")
                            .dsFont(.bodyS)
                            .foregroundStyle(subInk)
                    }
                }

                Divider()

                Text(scene)
                    .dsFont(.bodyM)
                    .fontWeight(.semibold)
                    .foregroundStyle(ink)

                HStack(alignment: .bottom) {
                    VStack(alignment: .leading, spacing: DSSpacing.xs) {
                        ForEach(ticketLines, id: \.self) { line in
                            Text(line)
                                .dsFont(.bodyS)
                                .foregroundStyle(subInk)
                        }
                    }
                    Spacer(minLength: DSSpacing.m)
                    Text(price)
                        .dsFont(.bodyM)
                        .foregroundStyle(ink)
                }
            }
            .padding(DSSpacing.m)
        }
        .background(DSColor.white)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
                .strokeBorder(DSColor.gray200, lineWidth: 1)
        )
        .disabled(isDisabled)
    }
}

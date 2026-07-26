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

    /// Figma greys the whole card to gray-400 when used; otherwise each line
    /// keeps its own ink (scene = brand green, ticket lines = black,
    /// price/expiry = grey).
    private func ink(_ enabled: Color) -> Color { isDisabled ? DSColor.gray400 : enabled }

    /// The ticket silhouette: a 4pt radius on the stub side and a 16pt radius
    /// on the open side, so the two edges of the card do not match.
    private var shape: some InsettableShape {
        UnevenRoundedRectangle(
            topLeadingRadius: DSRadius.xxs,
            bottomLeadingRadius: DSRadius.xxs,
            bottomTrailingRadius: DSRadius.m,
            topTrailingRadius: DSRadius.m,
            style: .continuous
        )
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.s) {
            // Header: expiry on the left, "已使用" on the right when spent.
            HStack(spacing: DSSpacing.s) {
                Text("使用期限 \(due)")
                    .dsFont(.bodyS)
                    .foregroundStyle(ink(DSColor.black))
                Spacer(minLength: 0)
                if isDisabled {
                    Text("已使用")
                        .dsFont(.bodyS)
                        .foregroundStyle(DSColor.gray400)
                }
            }

            Divider()

            HStack(alignment: .bottom, spacing: DSSpacing.sm) {
                VStack(alignment: .leading, spacing: DSSpacing.xs) {
                    Text(scene)
                        .dsFont(.bodyM)
                        .fontWeight(.semibold)
                        .foregroundStyle(ink(DSColor.primaryGreen800))
                    // Ticket lines run flush against each other in Figma.
                    VStack(alignment: .leading, spacing: 0) {
                        ForEach(ticketLines, id: \.self) { line in
                            Text(line)
                                .dsFont(.bodyS)
                                .foregroundStyle(ink(DSColor.black))
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                }
                Text(price)
                    .dsFont(.bodyS)
                    .foregroundStyle(ink(DSColor.gray800))
            }
        }
        .padding(DSSpacing.m)
        .frame(maxWidth: 360, alignment: .leading)
        .background(DSColor.white, in: shape)
        .overlay(alignment: .leading) {
            // Figma anchors the card with a 6pt stub down the leading edge,
            // inset from the top and bottom rather than running full height.
            Rectangle()
                .fill(ink(DSColor.primaryGreen700))
                .frame(width: 6)
                .padding(.vertical, DSSpacing.s)
                .accessibilityHidden(true)
        }
        .clipShape(shape)
        .overlay {
            shape.strokeBorder(ink(DSColor.primaryGreen700), lineWidth: 1)
        }
        .disabled(isDisabled)
    }
}

import SwiftUI

/// Native port of `offline-map.md` — Figma `OfflineMap` (node 16343:7890).
///
/// Figma is **not** a card: it is a stack of per-carrier rows, each one
/// "[carrier mark] [carrier name] [coloured coverage pill]", with a 14pt
/// chevron on the first row that expands the rest. The earlier port wrapped a
/// single summary pill in a white, padded, rounded card and listed the
/// carriers underneath as SF-Symbol "有訊號 / 無訊號" rows — neither the card
/// nor that row format exists in the design.

/// Figma `Signal Missing=None | Some | Most` (node 16343:7890).
/// `noneMissing` means nothing is missing — every area is stable.
public enum DSSignalCoverage: CaseIterable {
    case noneMissing, someMissing, mostMissing

    var summary: String {
        switch self {
        case .noneMissing: return "全部區域皆穩定"
        case .someMissing: return "部分區域不穩定"
        case .mostMissing: return "多數區域不穩定"
        }
    }

    var tint: Color {
        switch self {
        case .noneMissing: return DSColor.success700
        case .someMissing: return DSColor.accentYellow700
        case .mostMissing: return DSColor.destruct700
        }
    }
}

public struct DSCarrierCoverage: Identifiable {
    public let id = UUID()
    public let name: String
    public let coverage: DSSignalCoverage

    public init(name: String, coverage: DSSignalCoverage) {
        self.name = name
        self.coverage = coverage
    }
}

public struct DSOfflineMapCard: View {
    /// The first entry is Figma's "Main Container" — the always-visible row
    /// that carries the disclosure chevron; the rest are the "Side Container"
    /// rows revealed on expand.
    private let carriers: [DSCarrierCoverage]
    @Binding private var isExpanded: Bool

    public init(carriers: [DSCarrierCoverage], isExpanded: Binding<Bool>) {
        self.carriers = carriers
        self._isExpanded = isExpanded
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.xs) {
            ForEach(Array(carriers.enumerated()), id: \.element.id) { index, carrier in
                if index == 0 {
                    // Only wrap the main row in a Button when there is
                    // something to disclose — a disabled Button would dim the
                    // whole row, and Figma's single-carrier variants are drawn
                    // at full strength.
                    if carriers.count > 1 {
                        Button {
                            isExpanded.toggle()
                        } label: {
                            row(carrier, showsChevron: true)
                        }
                        .buttonStyle(.plain)
                        .accessibilityHint(isExpanded ? "收合其他電信訊號" : "展開其他電信訊號")
                    } else {
                        row(carrier, showsChevron: false)
                    }
                } else if isExpanded {
                    row(carrier, showsChevron: false)
                }
            }
        }
        .dsAnimation(DSMotion.standard, value: isExpanded)
    }

    private func row(_ carrier: DSCarrierCoverage, showsChevron: Bool) -> some View {
        HStack(spacing: DSSpacing.s) {
            HStack(spacing: DSSpacing.xs) {
                carrierMark
                Text("\(carrier.name)網路訊號")
                    .dsFont(.bodyM)
                    .foregroundStyle(DSColor.gray800)
                    .frame(width: 126, alignment: .leading)
            }
            .padding(.vertical, DSSpacing.xs)

            Text(carrier.coverage.summary)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.white)
                .padding(.horizontal, DSSpacing.sm)
                .padding(.vertical, DSSpacing.xs)
                .background(carrier.coverage.tint, in: RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))

            if showsChevron {
                DSIconView(.chevron)
                    .rotationEffect(.degrees(isExpanded ? 180 : 0))
                    .foregroundStyle(DSColor.black)
                    .accessibilityHidden(true)
            }
        }
        .padding(.vertical, DSSpacing.xs)
        .contentShape(Rectangle())
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(carrier.name)網路訊號,\(carrier.coverage.summary)")
    }

    /// Figma shows the carriers' real trademarks in a 20×14 slot. Those are not
    /// this project's marks to reproduce — the same call already made for
    /// `DSLogo` / `DSPaymentBrandBadge` — so the slot keeps its exact geometry
    /// and stays neutral; the carrier name beside it carries the meaning.
    private var carrierMark: some View {
        RoundedRectangle(cornerRadius: 2, style: .continuous)
            .fill(DSColor.gray100)
            .frame(width: 20, height: 14)
            .accessibilityHidden(true)
    }
}

import SwiftUI

/// Native port of `offline-map.md`, built on `DisclosureGroup`.
public struct DSCarrierCoverage: Identifiable {
    public let id = UUID()
    public let name: String
    public let hasSignal: Bool
    public init(name: String, hasSignal: Bool) {
        self.name = name
        self.hasSignal = hasSignal
    }
}

/// Figma `Signal Missing=None | Some | Most` (node 16343:7890).
/// `none` means nothing is missing — every area is stable.
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

public struct DSOfflineMapCard: View {
    private let coverage: DSSignalCoverage
    private let carriers: [DSCarrierCoverage]
    @Binding private var isExpanded: Bool

    public init(coverage: DSSignalCoverage, carriers: [DSCarrierCoverage], isExpanded: Binding<Bool>) {
        self.coverage = coverage
        self.carriers = carriers
        self._isExpanded = isExpanded
    }

    public var body: some View {
        DisclosureGroup(isExpanded: $isExpanded) {
            VStack(alignment: .leading, spacing: DSSpacing.xs) {
                ForEach(carriers) { carrier in
                    HStack {
                        Text(carrier.name).dsFont(.bodyM).foregroundStyle(DSColor.gray800)
                        Spacer()
                        Image(systemName: carrier.hasSignal ? "checkmark.circle.fill" : "exclamationmark.triangle.fill")
                            .foregroundStyle(carrier.hasSignal ? DSColor.success700 : DSColor.accentYellow700)
                            .accessibilityHidden(true)
                        Text(carrier.hasSignal ? "有訊號" : "無訊號")
                            .dsFont(.bodyS)
                            .foregroundStyle(DSColor.gray800)
                    }
                }
            }
            .padding(.top, DSSpacing.xs)
            .padding(.horizontal, DSSpacing.s)
            .background(DSColor.gray100)
        } label: {
            Text(coverage.summary)
                .dsFont(.bodyM)
                .fontWeight(.semibold)
                .foregroundStyle(DSColor.white)
                .padding(.horizontal, DSSpacing.s)
                .padding(.vertical, DSSpacing.xs)
                .background(coverage.tint)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
        }
        .padding(DSSpacing.s)
        .background(DSColor.white)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
    }
}

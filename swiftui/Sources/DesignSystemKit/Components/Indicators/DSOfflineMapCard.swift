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

public enum DSSignalCoverage {
    case someMissing, mostMissing

    var summary: String {
        switch self {
        case .someMissing: return "部分電信商無訊號"
        case .mostMissing: return "大部分電信商無訊號"
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
                .foregroundStyle(DSColor.gray800)
        }
        .padding(DSSpacing.s)
        .background(DSColor.white)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
    }
}

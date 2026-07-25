import SwiftUI

/// Native ports of `crowdedness.md` and `label.md`. Both are plain status
/// tags; the visible text is always the primary carrier of meaning (never
/// color alone), matching each spec's accessibility requirement directly —
/// no extra work needed since the label text already satisfies it.

public enum DSCrowdednessLevel {
    case comfortable, partial, crowded

    var text: String {
        switch self {
        case .comfortable: return "舒適"
        case .partial: return "部分擁擠"
        case .crowded: return "擁擠"
        }
    }

    var tint: Color {
        switch self {
        case .comfortable: return DSColor.success700
        case .partial: return DSColor.accentYellow700
        case .crowded: return DSColor.destruct700
        }
    }
}

public struct DSCrowdednessTag: View {
    private let level: DSCrowdednessLevel

    public init(level: DSCrowdednessLevel) {
        self.level = level
    }

    public var body: some View {
        Text(level.text)
            .dsFont(.bodyM)
            .foregroundStyle(DSColor.gray800)
            .padding(.vertical, DSSpacing.xs)
            .padding(.horizontal, DSSpacing.sm)
            .background(DSColor.white)
            .overlay(Capsule().strokeBorder(level.tint, lineWidth: 1))
            .clipShape(Capsule())
    }
}

public enum DSOperatingStatus {
    case open, partial, closed

    var text: String {
        switch self {
        case .open: return "開放中"
        case .partial: return "部分開放"
        case .closed: return "已關閉"
        }
    }

    var fill: Color {
        switch self {
        case .open: return DSColor.primaryGreen900
        case .partial: return DSColor.accentYellow900
        case .closed: return DSColor.destruct700
        }
    }
}

public struct DSStatusLabel: View {
    private let status: DSOperatingStatus

    public init(_ status: DSOperatingStatus) {
        self.status = status
    }

    public var body: some View {
        Text(status.text)
            .dsFont(.bodyS)
            .foregroundStyle(DSColor.white)
            .padding(DSSpacing.xs)
            .background(status.fill)
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
    }
}

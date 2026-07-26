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

/// Figma `Crowdedness` (node 15975:7322) is a caption followed by a **solid**
/// status pill — white label on the level's own fill, 8pt radius, 12/4
/// padding. The earlier version drew a white pill with a coloured border and
/// grey text, and omitted the caption entirely.
public struct DSCrowdednessTag: View {
    private let level: DSCrowdednessLevel
    private let caption: String?

    public init(level: DSCrowdednessLevel, caption: String? = "即時人潮狀況") {
        self.level = level
        self.caption = caption
    }

    public var body: some View {
        HStack(spacing: DSSpacing.s) {
            if let caption {
                Text(caption)
                    .dsFont(.bodyM)
                    .foregroundStyle(DSColor.gray800)
            }
            Text(level.text)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.white)
                .padding(.horizontal, DSSpacing.sm)
                .padding(.vertical, DSSpacing.xs)
                .background(level.tint)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
        }
        .padding(.vertical, DSSpacing.xs)
        .accessibilityElement(children: .combine)
    }
}

/// Figma `Label` (node 9037:15126) — `State=Open / Partial / Close / family`.
///
/// `family` was previously missing here: the spec listed only the first three
/// and hand-waved the fourth as "additional related states … follow the same
/// pattern", so this enum was built without it while React shipped all four.
/// Verified against the Figma component directly.
public enum DSOperatingStatus: CaseIterable {
    case open, partial, closed, familyFriendly

    var text: String {
        switch self {
        case .open: return "今日開放"
        case .partial: return "部分開放"
        case .closed: return "暫停開放"
        case .familyFriendly: return "親子友善"
        }
    }

    var fill: Color {
        switch self {
        // Open and Partial deliberately share one fill in Figma — the earlier
        // value here (accent yellow for Partial) was actually `family`'s.
        case .open, .partial: return DSColor.primaryGreen900
        case .closed: return DSColor.destruct700
        case .familyFriendly: return DSColor.accentYellow900
        }
    }
}

public struct DSStatusLabel: View {
    private let status: DSOperatingStatus

    public init(_ status: DSOperatingStatus) {
        self.status = status
    }

    public var body: some View {
        // Figma renders the label at 95% opacity over a blurred backdrop —
        // these sit on top of photography, so they are never fully opaque.
        Text(status.text)
            .dsFont(.bodyS)
            .foregroundStyle(DSColor.white)
            .padding(DSSpacing.xs)
            .background(status.fill, in: RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
            .opacity(0.95)
    }
}

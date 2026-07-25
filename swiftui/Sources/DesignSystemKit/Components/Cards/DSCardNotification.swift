import SwiftUI

/// Native port of `card-notification.md`. The unread dot is decorative
/// (`.accessibilityHidden`); "unread" is instead folded into the row's own
/// accessible label, matching the spec's requirement that unread status
/// never be conveyed by shape/color alone.
public struct DSCardNotification: View {
    private let headline: String
    private let body_: String
    private let time: String
    private let isUnread: Bool

    public init(headline: String, body: String, time: String, isUnread: Bool = false) {
        self.headline = headline
        self.body_ = body
        self.time = time
        self.isUnread = isUnread
    }

    public var body: some View {
        HStack(alignment: .top, spacing: DSSpacing.s) {
            if isUnread {
                Circle()
                    .fill(DSColor.destruct600)
                    .frame(width: 8, height: 8)
                    .padding(.top, 6)
                    .accessibilityHidden(true)
            }
            VStack(alignment: .leading, spacing: DSSpacing.xs) {
                Text(headline)
                    .dsFont(.bodyM)
                    .fontWeight(.semibold)
                    .foregroundStyle(DSColor.black)
                Text(body_)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.gray800)
                Text(time)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.gray400)
            }
        }
        .padding(DSSpacing.m)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(isUnread ? "未讀,\(headline)" : headline)
    }
}

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
        // Figma is a bordered white card: the timestamp sits at the *end of
        // the headline row*, not on a line of its own below the body, and the
        // unread marker is a 6pt dot straddling the leading border rather than
        // an 8pt dot inset in the content flow.
        VStack(alignment: .leading, spacing: DSSpacing.s) {
            HStack(alignment: .top, spacing: DSSpacing.sm) {
                Text(headline)
                    .dsFont(.bodyM)
                    .fontWeight(.semibold)
                    .foregroundStyle(DSColor.black)
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text(time)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.gray800)
            }
            Text(body_)
                .dsFont(.bodyS)
                .foregroundStyle(DSColor.gray800)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(DSSpacing.m)
        .frame(maxWidth: 360, alignment: .leading)
        .background(DSColor.white, in: RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
                .strokeBorder(DSColor.gray200, lineWidth: 1)
        }
        .overlay(alignment: .topLeading) {
            if isUnread {
                // Figma centres the 6pt indicator in a 30x18 badge slot
                // pinned at left:-1 / top:7 — so the dot lands at 11 / 13,
                // inside the card's leading padding rather than straddling
                // the border.
                Circle()
                    .fill(DSColor.destruct700)
                    .frame(width: 6, height: 6)
                    .offset(x: 11, y: 13)
                    .accessibilityHidden(true)
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(isUnread ? "未讀,\(headline)" : headline)
    }
}

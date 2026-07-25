import SwiftUI

/// Native port of `badge.md`. Hidden from accessibility by default: per the
/// spec, a badge's value must be folded into its *host* element's accessible
/// name/description rather than exposed as its own disconnected node — call
/// sites (see `DSAccordionCheckBox`, `DSTabBar`, `DSCheckBoxNavigation`) set
/// that label explicitly.
///
/// The spec's two variant axes map here as:
/// - `for: Accordion | Notification` → `Kind.accordion | .notification`
///   (selects the fill: brand green vs. alert red)
/// - `attribute: Small | Large | Maximum` → `Size.small | .large | .maximum`
///   where `.small` on a Notification badge is the dot form (no number),
///   and `.maximum` caps the count at "99+".
public struct DSBadge: View {
    public enum Kind { case accordion, notification }
    public enum Size { case small, large, maximum }

    private let count: Int
    private let kind: Kind
    private let size: Size

    public init(count: Int, kind: Kind = .accordion, size: Size = .large) {
        self.count = count
        self.kind = kind
        self.size = size
    }

    /// The dot form — `for: Notification` + `attribute: Small` in the spec.
    /// Carries no number; the meaning ("has unread items") must be folded
    /// into the host's accessible label.
    public static var dot: DSBadge { DSBadge(count: 0, kind: .notification, size: .small) }

    private var isDot: Bool { kind == .notification && size == .small }

    private var fill: Color {
        kind == .notification ? DSColor.destruct700 : DSColor.primaryGreen800
    }

    public var body: some View {
        Group {
            if isDot {
                Circle()
                    .fill(fill)
                    .frame(width: 6, height: 6)
            } else {
                Text(size == .maximum || count > 99 ? "99+" : "\(count)")
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.white)
                    .padding(.horizontal, DSSpacing.xs)
                    .padding(.vertical, 2)
                    .background(fill)
                    .clipShape(Capsule())
            }
        }
        .accessibilityHidden(true)
    }
}

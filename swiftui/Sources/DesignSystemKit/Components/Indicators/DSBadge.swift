import SwiftUI

/// Native port of `badge.md` — Figma `Badge` (node 8233:6131).
///
/// Hidden from accessibility by default: per the spec, a badge's value must be
/// folded into its *host* element's accessible name/description rather than
/// exposed as its own disconnected node — call sites (see `DSAccordionCheckBox`,
/// `DSTabBar`) set that label explicitly.
///
/// Figma authors 4 of the 6 `Attribute × For` combinations, so this is a single
/// `Variant` enum rather than two free axes: `Large/Accordion` and
/// `Maximum/Accordion` do not exist in the design, and are now unrepresentable
/// instead of merely undocumented.
public struct DSBadge: View {
    public enum Variant: Equatable {
        /// `Attribute=Small, For?=Accordion` — counted pill, brand green.
        case accordion(count: Int)
        /// `Attribute=Small, For?=Notification` — the bare dot. Carries no
        /// number; the meaning ("has unread items") must be folded into the
        /// host's accessible label.
        case notificationDot
        /// `Attribute=Large, For?=Notification` — counted pill, alert red.
        case notification(count: Int)
        /// `Attribute=Maximum, For?=Notification` — the capped "99+" form.
        case notificationMaximum
    }

    private let variant: Variant

    public init(_ variant: Variant) {
        self.variant = variant
    }

    /// Convenience for the dot form.
    public static var dot: DSBadge { DSBadge(.notificationDot) }

    private var fill: Color {
        switch variant {
        case .accordion: return DSColor.primaryGreen800
        case .notificationDot, .notification, .notificationMaximum: return DSColor.destruct700
        }
    }

    /// `nil` for the dot, which shows no number at all.
    private var text: String? {
        switch variant {
        case .notificationDot: return nil
        case .notificationMaximum: return "99+"
        case .accordion(let count), .notification(let count):
            return count > 99 ? "99+" : "\(count)"
        }
    }

    public var body: some View {
        Group {
            if let text {
                // Figma sizes the counter pill at a fixed 18pt with 4pt of
                // horizontal padding and no vertical padding, so a single
                // digit reads as a circle rather than a squat capsule.
                Text(text)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.white)
                    .padding(.horizontal, DSSpacing.xs)
                    .frame(minWidth: 18, minHeight: 18)
                    .background(fill)
                    .clipShape(Capsule())
            } else {
                Circle()
                    .fill(fill)
                    .frame(width: 6, height: 6)
            }
        }
        .accessibilityHidden(true)
    }
}

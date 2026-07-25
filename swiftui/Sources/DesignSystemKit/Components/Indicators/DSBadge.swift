import SwiftUI

/// Native port of `badge.md`. Hidden from accessibility by default: per the
/// spec, a badge's value must be folded into its *host* element's accessible
/// name/description rather than exposed as its own disconnected node — call
/// sites (see `DSAccordionCheckBox`, `DSTabBar`) set that label explicitly.
public struct DSBadge: View {
    public enum Style { case normal, alert }

    private let count: Int
    private let style: Style

    public init(count: Int, style: Style = .normal) {
        self.count = count
        self.style = style
    }

    public var body: some View {
        Text(count > 99 ? "99+" : "\(count)")
            .dsFont(.bodyS)
            .foregroundStyle(DSColor.white)
            .padding(.horizontal, DSSpacing.xs)
            .padding(.vertical, 2)
            .background(style == .alert ? DSColor.destruct700 : DSColor.primaryGreen800)
            .clipShape(Capsule())
            .accessibilityHidden(true)
    }
}

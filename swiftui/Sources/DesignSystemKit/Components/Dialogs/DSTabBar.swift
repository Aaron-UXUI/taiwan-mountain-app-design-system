import SwiftUI

/// Native port of `tab.md`. This is a *content* tab set (e.g. category
/// switcher within a screen) — distinct from the app's top-level
/// `NavigationBar`, which maps onto `TabView` in the Navigation category.
/// SwiftUI has no built-in "underline tab bar" control, so this uses a
/// `matchedGeometryEffect`-driven sliding indicator, the standard native
/// technique for this exact pattern (as seen in Music/App Store's own
/// category tabs).
public struct DSTab: Identifiable, Hashable {
    public let id: String
    public let title: String
    public let badgeCount: Int?

    public init(id: String, title: String, badgeCount: Int? = nil) {
        self.id = id
        self.title = title
        self.badgeCount = badgeCount
    }
}

public enum DSTabBarSize {
    case small, medium, large

    /// Figma runs Small and Medium at the same body/L (14pt) size — they
    /// differ only in slot width — and steps up to Headline/4 (16pt) at Large.
    /// Small was rendering at 12pt here.
    var typeStyle: DSTypeStyle {
        switch self {
        case .small, .medium: return .bodyM
        case .large: return .bodyL
        }
    }

    /// Figma's fixed slot widths (75 / 93.75 / 187.5) with their padding.
    var horizontalPadding: CGFloat {
        switch self {
        case .small: return DSSpacing.xs
        case .medium, .large: return DSSpacing.m
        }
    }
}

public struct DSTabBar: View {
    private let tabs: [DSTab]
    @Binding private var selection: String
    private let size: DSTabBarSize
    @Namespace private var indicatorNamespace

    public init(tabs: [DSTab], selection: Binding<String>, size: DSTabBarSize = .medium) {
        self.tabs = tabs
        self._selection = selection
        self.size = size
    }

    public var body: some View {
        // Figma butts the tabs directly against each other so their 1pt
        // baseline rule reads as one continuous line; there is no gutter.
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 0) {
                ForEach(tabs) { tab in
                    tabButton(tab)
                }
            }
        }
        .accessibilityElement(children: .contain)
    }

    private func tabButton(_ tab: DSTab) -> some View {
        let isActive = tab.id == selection
        return Button {
            selection = tab.id
        } label: {
            // Figma fixes every tab at 44pt tall and draws the rule as an
            // *inset* bottom border, so the label stays vertically centred in
            // the full 44pt rather than being pushed up by the rule.
            HStack(spacing: DSSpacing.xs) {
                Text(tab.title)
                if let count = tab.badgeCount {
                    // Spec `tab.md` maps the tab badge to the
                    // error-adjacent `semantic.destruct-700` fill (matching
                    // the React `.tmads-tab__badge` rule), i.e. the
                    // Notification kind — not the default Accordion green.
                    DSBadge(count: count, kind: .notification)
                }
            }
            .dsFont(size.typeStyle)
            .fontWeight(isActive ? .semibold : .regular)
            .foregroundStyle(isActive ? DSColor.primaryGreen900 : DSColor.gray800)
            .padding(.horizontal, size.horizontalPadding)
            .frame(height: 44)
            .frame(maxWidth: .infinity)
            .background(DSColor.white)
            .overlay(alignment: .bottom) {
                // Figma underlines every tab: the inactive rule is a hairline
                // in grey-200, the active one a 2pt green-800 bar sitting on
                // top of it. Only the active rule was drawn before, and in
                // green-900 rather than green-800.
                ZStack(alignment: .bottom) {
                    DSColor.gray200.frame(height: 1)
                    if isActive {
                        DSColor.primaryGreen800
                            .frame(height: 2)
                            .matchedGeometryEffect(id: "indicator", in: indicatorNamespace)
                    }
                }
                .frame(height: 2)
            }
        }
        .buttonStyle(.plain)
        .dsAnimation(DSMotion.standard, value: selection)
        .accessibilityLabel(tab.badgeCount.map { "\(tab.title), \($0) 項" } ?? tab.title)
        .accessibilityAddTraits(isActive ? [.isSelected, .isButton] : .isButton)
    }
}

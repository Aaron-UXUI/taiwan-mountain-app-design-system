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

    var typeStyle: DSTypeStyle {
        switch self {
        case .small: return .bodyS
        case .medium: return .bodyM
        case .large: return .bodyL
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
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: DSSpacing.m) {
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
            VStack(spacing: DSSpacing.xs) {
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

                // Figma underlines every tab: the inactive rule is a hairline
                // in the label's own grey, the active one is thicker and
                // matches its green-900 label. Only the active rule was drawn
                // before, and in the wrong green.
                ZStack {
                    DSColor.gray200.frame(height: 1)
                    if isActive {
                        DSColor.primaryGreen900
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

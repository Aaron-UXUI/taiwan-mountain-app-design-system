import SwiftUI

/// Native port of `navigation-bar.md` — the app's persistent bottom
/// navigation. This maps directly onto SwiftUI's `TabView`: the
/// current-page indicator, icon+label pairing, and unread badge are all
/// native (`.tabItem` + `.badge(_:)`). `check-box-navigation.md` has no
/// separate SwiftUI component: TabView only reads an image + text out of
/// whatever is passed to `.tabItem` and draws its own chrome around them, so
/// a custom-styled tab item would have its styling discarded here anyway.
///
/// Figma's `Navigation Bar` is drawn for the web/Android side and is not an
/// iOS tab bar, so it is deliberately **not** reproduced here — the platform
/// control wins. The one thing that does not carry over is the two-tone
/// colour scheme: `.tint(_:)` reaches only the selected item, and iOS 26's
/// floating tab bar ignores `UITabBarAppearance.stackedLayoutAppearance`
/// and `unselectedItemTintColor` alike (measured on 26.5 — unselected items
/// stay the system `#191919` whatever is set on the proxy). Rather than ship
/// half the scheme, the tint is left as it was.
public enum DSAppDestination: Hashable {
    case explore, map, news, member
}

public struct DSAppTabView<Explore: View, Map: View, News: View, Member: View>: View {
    @Binding private var selection: DSAppDestination
    private let newsBadgeCount: Int
    private let explore: () -> Explore
    private let map: () -> Map
    private let news: () -> News
    private let member: () -> Member

    public init(
        selection: Binding<DSAppDestination>,
        newsBadgeCount: Int = 0,
        @ViewBuilder explore: @escaping () -> Explore,
        @ViewBuilder map: @escaping () -> Map,
        @ViewBuilder news: @escaping () -> News,
        @ViewBuilder member: @escaping () -> Member
    ) {
        self._selection = selection
        self.newsBadgeCount = newsBadgeCount
        self.explore = explore
        self.map = map
        self.news = news
        self.member = member
    }

    public var body: some View {
        // Figma's tab order: 探索 → 地圖 → 消息 → 會員.
        TabView(selection: $selection) {
            explore()
                .tabItem { Label("探索", systemImage: "magnifyingglass") }
                .tag(DSAppDestination.explore)
            map()
                .tabItem { Label("地圖", systemImage: "map.fill") }
                .tag(DSAppDestination.map)
            news()
                .tabItem { Label("消息", systemImage: "bell.fill") }
                .tag(DSAppDestination.news)
                .badge(newsBadgeCount)
            member()
                .tabItem { Label("會員", systemImage: "person.crop.circle") }
                .tag(DSAppDestination.member)
        }
        .tint(DSColor.primaryGreen800)
    }
}

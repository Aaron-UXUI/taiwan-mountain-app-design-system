import SwiftUI

/// Native port of `navigation-bar.md` — the app's persistent bottom
/// navigation. This maps directly onto SwiftUI's `TabView`: the
/// current-page indicator, icon+label pairing, and unread badge are all
/// native (`.tabItem` + `.badge(_:)`). `check-box-navigation.md` has no
/// separate SwiftUI component: TabView only reads an image + text out of
/// whatever is passed to `.tabItem` and draws its own chrome around them, so
/// a custom-styled tab item would have its styling discarded here anyway.
public enum DSAppDestination: Hashable {
    case activity, map, notify, member
}

public struct DSAppTabView<Activity: View, Map: View, Notify: View, Member: View>: View {
    @Binding private var selection: DSAppDestination
    private let notifyBadgeCount: Int
    private let activity: () -> Activity
    private let map: () -> Map
    private let notify: () -> Notify
    private let member: () -> Member

    public init(
        selection: Binding<DSAppDestination>,
        notifyBadgeCount: Int = 0,
        @ViewBuilder activity: @escaping () -> Activity,
        @ViewBuilder map: @escaping () -> Map,
        @ViewBuilder notify: @escaping () -> Notify,
        @ViewBuilder member: @escaping () -> Member
    ) {
        self._selection = selection
        self.notifyBadgeCount = notifyBadgeCount
        self.activity = activity
        self.map = map
        self.notify = notify
        self.member = member
    }

    public var body: some View {
        TabView(selection: $selection) {
            activity()
                .tabItem { Label("活動", systemImage: "figure.hiking") }
                .tag(DSAppDestination.activity)
            map()
                .tabItem { Label("地圖", systemImage: "map.fill") }
                .tag(DSAppDestination.map)
            notify()
                .tabItem { Label("通知", systemImage: "bell.fill") }
                .tag(DSAppDestination.notify)
                .badge(notifyBadgeCount)
            member()
                .tabItem { Label("會員", systemImage: "person.crop.circle") }
                .tag(DSAppDestination.member)
        }
        .tint(DSColor.primaryGreen800)
    }
}

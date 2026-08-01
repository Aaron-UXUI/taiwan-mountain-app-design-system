import SwiftUI

/// Native port of `navigation-bar.md` — the app's persistent bottom
/// navigation, drawn from Figma's `Navigation Bar` (490:22853) rather than
/// left to SwiftUI's `TabView` chrome.
///
/// This used to be a plain `TabView`. That works right up until the design
/// asks for a brand colour on the *unselected* item: `.tint(_:)` only reaches
/// the selected one, and iOS 26's floating tab bar ignores
/// `UITabBarAppearance.stackedLayoutAppearance.normal` and
/// `unselectedItemTintColor` alike — measured on iOS 26.5, the unselected
/// items stayed the system's `#191919` no matter what was set on the proxy.
/// So the bar is drawn here, the same call the design side already made for
/// Toggle, SegmentedControls, Stepper and SearchBar.
///
/// What is given up is the iOS 26 glass tab bar and its scroll-to-minimise
/// behaviour. What is kept is the semantics: the bar is exposed to
/// VoiceOver/Switch Control as a real tab bar through
/// `accessibilityRepresentation`, so each item still reads as "tab, n of 4"
/// and selection still announces.
public enum DSAppDestination: Hashable, CaseIterable {
    case activity, map, notify, member

    var title: String {
        switch self {
        case .activity: return "活動"
        case .map: return "地圖"
        case .notify: return "通知"
        case .member: return "會員"
        }
    }

    /// Figma pairs each tab with the outline glyph, swapping to the filled one
    /// on selection.
    func icon(selected: Bool) -> DSIcon {
        switch self {
        case .activity: return selected ? .searchFill : .search
        case .map: return selected ? .mapFill : .map
        case .notify: return selected ? .notifyFill : .notify
        case .member: return selected ? .memberFill : .member
        }
    }
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
        VStack(spacing: 0) {
            ZStack {
                switch selection {
                case .activity: activity()
                case .map: map()
                case .notify: notify()
                case .member: member()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)

            bar
        }
    }

    private var bar: some View {
        HStack(spacing: 0) {
            ForEach(DSAppDestination.allCases, id: \.self) { destination in
                item(destination)
            }
        }
        .background(DSColor.white)
        .accessibilityElement(children: .contain)
    }

    private func item(_ destination: DSAppDestination) -> some View {
        let isSelected = selection == destination

        return Button {
            selection = destination
        } label: {
            // Figma: 56pt tall, 4pt between the 24pt glyph and its Label/S
            // caption, 12pt horizontal padding, each item an equal share.
            VStack(spacing: DSSpacing.xs) {
                ZStack {
                    if isSelected {
                        // The green-50 pill sits behind the glyph only — 56×32,
                        // 1pt from the top of the item.
                        Capsule()
                            .fill(DSColor.primaryGreen50)
                            .frame(width: 56, height: 32)
                    }
                    DSIconView(destination.icon(selected: isSelected))
                        .frame(width: 24, height: 24)
                        .overlay(alignment: .topTrailing) {
                            if destination == .notify && notifyBadgeCount > 0 {
                                DSBadge(.notification(count: notifyBadgeCount))
                                    .alignmentGuide(.top) { $0[.bottom] - 6 }
                                    .alignmentGuide(.trailing) { $0[.leading] + 12 }
                            }
                        }
                }
                .frame(height: 32)

                Text(destination.title)
                    .dsFont(.labelS)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 56)
            .padding(.horizontal, DSSpacing.sm)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        // Default → green-800, Enabled (selected) → green-900, applied to the
        // glyph and its caption together.
        .foregroundStyle(isSelected ? DSColor.primaryGreen900 : DSColor.primaryGreen800)
        .accessibilityRepresentation {
            Button(destination.title) { selection = destination }
                .accessibilityAddTraits(isSelected ? [.isSelected, .isTabBar] : .isTabBar)
        }
    }
}

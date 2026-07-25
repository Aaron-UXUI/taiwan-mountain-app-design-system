import SwiftUI

/// Native port of `check-box-navigation.md`, as its own standalone,
/// reusable file.
///
/// This is *not* wired into `DSAppTabView`: iOS's `TabView` only picks up
/// image + text from whatever is passed to `.tabItem` and renders its own
/// native tab bar chrome around it — a fully custom-styled view like this
/// one would have its background, padding, and pill highlight silently
/// discarded there, so `DSAppTabView` keeps using plain `Label` + `.badge()`
/// for that job (see its own doc comment). This component is for the cases
/// the spec's other nested usage covers instead — e.g. `DSBottomBar`'s
/// per-screen action rows, or any custom (non-`TabView`) destination
/// switcher that needs the exact look/interaction the spec describes.
public enum DSNavigationBadge: Equatable {
    case none, dot, count(Int)
}

public struct DSCheckBoxNavigation: View {
    private let label: String
    private let systemImage: String
    private let isActive: Bool
    private let badge: DSNavigationBadge
    private let action: () -> Void

    public init(
        label: String,
        systemImage: String,
        isActive: Bool,
        badge: DSNavigationBadge = .none,
        action: @escaping () -> Void
    ) {
        self.label = label
        self.systemImage = systemImage
        self.isActive = isActive
        self.badge = badge
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            VStack(spacing: DSSpacing.xs) {
                ZStack(alignment: .topTrailing) {
                    Image(systemName: systemImage)
                        .imageScale(.large)
                        .accessibilityHidden(true)
                    badgeOverlay
                }
                Text(label)
                    .dsFont(.bodyS)
                    .fontWeight(.semibold)
            }
            .foregroundStyle(isActive ? DSColor.primaryGreen800 : DSColor.gray800)
            .padding(.vertical, DSSpacing.xs)
            .padding(.horizontal, DSSpacing.sm)
            .background(isActive ? DSColor.primaryGreen50 : .clear)
            .clipShape(Capsule())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityAddTraits(isActive ? [.isSelected, .isButton] : .isButton)
    }

    @ViewBuilder
    private var badgeOverlay: some View {
        switch badge {
        case .none:
            EmptyView()
        case .dot:
            Circle()
                .fill(DSColor.destruct700)
                .frame(width: 8, height: 8)
                .offset(x: 4, y: -4)
                .accessibilityHidden(true)
        case .count(let count):
            DSBadge(count: count, style: .alert)
                .offset(x: 10, y: -8)
        }
    }

    private var accessibilityLabel: String {
        switch badge {
        case .none: return label
        case .dot: return "\(label), 有未讀項目"
        case .count(let count): return "\(label), \(count) 項"
        }
    }
}

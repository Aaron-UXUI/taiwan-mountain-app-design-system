import SwiftUI

/// Native port of `bottom-bar.md`. Applied via `.safeAreaInset(edge: .bottom)`,
/// the idiomatic way to reserve a permanent action area without it
/// overlapping scrollable content underneath.
///
/// The spec's fourth `type` — embedding the full `NavigationBar` inside a
/// per-screen bottom bar — is intentionally not reproduced: `NavigationBar`
/// is now `DSAppTabView`, the app's single persistent `TabView` that the
/// whole screen already lives inside, so there is nothing left to re-embed
/// per screen.
public enum DSBottomBarContent {
    case singleButton(title: String, action: () -> Void)
    case twoButtons(secondaryTitle: String, secondaryAction: () -> Void, primaryTitle: String, primaryAction: () -> Void)
    case placeOrder(summary: DSPaymentInfo, actionTitle: String, action: () -> Void)
}

public extension View {
    func dsBottomBar(_ content: DSBottomBarContent) -> some View {
        safeAreaInset(edge: .bottom) {
            DSBottomBarView(content: content)
        }
    }
}

private struct DSBottomBarView: View {
    let content: DSBottomBarContent

    var body: some View {
        Group {
            switch content {
            case .singleButton(let title, let action):
                DSButton(title, action: action)
            case .twoButtons(let secondaryTitle, let secondaryAction, let primaryTitle, let primaryAction):
                HStack(spacing: DSSpacing.s) {
                    DSButton(secondaryTitle, emphasis: .secondary, action: secondaryAction)
                    DSButton(primaryTitle, action: primaryAction)
                }
            case .placeOrder(let summary, let actionTitle, let action):
                VStack(spacing: DSSpacing.s) {
                    summary
                    DSButton(actionTitle, action: action)
                }
            }
        }
        .padding(.horizontal, DSSpacing.lm)
        .padding(.vertical, DSSpacing.s)
        .background(.bar)
    }
}

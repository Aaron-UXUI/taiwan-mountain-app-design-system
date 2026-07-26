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
    /// `Type=Button`
    case singleButton(title: String, action: () -> Void)
    /// `Type=2 Buttons`. Despite the Figma variant name this is **not** two
    /// buttons: it is the primary button paired with a single tab-style
    /// shortcut (24pt glyph over a 12pt Semibold caption) in a fixed 64pt
    /// slot. It was previously built as a secondary + primary button pair.
    case buttonWithShortcut(
        title: String,
        action: () -> Void,
        shortcutTitle: String,
        shortcutIcon: DSIcon,
        shortcutAction: () -> Void
    )
    /// `Type=Place Order`
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
        // Figma: white surface with an Elevation/2 shadow and 8pt of *top*
        // padding only — the bottom edge is the home indicator, which the
        // safe-area inset already accounts for. This was `.bar` material with
        // symmetric 8pt padding and no shadow.
        Group {
            switch content {
            case .singleButton(let title, let action):
                DSButton(title, action: action)
                    .padding(.horizontal, DSSpacing.lm)

            case .buttonWithShortcut(let title, let action, let shortcutTitle, let shortcutIcon, let shortcutAction):
                HStack(spacing: DSSpacing.s) {
                    DSButton(title, action: action)
                    Button(action: shortcutAction) {
                        VStack(spacing: DSSpacing.xs) {
                            DSIconView(shortcutIcon)
                                .frame(width: 24, height: 24)
                            Text(shortcutTitle)
                                .dsFont(.labelS)
                        }
                        .foregroundStyle(DSColor.gray800)
                        .frame(width: 64, height: 44)
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, DSSpacing.lm)

            case .placeOrder(let summary, let actionTitle, let action):
                // The summary carries Figma's 24pt inset itself, so only the
                // button is padded here.
                VStack(spacing: 0) {
                    summary
                    DSButton(actionTitle, action: action)
                        .padding(.horizontal, DSSpacing.lm)
                }
            }
        }
        .padding(.top, DSSpacing.s)
        .frame(maxWidth: .infinity)
        .background(DSColor.white)
        .dsElevation(.level2)
    }
}

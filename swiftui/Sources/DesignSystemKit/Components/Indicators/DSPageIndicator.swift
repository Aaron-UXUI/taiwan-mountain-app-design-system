import SwiftUI

/// Native port of `carousel-indicators.md`.
///
/// Prefer `TabView(selection:) { ... }.tabViewStyle(.page(indexDisplayMode: .always))`
/// directly wherever the carousel itself is a `TabView` — it already renders
/// these exact page dots natively, with the current-page announcement
/// included, and needs no separate indicator view at all.
///
/// This standalone view is only for the rarer case where dots must track an
/// externally-driven scroll position (e.g. a `ScrollView` carousel, not a
/// `TabView` one) and therefore can't rely on `.page` style.
public struct DSPageIndicator: View {
    private let pageCount: Int
    private let currentPage: Int
    private let isOnDarkBackground: Bool

    public init(pageCount: Int, currentPage: Int, isOnDarkBackground: Bool = true) {
        self.pageCount = pageCount
        self.currentPage = currentPage
        self.isOnDarkBackground = isOnDarkBackground
    }

    public var body: some View {
        HStack(spacing: DSSpacing.xs) {
            ForEach(0..<pageCount, id: \.self) { index in
                Circle()
                    .fill(index == currentPage ? activeColor : inactiveColor)
                    .frame(width: 6, height: 6)
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("第 \(currentPage + 1) 張,共 \(pageCount) 張")
    }

    private var activeColor: Color { isOnDarkBackground ? DSColor.white : DSColor.black }
    private var inactiveColor: Color { isOnDarkBackground ? DSColor.gray400 : DSColor.gray200 }
}

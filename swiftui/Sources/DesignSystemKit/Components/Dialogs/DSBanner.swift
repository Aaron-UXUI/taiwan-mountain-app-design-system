import SwiftUI

/// Native port of `banner.md` — a persistent notice (e.g. offline mode),
/// distinct from `DSSnackbar` in that it stays until its underlying
/// condition clears rather than auto-dismissing. Composed via
/// `.safeAreaInset`, the idiomatic SwiftUI way to reserve permanent chrome
/// without it overlapping scrollable content.
public extension View {
    func dsBanner(isPresented: Bool, message: String, edge: VerticalEdge = .top) -> some View {
        safeAreaInset(edge: edge) {
            if isPresented {
                Text(message)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, DSSpacing.xs)
                    .padding(.horizontal, DSSpacing.lm)
                    .background(DSColor.gray800)
                    .accessibilityAddTraits(.updatesFrequently)
            }
        }
    }
}

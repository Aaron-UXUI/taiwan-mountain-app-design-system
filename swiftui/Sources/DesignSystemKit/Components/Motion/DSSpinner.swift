import SwiftUI

/// Replaces `spinner-on-white.md` / `spinner-on-dark.md` with a single
/// tinted wrapper over native `ProgressView` — the platform's own busy
/// indicator already carries the `.status` accessibility semantic ("in
/// progress") the spec calls for, and already respects Reduce Motion
/// correctly, so no custom dot-fade animation is reproduced.
public struct DSSpinner: View {
    private let tint: Color

    public init(tint: Color = DSColor.primaryGreen800) {
        self.tint = tint
    }

    public static let onWhite = DSSpinner(tint: DSColor.gray800)
    public static let onDark = DSSpinner(tint: DSColor.white)

    public var body: some View {
        ProgressView()
            .tint(tint)
            .accessibilityLabel("Loading")
    }
}

import SwiftUI

/// Platform shims. `topBarTrailing` is the correct, current iOS placement
/// this kit targets; it's simply unavailable on macOS, which this package
/// also declares as a platform purely so the whole target stays buildable
/// with the plain `swift build` toolchain for local verification in
/// environments without a full Xcode/iOS SDK install. Real usage is iOS —
/// this indirection only exists to keep that verification path open.
enum DSPlatform {
    static var toolbarTrailing: ToolbarItemPlacement {
        #if os(iOS)
        .topBarTrailing
        #else
        .automatic
        #endif
    }
}

public extension View {
    /// Pins the navigation title inline — centred and compact, matching Figma's
    /// 48pt App Bar rather than iOS's large-title default. `navigationBarTitleDisplayMode`
    /// is iOS-only, so it is behind the same platform fence as `toolbarTrailing`.
    @ViewBuilder
    func dsInlineTitle() -> some View {
        #if os(iOS)
        self.navigationBarTitleDisplayMode(.inline)
        #else
        self
        #endif
    }
}

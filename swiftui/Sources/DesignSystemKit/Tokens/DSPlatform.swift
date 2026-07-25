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

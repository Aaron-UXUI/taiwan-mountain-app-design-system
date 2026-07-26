import SwiftUI

/// Verification-only Xcode project. Compiles the exact same source files as
/// `Sources/DesignSystemKit` + `Sources/GalleryKit` directly into one app
/// target (rather than depending on the Swift Package itself), purely so
/// this environment's Xcode install can produce a real, installable .app to
/// run in Simulator. The actual deliverable to depend on from a real app is
/// still the Swift Package at `swiftui/Package.swift` — add it via
/// Xcode's File > Add Package Dependencies > Add Local.
@main
struct PreviewApp: App {
    var body: some Scene {
        WindowGroup {
            GalleryRootView()
        }
    }
}

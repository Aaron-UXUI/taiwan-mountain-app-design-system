import Foundation

/// Resolves the bundle that ships `DSIcons.xcassets`.
///
/// Under SwiftPM this is the generated `Bundle.module`. The `PreviewApp`
/// verification project (see `swiftui/PreviewApp/README.md`) compiles these
/// same sources straight into an app target with no SwiftPM involved, so
/// `Bundle.module` does not exist there — hence the fallback to the bundle
/// that actually contains this type.
enum DSResources {
    static let bundle: Bundle = {
        #if SWIFT_PACKAGE
        return .module
        #else
        return Bundle(for: DSResourceBundleToken.self)
        #endif
    }()
}

private final class DSResourceBundleToken {}

// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "TaiwanMountainDS",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(name: "DesignSystemKit", targets: ["DesignSystemKit"]),
        .library(name: "GalleryKit", targets: ["GalleryKit"]),
        .executable(name: "ComponentGallery", targets: ["ComponentGallery"])
    ],
    targets: [
        .target(
            name: "DesignSystemKit",
            path: "Sources/DesignSystemKit",
            resources: [.process("Resources")]
        ),
        .target(
            name: "GalleryKit",
            dependencies: ["DesignSystemKit"],
            path: "Sources/GalleryKit"
        ),
        .executableTarget(
            name: "ComponentGallery",
            dependencies: ["GalleryKit"],
            path: "Sources/ComponentGallery"
        )
    ]
)

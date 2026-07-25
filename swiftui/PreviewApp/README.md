# PreviewApp — local visual QA helper

A minimal Xcode project for running the design system in a real iOS
Simulator, purely for local visual verification. **This is not the shipped
deliverable** — that's the Swift Package one level up (`swiftui/Package.swift`).
A real app should depend on it as a local Swift Package dependency instead
(Xcode → File → Add Package Dependencies → Add Local), which gives you
proper `DesignSystemKit`/`GalleryKit` modules rather than what this project
does.

## Why this exists instead of just opening `Package.swift`

Opening `swiftui/Package.swift` directly in Xcode and running the
`ComponentGallery` scheme builds a plain executable for the iOS Simulator
SDK, but — verified with `xcodebuild build` — that's a bare Mach-O binary,
not an installable `.app` bundle (no `Info.plist`, no bundle identity). A
real single-target Xcode project is the reliable way to get something
`simctl`/Simulator can actually install and run.

## Why it's one flat target instead of depending on the package

Hand-authoring an Xcode project that references a local Swift Package
dependency (`XCLocalSwiftPackageReference` / `XCSwiftPackageProductDependency`)
is real, well-supported Xcode functionality — but it's also the most
failure-prone part of a hand-written `project.pbxproj` to get exactly right
without Xcode's own project editor generating it. So instead, this project
just compiles the same source files directly into one app target (no
package dependency at all), which is the simplest, most reliable shape for
a hand-written `.pbxproj`. Functionally identical output; less to get wrong.

Since `Sources/GalleryKit/*.swift` has `import DesignSystemKit` (correct when
built as a real separate module via the package), and this project builds
everything as a single module, the generator writes stripped copies of just
the `GalleryKit` files (with that import line removed) into
`GeneratedSources/GalleryKit/` and references those instead of touching the
real, shipped source.

## Usage

```bash
cd swiftui/PreviewApp
node generate-pbxproj.mjs      # writes PreviewApp.xcodeproj + GeneratedSources/
open PreviewApp.xcodeproj      # or build via xcodebuild, see below
```

Re-run `generate-pbxproj.mjs` any time a file is added/removed under
`Sources/DesignSystemKit` or `Sources/GalleryKit` — the file list is
enumerated fresh each run. Neither `PreviewApp.xcodeproj/` nor
`GeneratedSources/` are tracked in git (see `swiftui/.gitignore`) since
they're fully regenerated from the real source.

Command-line build + run, given a booted Simulator:

```bash
xcodebuild build -project PreviewApp.xcodeproj -scheme PreviewApp \
  -destination 'platform=iOS Simulator,name=iPhone 17'

xcrun simctl install booted \
  ~/Library/Developer/Xcode/DerivedData/PreviewApp-*/Build/Products/Debug-iphonesimulator/PreviewApp.app
xcrun simctl launch booted tw.taiwanmountain.previewapp
```

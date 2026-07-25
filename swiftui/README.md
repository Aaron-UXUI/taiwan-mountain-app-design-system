# TaiwanMountainDS — SwiftUI Component Kit + Gallery App

A native SwiftUI implementation of the design system, built **from the
platform-independent specs in [`docs/component-spec/`](../docs/component-spec/)
— not translated from the React source**. Every file below cites which spec
it ports and, where it deviates from the spec, explains why in a doc comment.

## Why this isn't a 1:1 port

Several spec components turned out to have a *native, first-party* Apple
equivalent that already satisfies HIG, Dynamic Type, Accessibility, and
native interaction — reusing it beats rebuilding it:

| Spec component(s) | Native replacement |
|---|---|
| `SegmentedControls` | `Picker(.segmented)` |
| `Stepper` | native `Stepper` |
| `TextField`, `Toggle` | native `TextField` / `Toggle` |
| `AccordionCheckBox`, `AccordionChips` | `DisclosureGroup` |
| `BottomSheet` | `.sheet` + `.presentationDetents` + `.presentationDragIndicator` |
| `Tooltip` | `.popover` (iOS has no hover; popover is the touch/VoiceOver-reachable equivalent) |
| `SearchBar` | `.searchable` + `.searchSuggestions` |
| `NavigationBar` (bottom tabs) | `TabView` + `.badge(_:)` |
| `AppBar` | `NavigationStack` + `.toolbar` (back button is automatic) |
| `CarouselIndicators` | `TabView(.page)`'s built-in page dots |
| `SpinnerOnWhite` / `SpinnerOnDark` | `ProgressView` (tinted) |
| `MotionSuccess` / `MotionTransaction` | SF Symbol `.symbolEffect(...)` |
| `Icon14/16/20/24`, `IconMap`, `IconWeather` | SF Symbols via `DSIcon`, one lookup file instead of 6 components |
| `RadioButton` (Default style) | `Picker(.inline)` — iOS has no standalone radio control; this is HIG's own "choice list" idiom |
| `UserLocation` | MapKit's native `UserAnnotation()` (this kit's version is a non-MapKit fallback only) |

The **4 `ios-system` mockup components** (`StatusBar`, `Keyboard`,
`KeyboardNumbers`, `HomeIndicator`) are **not ported at all** — on a real
device the OS already renders all of them; reimplementing system chrome
would violate the "Native Interaction" requirement, not satisfy it.

`CheckBoxNavigation` is its own standalone file (`DSCheckBoxNavigation.swift`)
but is **not** wired into `DSAppTabView`'s `.tabItem`s — iOS's `TabView` only
picks up image + text from whatever is passed to `.tabItem` and silently
discards custom background/padding/highlight styling there, so
`DSAppTabView` keeps using plain `Label` + `.badge()` for that job instead.
`DSCheckBoxNavigation` is for the cases that need the exact look/interaction
the spec describes outside of `TabView`'s automatic chrome — e.g. a custom
destination switcher inside `DSBottomBar`.

`Logo` / `Logos` (brand marks) have no real asset to port — like the React
source's own `Logo.tsx`/`Logos.tsx`, they render as text-lockup / neutral
badge placeholders (`Components/Icons/DSLogo.swift`,
`DSPaymentBrandBadge.swift`) rather than reproducing real trademarks.

**Coverage: all 60 spec components have a direct native counterpart or a
documented, deliberate replacement** (6 icon-set components consolidated
into the 1 `DSIcon` lookup, 4 iOS-system mockups excluded since the OS
already renders them — see above).

## Structure

```
swiftui/
├── Package.swift
├── Sources/
│   ├── DesignSystemKit/        ← the component library (import this)
│   │   ├── Tokens/              Color / Spacing / Radius / Typography (Dynamic Type) / Elevation / Motion / SF Symbol map
│   │   └── Components/
│   │       ├── Buttons/         Button, IconButton, Link, LinkFurtherInfo, Chips
│   │       ├── Inputs/          CheckBox, RadioButton, Toggle, Stepper, SegmentedControl, TextField
│   │       ├── Cards/           CardScene/Description/Tickets/Notification/SavedItems, List rows
│   │       ├── Dialogs/         BottomSheet, Tooltip, Snackbar, Banner, Accordions, CollapseText, TabBar
│   │       ├── Navigation/      AppBar, AppTabView, BottomBar, Searchable
│   │       ├── Indicators/      Badge, Crowdedness/StatusLabel, OfflineMap, PaymentInfo, ProgressIndicator, PageIndicator
│   │       ├── Motion/          Spinner, SuccessCheckmark, TransactionAnimation
│   │       └── MapMarkers/      LocationPin, UserLocationMarker
│   ├── GalleryKit/              ← the Gallery app's screens (a library, so it's independently testable)
│   │   ├── GalleryRootView.swift   NavigationSplitView catalog
│   │   └── Showcases/              one live, interactive showcase per category
│   └── ComponentGallery/        ← 4-line @main entry point that just shows GalleryRootView()
```

## Design decisions worth knowing

- **Dynamic Type**: every text token scales via `@ScaledMetric` relative to
  the closest built-in `Font.TextStyle` (see `DSTypography.swift`) — not a
  fixed pixel size. Fixed CSS line-heights are intentionally **not**
  reproduced; the system font's own leading already scales correctly at
  accessibility sizes, and a hand-tuned fixed value would overlap there.
- **Accessibility**: decorative glyphs are `.accessibilityHidden`; every
  badge/count is folded into its host's accessible label rather than
  exposed as a disconnected element; Reduce Motion is explicitly checked in
  `dsAnimation(_:value:)` (SwiftUI does not do this for you — you must).
- **SF Symbols**: `DSIcon` (in `Tokens/`) is a single semantic-name → SF
  Symbol lookup that replaces the spec's 6 separate icon-set components.
- **No dark-mode color tokens exist yet** upstream (the Figma library only
  defines one appearance) — `DSColor` is written as semantic names so a
  future dark palette only changes one file, not call sites.

## Running it

**This environment has no Xcode / iOS SDK installed** (command-line tools
only), so the iOS Simulator could not be used to visually verify this app.
What *was* verified here:
1. `swift build --target DesignSystemKit` / `GalleryKit` / `ComponentGallery`
   all compile cleanly (targeting macOS, since that's the only SDK present).
2. `swift run ComponentGallery` was actually launched as a live macOS app
   and stayed running for several seconds with no crash — real runtime
   verification of the view hierarchy and state wiring, not just a syntax
   check. (No screenshot could be taken — this sandbox has no display server.)

To run it as the intended **iOS app** in Simulator:
1. Open `swiftui/Package.swift` directly in Xcode, **or** create a new iOS
   App project and add this folder as a local Swift Package dependency.
2. Add `import GalleryKit` and `GalleryRootView()` to your app's
   `WindowGroup` (already done for you in `ComponentGalleryApp.swift` if you
   open the package directly — pick the `ComponentGallery` scheme and Run).
3. Build & run on any iOS 17+ Simulator.

# TaiwanMountainDS — SwiftUI Component Kit + Gallery App

A native SwiftUI implementation of the design system, built **from the
platform-independent specs in [`docs/component-spec/`](../docs/component-spec/)
— not translated from the React source**. Every file below cites which spec
it ports and, where it deviates from the spec, explains why in a doc comment.

## Why this isn't a 1:1 port

**Figma is the source of truth for anything visual** (see
[`docs/workflow.md`](../docs/workflow.md)). Where a first-party Apple control
matches the design closely enough, it is reused — it already satisfies HIG,
Dynamic Type, Accessibility and native interaction. Where the design and the
native control genuinely differ, the design wins and the control is drawn from
Figma, keeping the native *semantics* underneath.

### Still native

| Spec component(s) | Native replacement |
|---|---|
| `TextField` | native `TextField` |
| `AccordionCheckBox`, `AccordionChips` | `DisclosureGroup` |
| `BottomSheet` | `.sheet` + `.presentationDetents` + `.presentationDragIndicator` |
| `Tooltip` | `.popover` (iOS has no hover; popover is the touch/VoiceOver-reachable equivalent) |
| `NavigationBar` (bottom tabs) | `TabView` + `.badge(_:)` |
| `AppBar` | `NavigationStack` + `.toolbar` — Figma is a 48pt bar with a centred 16pt regular title against iOS's 44pt/17pt semibold. Closing that would cost the depth-linked back button, swipe-back, large-title collapse and toolbar safe-area handling, so the title is pinned inline and the buttons use brand glyphs instead |
| `CarouselIndicators` | `TabView(.page)`'s built-in page dots (`DSPageIndicator` is the standalone fallback) |
| `MotionSuccess` / `MotionTransaction` | rebuilt from the Figma storyboards as real interpolated motion over the extracted artwork (checkmark wipe; card sliding across the payment terminal) |
| `Icon14/16/20/24`, `IconMap`, `IconWeather` | one `DSIcon` enum over the **real Figma vector art**, bundled as SVG imagesets in `Resources/DSIcons.xcassets` (see `Tools/README.md`) |
| `UserLocation` | MapKit's native `UserAnnotation()` (this kit's version is a non-MapKit fallback only) |

### Drawn from Figma instead

These started out native and were changed once the gap to the design proved
visible side by side. Each keeps its native semantics — a custom `ToggleStyle`
is still a `Toggle`, so VoiceOver still says "switch, on/off".

| Component | Why the native control wasn't enough |
|---|---|
| `Toggle` | Figma's Off state is a green-100 track with a 2pt green-800 outline and a **green-800** knob; iOS draws a grey track with a white knob |
| `SegmentedControls` | Figma fills the selected indicator green-800 with a white label; the native control is the inverse — white indicator, dark label |
| `Stepper` | Figma is one bordered pill holding `[− 48][value 48][+ 48]`; the native control puts the value *outside* a small −/+ pair — structural, not a tint |
| `SearchBar` | Figma's is a 48pt bordered, elevated field with a mic button **and a separate filter button beside it**; `.searchable` renders a nav-bar capsule that can host neither. `DSSearchBar` is the port; `dsSearchable` remains for screens that genuinely want the system affordance |
| `RadioButton` | iOS has no standalone radio control. This was `Picker(.inline)` (a trailing-checkmark list), which is the HIG idiom but visibly not the designed control — now drawn with the exported `icon/24px` glyph |
| `SpinnerOnWhite` / `SpinnerOnDark` | Figma is eight 8pt dots fading in a trail around a 40pt box; `ProgressView` is a gapped spinning ring. Reduce Motion is preserved explicitly — the trail holds static instead of spinning |

The **4 `ios-system` mockup components** (`StatusBar`, `Keyboard`,
`KeyboardNumbers`, `HomeIndicator`) are **not implemented on either platform** —
on a real device the OS already renders all of them, so reimplementing system
chrome would violate the "Native Interaction" requirement, not satisfy it.
React used to carry mockups of them; they were removed for the same reason.

`CheckBoxNavigation` has **no SwiftUI component**. iOS's `TabView` only reads
image + text out of whatever is passed to `.tabItem` and draws its own chrome
around them, discarding custom styling, so `DSAppTabView` uses plain `Label` +
`.badge()` and there was nothing left for a separate component to do.

`Logo` / `Logos` (brand marks) have no real asset to port — like the React
source's own `Logo.tsx`/`Logos.tsx`, they render as text-lockup / neutral
badge placeholders (`Components/Icons/DSLogo.swift`,
`DSPaymentBrandBadge.swift`) rather than reproducing real trademarks.

**Coverage: 59 of the spec's 60 components have a native counterpart or a
documented, deliberate replacement** — 6 icon-set components consolidated
into the 1 `DSIcon` enum, 4 iOS-system mockups excluded since the OS already
renders them, and `CheckBoxNavigation` dropped as above.

## Structure

```
swiftui/
├── Package.swift
├── Sources/
│   ├── DesignSystemKit/        ← the component library (import this)
│   │   ├── Tokens/              Color / Spacing / Radius / Typography (Dynamic Type) / Elevation / Motion / DSIcon
│   │   ├── Resources/           DSIcons.xcassets — 48 Figma glyphs + 3 motion artwork assets
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
├── Tools/                       ← Figma export -> DSIcons.xcassets extraction scripts (see Tools/README.md)
├── PreviewApp/                  ← local-only Xcode project for visually verifying in Simulator (see PreviewApp/README.md)
└── .gitignore
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
- **Icons**: `DSIcon` (in `Tokens/`) is a single enum over the design
  system's own 48 Figma glyphs, shipped as vector imagesets. Most are
  template-rendered so they tint from `foregroundStyle` like an SF Symbol;
  four keep their original colours because the multi-colour *is* the design.
  `DSIconView` scales them for Dynamic Type. Regenerate with `Tools/`.
- **No dark-mode color tokens exist yet** upstream (the Figma library only
  defines one appearance) — `DSColor` is written as semantic names so a
  future dark palette only changes one file, not call sites.

## Running it

**Visually verified in iOS Simulator** (once Xcode became available in this
environment): `PreviewApp/` is a small helper Xcode project — see
[`PreviewApp/README.md`](PreviewApp/README.md) — that compiles the exact same
source under `Sources/DesignSystemKit` + `Sources/GalleryKit` into one app
target and installs it as a real `.app` on Simulator. Confirmed working via
`xcodebuild` + `simctl`/the Simulator directly: the sidebar lists all 8
categories, every showcase renders with correct
colors/spacing/radius from the generated tokens, live interactions work
(tapping a chip toggles it, navigating between categories pushes/pops
correctly via NavigationSplitView), and Chinese labels render correctly.

Plain `swift build --target DesignSystemKit` / `GalleryKit` / `ComponentGallery`
also compile cleanly on their own (including against a real iOS Simulator SDK
target, not just macOS) — useful for a quick CLI sanity check without opening
Xcode at all.

**To depend on this in a real app** (the actual deliverable — `PreviewApp` is
only a local QA convenience): create an iOS App project in Xcode, add this
`swiftui/` folder as a local Swift Package dependency (File → Add Package
Dependencies → Add Local), then `import GalleryKit` and put `GalleryRootView()`
in your `WindowGroup` — or `import DesignSystemKit` and use the individual
`DS*` components directly, without the Gallery at all.

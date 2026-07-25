import SwiftUI

/// The design system's own icon set, drawn from the Figma library's
/// `icon / 14px`, `icon / 16px`, `icon / 20px`, `icon / 24px`,
/// `icon / 24px / Map` and `icon / 24px / weather` frames.
///
/// These are the real brand glyphs, shipped as vector (SVG) imagesets in
/// `Resources/DSIcons.xcassets` — not SF Symbol stand-ins. An earlier version
/// of this file mapped each name onto the nearest SF Symbol; that kept the
/// system-native look but silently substituted different artwork for the
/// designed icons, so it has been replaced.
///
/// Most glyphs ship as **template** images and therefore take their colour
/// from the surrounding `.foregroundStyle(_:)`, exactly like an SF Symbol.
/// Four are deliberately **original**-rendered because their multiple colours
/// are the design: the two weather sun glyphs (yellow sun over a grey cloud)
/// and the two radio glyphs (a white centre knocked out of a dark ring, which
/// a flat tint would fill in).
///
/// `defaultTint` carries the colour the glyph is drawn with in Figma for the
/// two semantically-coloured icons, so they look right with no extra work at
/// the call site while staying overridable.
public enum DSIcon: String, CaseIterable, Sendable {
    // MARK: icon / 14px
    case chevron
    case secured

    // MARK: icon / 16px
    case exclamation
    case externalLink
    case notNotified
    case notified
    case heart16
    case heart16Fill

    // MARK: icon / 20px
    case search20
    case microphone
    case check
    case info20
    case creditCard
    case closeEye
    case openEye

    // MARK: icon / 24px
    case map
    case mapFill
    case search
    case searchFill
    case notify
    case notifyFill
    case member
    case memberFill
    case heart
    case heartFill
    case radio
    case radioFill
    case gps
    case gpsFill
    case setting
    case more
    case filter
    case back
    case close
    case minus
    case plus
    case placeholder

    // MARK: icon / 24px / Map
    case tree
    case camera
    case walk
    case mapInfo

    // MARK: icon / 24px / weather
    case cloudSun
    case sunny
    case rain
    case lightningRain
    case windy
    case typhoon
    case cloudSnow

    // MARK: Motion storyboard artwork
    // Not icons in the catalogue sense — these are the pieces the motion
    // components animate (see DSMotionEffects). Kept here so every bundled
    // vector asset resolves through one place.
    case successCheck
    case transactionTerminal
    case transactionCard

    /// Asset-catalog name, e.g. `ds-24-map-fill`.
    var assetName: String {
        switch self {
        case .chevron: return "ds-14-chevron"
        case .secured: return "ds-14-secured"

        case .exclamation: return "ds-16-exclamation"
        case .externalLink: return "ds-16-arrow-up-right"
        case .notNotified: return "ds-16-non-notified"
        case .notified: return "ds-16-notified"
        case .heart16: return "ds-16-heart"
        case .heart16Fill: return "ds-16-heart-fill"

        case .search20: return "ds-20-search"
        case .microphone: return "ds-20-microphone"
        case .check: return "ds-20-check"
        case .info20: return "ds-20-info"
        case .creditCard: return "ds-20-credit-card"
        case .closeEye: return "ds-20-close-eye"
        case .openEye: return "ds-20-open-eye"

        case .map: return "ds-24-map"
        case .mapFill: return "ds-24-map-fill"
        case .search: return "ds-24-search"
        case .searchFill: return "ds-24-search-fill"
        case .notify: return "ds-24-notify"
        case .notifyFill: return "ds-24-notify-fill"
        case .member: return "ds-24-member"
        case .memberFill: return "ds-24-member-fill"
        case .heart: return "ds-24-heart"
        case .heartFill: return "ds-24-heart-fill"
        case .radio: return "ds-24-radio"
        case .radioFill: return "ds-24-radio-fill"
        case .gps: return "ds-24-gps"
        case .gpsFill: return "ds-24-gps-fill"
        case .setting: return "ds-24-setting"
        case .more: return "ds-24-more"
        case .filter: return "ds-24-filter"
        case .back: return "ds-24-back"
        case .close: return "ds-24-close"
        case .minus: return "ds-24-minus"
        case .plus: return "ds-24-plus"
        case .placeholder: return "ds-24-placeholder"

        case .tree: return "ds-map-tree"
        case .camera: return "ds-map-camera"
        case .walk: return "ds-map-walk"
        case .mapInfo: return "ds-map-info"

        case .cloudSun: return "ds-weather-cloud-sun"
        case .sunny: return "ds-weather-sunny"
        case .rain: return "ds-weather-rain"
        case .lightningRain: return "ds-weather-lightning-rain"
        case .windy: return "ds-weather-windy"
        case .typhoon: return "ds-weather-typhoon"
        case .cloudSnow: return "ds-weather-cloud-snow"

        case .successCheck: return "ds-motion-success-check"
        case .transactionTerminal: return "ds-motion-tx-terminal"
        case .transactionCard: return "ds-motion-tx-card"
        }
    }

    /// The size the glyph is drawn at in Figma. Used as the base for Dynamic
    /// Type scaling; the artwork itself is vector and scales cleanly.
    public var nominalSize: CGFloat {
        switch self {
        case .chevron, .secured:
            return 14
        case .exclamation, .externalLink, .notNotified, .notified, .heart16, .heart16Fill:
            return 16
        case .search20, .microphone, .check, .info20, .creditCard, .closeEye, .openEye:
            return 20
        default:
            return 24
        }
    }

    /// Colour the glyph is drawn with in Figma, for the glyphs whose colour is
    /// semantic rather than inherited. `nil` means "inherit the surrounding
    /// foreground style", which is the case for every other template glyph.
    public var defaultTint: Color? {
        switch self {
        case .exclamation: return DSColor.destruct600
        case .check: return DSColor.success700
        default: return nil
        }
    }

    /// The raw image. Prefer `DSIconView` unless you need to size it yourself.
    public var image: Image { Image(assetName, bundle: DSResources.bundle) }
}

/// Renders a `DSIcon` at its designed size, scaled for Dynamic Type.
///
/// The artwork is vector, so this stays crisp at every Dynamic Type category
/// including the accessibility sizes — the same reason `DSTypeStyle` scales
/// type rather than pinning it to a fixed point size.
public struct DSIconView: View {
    private let icon: DSIcon
    @ScaledMetric private var size: CGFloat

    public init(_ icon: DSIcon, relativeTo textStyle: Font.TextStyle = .body) {
        self.icon = icon
        self._size = ScaledMetric(wrappedValue: icon.nominalSize, relativeTo: textStyle)
    }

    public var body: some View {
        let art = icon.image
            .resizable()
            .scaledToFit()
            .frame(width: size, height: size)

        // Only the semantically-coloured glyphs pin their own tint. Applying
        // foregroundStyle unconditionally (even with Color.primary) would stop
        // every other glyph inheriting the caller's tint, which is the whole
        // point of shipping them as template images.
        if let tint = icon.defaultTint {
            art.foregroundStyle(tint)
        } else {
            art
        }
    }
}

public extension DSIcon {
    /// Convenience: `DSIcon.map.view()`.
    func view(relativeTo textStyle: Font.TextStyle = .body) -> DSIconView {
        DSIconView(self, relativeTo: textStyle)
    }
}

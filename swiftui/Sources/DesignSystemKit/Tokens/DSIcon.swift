import SwiftUI

/// Replaces the spec's six custom icon-set components (Icon14/16/20/24,
/// IconMap, IconWeather) with a single semantic → SF Symbol lookup.
///
/// This is a deliberate platform adaptation, not a 1:1 port: HIG requires
/// using SF Symbols so glyphs automatically match the system's weight,
/// scale with Dynamic Type (via `.imageScale` / text-relative sizing), and
/// render correctly in every color scheme and accessibility setting for
/// free. Shipping custom vector icon sets — as the spec's source design
/// system does — would forgo all of that. `Logo` and `Logos` (brand marks)
/// are intentionally excluded here — they aren't SF Symbols — and are
/// implemented separately in `Components/Icons/` instead.
public enum DSIcon {
    // Generic (formerly Icon14 / Icon16 / Icon20 / Icon24)
    case chevronDown, secured
    case exclamation, externalLink, heart, heartFilled, notified, notNotified
    case search, microphone, check, info, creditCard, showPassword, hidePassword
    case location, map, member, notificationsBell

    // Map context (formerly IconMap)
    case tree, camera, trail

    // Weather (formerly IconWeather)
    case partlyCloudy, sunny, rain, thunderstorm, windy, typhoon, snow

    public var systemName: String {
        switch self {
        case .chevronDown: return "chevron.down"
        case .secured: return "lock.fill"
        case .exclamation: return "exclamationmark.circle.fill"
        case .externalLink: return "arrow.up.right"
        case .heart: return "heart"
        case .heartFilled: return "heart.fill"
        case .notified: return "bell.fill"
        case .notNotified: return "bell.slash"
        case .search: return "magnifyingglass"
        case .microphone: return "mic.fill"
        case .check: return "checkmark"
        case .info: return "info.circle"
        case .creditCard: return "creditcard"
        case .showPassword: return "eye"
        case .hidePassword: return "eye.slash"
        case .location: return "location.fill"
        case .map: return "map.fill"
        case .member: return "person.crop.circle"
        case .notificationsBell: return "bell.badge"
        case .tree: return "tree.fill"
        case .camera: return "camera.fill"
        case .trail: return "figure.hiking"
        case .partlyCloudy: return "cloud.sun.fill"
        case .sunny: return "sun.max.fill"
        case .rain: return "cloud.rain.fill"
        case .thunderstorm: return "cloud.bolt.rain.fill"
        case .windy: return "wind"
        case .typhoon: return "hurricane"
        case .snow: return "cloud.snow.fill"
        }
    }

    /// A `Label`-ready image, always paired with text by call sites per the
    /// spec's recurring accessibility note ("must never be the only carrier
    /// of meaning").
    public var image: Image { Image(systemName: systemName) }
}

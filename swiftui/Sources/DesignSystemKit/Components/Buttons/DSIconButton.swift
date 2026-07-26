import SwiftUI

/// Native port of `icon-button.md` — Figma `Icon Buttons` (node 7297:15056),
/// `State × For? × Type`.
///
/// `Type` is not freely combinable in Figma: Location is authored
/// `Type=Primary` (brand-green circle, **white** glyph) while Save and
/// OfflineMap are `Type=Tertiary` (bare glyph, no background). So the
/// emphasis is derived from the purpose rather than exposed separately.
///
/// Figma also defines a `State=Loading...` alongside `State=Loading`; the two
/// render identically in the file, so only `Loading` is modelled here.
public enum DSIconButtonDownloadState: Equatable {
    case idle
    case downloading(progress: Double)
    case downloaded
}

public enum DSIconButtonPurpose {
    /// `For?=Location, Type=Primary`. `isLocating` is Figma's `State=Enabled`
    /// — actively locating, drawn with the filled GPS glyph.
    case location(isLocating: Bool = false)
    /// `For?=Save, Type=Tertiary`. `State=Clicked` is the filled heart.
    case save(isSaved: Bool)
    /// `For?=OfflineMap, Type=Tertiary`.
    case offlineMap(DSIconButtonDownloadState)
}

enum DSIconButtonEmphasis {
    case primary, tertiary
}

extension DSIconButtonPurpose {
    var emphasis: DSIconButtonEmphasis {
        switch self {
        case .location: return .primary
        case .save, .offlineMap: return .tertiary
        }
    }
}

public struct DSIconButton: View {
    private let purpose: DSIconButtonPurpose
    private let action: () -> Void

    public init(_ purpose: DSIconButtonPurpose, action: @escaping () -> Void) {
        self.purpose = purpose
        self.action = action
    }

    public var body: some View {
        switch purpose {
        case .location(let isLocating):
            button(icon: isLocating ? .gpsFill : .gps, label: "定位")
                .accessibilityAddTraits(isLocating ? .isSelected : [])

        case .save(let isSaved):
            // Figma draws the Clicked heart white — it sits over a photo.
            button(icon: isSaved ? .heartFill : .heart,
                   label: isSaved ? "取消收藏" : "加入收藏",
                   tint: isSaved ? DSColor.white : nil)
                .accessibilityAddTraits(isSaved ? .isSelected : [])

        case .offlineMap(.idle):
            button(icon: .download, label: "離線地圖下載")

        case .offlineMap(.downloading(let progress)):
            Button(action: {}) {
                Text("\(Int(progress * 100))%")
                    // Figma sets these in Label/M — 14pt Semibold.
                    .dsFont(.labelM)
                    .frame(minWidth: 48, minHeight: 48)
            }
            .buttonStyle(DSIconButtonStyle(emphasis: .tertiary, tint: nil))
            .disabled(true)
            .accessibilityLabel("下載中")
            .accessibilityValue(Text("\(Int(progress * 100))%"))

        case .offlineMap(.downloaded):
            Button(action: {}) {
                Text("已下載")
                    .dsFont(.labelM)
                    .frame(minWidth: 48, minHeight: 48)
            }
            .buttonStyle(DSIconButtonStyle(emphasis: .tertiary, tint: nil))
            .disabled(true)
            .accessibilityLabel("已下載")
        }
    }

    private func button(icon: DSIcon, label: String, tint: Color? = nil) -> some View {
        Button(action: action) {
            DSIconView(icon)
                .frame(width: 48, height: 48)
        }
        .buttonStyle(DSIconButtonStyle(emphasis: purpose.emphasis, tint: tint))
        .accessibilityLabel(label)
    }
}

private struct DSIconButtonStyle: ButtonStyle {
    let emphasis: DSIconButtonEmphasis
    /// Overrides the emphasis default. Set only where Figma diverges — the
    /// Save button's Clicked heart is white rather than the Tertiary black.
    var tint: Color? = nil
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        switch emphasis {
        case .primary:
            configuration.label
                // Figma pairs the dark-green fill with a white glyph.
                .foregroundStyle(tint ?? DSColor.white)
                .background(isEnabled ? (configuration.isPressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800) : DSColor.gray400)
                .clipShape(Circle())
                // Pressing drops the shadow, same as `DSButton` — only
                // Default and Enabled are lifted.
                .modifier(DSConditionalElevation(isOn: !configuration.isPressed, level: .level4))
                .dsAnimation(DSMotion.quick, value: configuration.isPressed)
        case .tertiary:
            configuration.label
                .foregroundStyle(isEnabled ? (tint ?? DSColor.black) : DSColor.gray400)
                .opacity(configuration.isPressed ? 0.6 : 1)
                .dsAnimation(DSMotion.quick, value: configuration.isPressed)
        }
    }
}

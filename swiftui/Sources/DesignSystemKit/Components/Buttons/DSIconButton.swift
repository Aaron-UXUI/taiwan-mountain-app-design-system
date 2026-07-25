import SwiftUI

/// Native port of `icon-button.md`. Each purpose supplies its own fixed
/// accessible label per the spec, since the control is icon-only.
public enum DSIconButtonDownloadState: Equatable {
    case idle
    case downloading(progress: Double)
    case downloaded
}

public enum DSIconButtonPurpose {
    case location
    case save(isSaved: Bool)
    case offlineMap(DSIconButtonDownloadState)
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
        case .location:
            button(icon: .gps, label: "定位")
        case .save(let isSaved):
            button(icon: isSaved ? .heartFill : .heart, label: isSaved ? "取消收藏" : "加入收藏")
                .accessibilityAddTraits(isSaved ? .isSelected : [])
        case .offlineMap(.idle):
            button(icon: .map, label: "離線地圖下載")
        case .offlineMap(.downloading(let progress)):
            // OfflineMap is Type=Tertiary in Figma, so no filled circle here
            // either — this case doesn't route through `button(icon:label:)`
            // and so kept its own hardcoded green circle after that fix.
            Button(action: {}) {
                ProgressView(value: progress)
                    .progressViewStyle(.circular)
                    .tint(DSColor.black)
                    .frame(width: 48, height: 48)
            }
            .buttonStyle(DSIconButtonStyle(emphasis: .tertiary))
            .disabled(true)
            .accessibilityLabel("下載中")
            .accessibilityValue(Text("\(Int(progress * 100))%"))
        case .offlineMap(.downloaded):
            button(icon: .check, label: "已下載")
                .disabled(true)
        }
    }

    private func button(icon: DSIcon, label: String) -> some View {
        Button(action: action) {
            DSIconView(icon)
                .frame(width: 48, height: 48)
        }
        .buttonStyle(DSIconButtonStyle(emphasis: purpose.emphasis))
        .accessibilityLabel(label)
    }
}

private extension DSIconButtonPurpose {
    /// Figma `Icon Buttons` (node 7297:15056) carries a `Type` axis alongside
    /// `For?`: Location is authored as `Type=Primary` (filled green circle)
    /// while Save and OfflineMap are `Type=Tertiary` (bare glyph, no fill).
    /// That axis was missing here, so every purpose rendered with the filled
    /// circle — visibly wrong for Save and OfflineMap.
    var emphasis: DSIconButtonEmphasis {
        switch self {
        case .location: return .primary
        case .save, .offlineMap: return .tertiary
        }
    }
}

enum DSIconButtonEmphasis {
    case primary, tertiary
}

private struct DSIconButtonStyle: ButtonStyle {
    let emphasis: DSIconButtonEmphasis
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        switch emphasis {
        case .primary:
            configuration.label
                .foregroundStyle(DSColor.black)
                .background(isEnabled ? (configuration.isPressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800) : DSColor.gray400)
                .clipShape(Circle())
                .dsElevation(.level4)
                .dsAnimation(DSMotion.quick, value: configuration.isPressed)
        case .tertiary:
            configuration.label
                .foregroundStyle(isEnabled ? DSColor.black : DSColor.gray400)
                .opacity(configuration.isPressed ? 0.6 : 1)
                .dsAnimation(DSMotion.quick, value: configuration.isPressed)
        }
    }
}


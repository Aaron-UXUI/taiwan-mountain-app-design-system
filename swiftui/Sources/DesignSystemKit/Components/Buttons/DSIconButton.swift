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
            button(icon: .location, label: "定位")
        case .save(let isSaved):
            button(icon: isSaved ? .heartFilled : .heart, label: isSaved ? "取消收藏" : "加入收藏")
                .accessibilityAddTraits(isSaved ? .isSelected : [])
        case .offlineMap(.idle):
            button(icon: .map, label: "離線地圖下載")
        case .offlineMap(.downloading(let progress)):
            Button(action: {}) {
                ProgressView(value: progress)
                    .progressViewStyle(.circular)
                    .tint(DSColor.black)
            }
            .frame(width: 48, height: 48)
            .background(DSColor.primaryGreen800)
            .clipShape(Circle())
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
            icon.image
                .imageScale(.large)
                .frame(width: 48, height: 48)
        }
        .buttonStyle(DSIconButtonStyle())
        .accessibilityLabel(label)
    }
}

private struct DSIconButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundStyle(DSColor.black)
            .background(isEnabled ? (configuration.isPressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800) : DSColor.gray400)
            .clipShape(Circle())
            .dsElevation(.level4)
            .dsAnimation(DSMotion.quick, value: configuration.isPressed)
    }
}


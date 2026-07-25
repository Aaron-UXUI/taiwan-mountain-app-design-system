import SwiftUI

/// Native port of `button.md`. Disabled state is intentionally **not** a
/// custom enum case — call sites use SwiftUI's own `.disabled(_:)` modifier,
/// which this style already reads via `@Environment(\.isEnabled)`, so a
/// `DSButton` composes with the rest of the environment (forms, disabled
/// sections, etc.) exactly like a native `Button` would.
///
/// "Pressing" from the spec is the native `ButtonStyleConfiguration.isPressed`
/// value — no custom gesture recognizer is needed to get press feedback.
public enum DSButtonEmphasis {
    case primary, secondary, tertiary
}

public enum DSButtonSize: Equatable {
    case large, small

    var typeStyle: DSTypeStyle {
        switch self {
        case .large: return .headline4
        case .small: return .bodyM
        }
    }

    var verticalPadding: CGFloat { self == .large ? DSSpacing.m : DSSpacing.s }
    var horizontalPadding: CGFloat { self == .large ? DSSpacing.lm : DSSpacing.m }
}

public struct DSButton: View {
    private let title: String
    private let emphasis: DSButtonEmphasis
    private let size: DSButtonSize
    private let isLoading: Bool
    private let action: () -> Void

    public init(
        _ title: String,
        emphasis: DSButtonEmphasis = .primary,
        size: DSButtonSize = .large,
        isLoading: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.emphasis = emphasis
        self.size = size
        self.isLoading = isLoading
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(title)
        }
        .buttonStyle(DSButtonStyle(emphasis: emphasis, size: size, isLoading: isLoading))
        .disabled(isLoading)
        .accessibilityValue(isLoading ? Text("In progress", comment: "Button loading state") : Text(""))
    }
}

struct DSButtonStyle: ButtonStyle {
    let emphasis: DSButtonEmphasis
    let size: DSButtonSize
    let isLoading: Bool
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        HStack(spacing: DSSpacing.s) {
            if isLoading {
                ProgressView()
                    .tint(foreground)
            } else {
                configuration.label
                    .dsFont(size.typeStyle)
            }
        }
        .padding(.vertical, size.verticalPadding)
        .padding(.horizontal, size.horizontalPadding)
        .frame(maxWidth: emphasis == .primary ? .infinity : nil)
        .foregroundStyle(foreground)
        .background(background(pressed: configuration.isPressed, enabled: isEnabled))
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
        .dsElevation(emphasis == .tertiary ? .level1 : .level3)
        .dsAnimation(DSMotion.quick, value: configuration.isPressed)
    }

    private var foreground: Color {
        switch emphasis {
        case .primary: return DSColor.white
        case .secondary, .tertiary: return DSColor.primaryGreen800
        }
    }

    private func background(pressed: Bool, enabled: Bool) -> Color {
        guard enabled else { return DSColor.gray400 }
        switch emphasis {
        case .primary: return pressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800
        case .secondary: return pressed ? DSColor.primaryGreen100 : DSColor.primaryGreen50
        case .tertiary: return .clear
        }
    }
}


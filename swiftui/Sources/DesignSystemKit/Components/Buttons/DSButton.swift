import SwiftUI

/// Native port of `button.md` — Figma `Buttons` (node 425:5337).
///
/// Disabled state is intentionally **not** a custom enum case — call sites use
/// SwiftUI's own `.disabled(_:)` modifier, which this style already reads via
/// `@Environment(\.isEnabled)`, so a `DSButton` composes with the rest of the
/// environment (forms, disabled sections, etc.) exactly like a native `Button`.
///
/// "Pressing" from the spec is the native `ButtonStyleConfiguration.isPressed`
/// value — no custom gesture recognizer is needed to get press feedback.
///
/// Figma defines 19 of the 24 Type × Size × State combinations. Small has no
/// Loading state at any emphasis, so the loading initializer below pins the
/// size to Large — asking for a Small spinner no longer compiles. (Tertiary/
/// Small exists only as Default, but Pressing and Disabled come from the
/// environment rather than a parameter, so they are not constrained here.)
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

    /// Figma: Large is 44pt tall with 12/16 padding, Small 36pt with 8/12.
    var minHeight: CGFloat { self == .large ? 44 : 36 }
    var verticalPadding: CGFloat { self == .large ? DSSpacing.sm : DSSpacing.s }
    var horizontalPadding: CGFloat { self == .large ? DSSpacing.m : DSSpacing.sm }
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
        action: @escaping () -> Void
    ) {
        self.title = title
        self.emphasis = emphasis
        self.size = size
        self.isLoading = false
        self.action = action
    }

    /// Loading is authored only at Large in Figma, so this overload pins the
    /// size rather than letting a caller ask for a Small spinner that has no
    /// design behind it.
    public init(
        _ title: String,
        emphasis: DSButtonEmphasis = .primary,
        isLoading: Bool,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.emphasis = emphasis
        self.size = .large
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

/// The three visual treatments, resolved per emphasis × state straight from
/// the Figma component.
private struct DSButtonAppearance {
    let background: Color
    let border: Color?
    let foreground: Color
    let hasElevation: Bool

    static func resolve(
        emphasis: DSButtonEmphasis,
        pressed: Bool,
        enabled: Bool
    ) -> DSButtonAppearance {
        switch emphasis {
        case .primary:
            if !enabled {
                // Figma tints the *fill* pale green and greys the label —
                // it does not grey the whole button out.
                return .init(background: DSColor.primaryGreen50, border: nil,
                             foreground: DSColor.gray400, hasElevation: false)
            }
            // Pressing drops the shadow in Figma — the button sinks rather
            // than staying lifted. Only the resting and Loading states carry
            // elevation.
            return .init(background: pressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800,
                         border: nil, foreground: DSColor.white, hasElevation: !pressed)

        case .secondary:
            // Secondary is a white button with a green outline, not a tinted fill.
            if !enabled {
                return .init(background: DSColor.white, border: DSColor.primaryGreen100,
                             foreground: DSColor.primaryGreen100, hasElevation: false)
            }
            return .init(background: pressed ? DSColor.primaryGreen50 : DSColor.white,
                         border: pressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800,
                         foreground: pressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800,
                         hasElevation: !pressed)

        case .tertiary:
            // No fill and no elevation at rest; pressing tints the background
            // pale green (visible in the Figma component, and the one place
            // the React port also gets this wrong).
            if !enabled {
                return .init(background: .clear, border: nil,
                             foreground: DSColor.primaryGreen100, hasElevation: false)
            }
            return .init(background: pressed ? DSColor.primaryGreen50 : .clear, border: nil,
                         foreground: pressed ? DSColor.primaryGreen900 : DSColor.primaryGreen800,
                         hasElevation: false)
        }
    }
}

struct DSButtonStyle: ButtonStyle {
    let emphasis: DSButtonEmphasis
    let size: DSButtonSize
    let isLoading: Bool
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        let look = DSButtonAppearance.resolve(
            emphasis: emphasis,
            pressed: configuration.isPressed,
            // `.disabled(isLoading)` on the button keeps a Loading button
            // non-interactive, but that also drives `isEnabled` false — which
            // would resolve the *Disabled* appearance. Figma's Loading is the
            // enabled fill (green-800 with elevation for Primary), so loading
            // counts as enabled for appearance purposes.
            enabled: isEnabled || isLoading
        )
        let shape = RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)

        return HStack(spacing: DSSpacing.s) {
            if isLoading {
                // Figma drops the label and centres the 40pt brand spinner —
                // On Dark inside a Primary fill, On White otherwise, which is
                // exactly the resolved foreground.
                DSSpinner(tint: look.foreground)
            } else {
                configuration.label.dsFont(size.typeStyle)
            }
        }
        // The 40pt spinner already fills the button's fixed height, so the
        // vertical padding would push it past it.
        .padding(.vertical, isLoading ? 0 : size.verticalPadding)
        .padding(.horizontal, size.horizontalPadding)
        // Figma sizes Large to the full content width and lets Small hug its
        // label — it is the size, not the emphasis, that drives this.
        .frame(maxWidth: size == .large ? .infinity : nil, minHeight: size.minHeight)
        .foregroundStyle(look.foreground)
        .background(look.background)
        .clipShape(shape)
        .overlay {
            if let border = look.border {
                shape.strokeBorder(border, lineWidth: 1)
            }
        }
        // Disabled and Tertiary carry no shadow at all in Figma — applying
        // even `.level1` here would put one back.
        .modifier(DSConditionalElevation(isOn: look.hasElevation))
        .dsAnimation(DSMotion.quick, value: configuration.isPressed)
    }
}

/// Applies an elevation only when the resolved appearance calls for it.
/// A plain ternary can't express "no shadow", since every `DSElevationStyle`
/// draws something. Shared with `DSIconButton`, which has the same
/// "pressing removes the shadow" rule.
struct DSConditionalElevation: ViewModifier {
    let isOn: Bool
    var level: DSElevationStyle = .level3

    func body(content: Content) -> some View {
        if isOn {
            content.dsElevation(level)
        } else {
            content
        }
    }
}

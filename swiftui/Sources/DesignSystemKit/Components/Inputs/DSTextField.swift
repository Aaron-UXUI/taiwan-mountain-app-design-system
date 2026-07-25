import SwiftUI

/// Native port of `text-field.md`, built on SwiftUI's `TextField`. Default /
/// Typing / Typed from the spec are derived from native `@FocusState` plus
/// whether the field is empty — not a separate state enum — so the control
/// composes with the system's own focus/keyboard management instead of
/// fighting it.
public enum DSTextFieldSize {
    case s, m, l, xl

    var typeStyle: DSTypeStyle {
        switch self {
        case .s: return .bodyS
        case .m: return .bodyM
        case .l, .xl: return .bodyL
        }
    }
}

public struct DSTextField: View {
    private let label: String
    @Binding private var text: String
    private let size: DSTextFieldSize
    private let errorMessage: String?
    @FocusState private var isFocused: Bool

    public init(_ label: String, text: Binding<String>, size: DSTextFieldSize = .m, errorMessage: String? = nil) {
        self.label = label
        self._text = text
        self.size = size
        self.errorMessage = errorMessage
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.xs) {
            Text(label)
                .dsFont(.bodyS)
                .foregroundStyle(DSColor.gray800)

            TextField("", text: $text)
                .dsFont(size.typeStyle)
                .focused($isFocused)
                .padding(.vertical, DSSpacing.s)
                .padding(.horizontal, DSSpacing.xs)
                .background(DSColor.white)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous)
                        .strokeBorder(borderColor, lineWidth: isFocused ? 2 : 1)
                )
                .dsAnimation(DSMotion.quick, value: isFocused)
                .accessibilityLabel(label)
                .accessibilityHint(errorMessage ?? "")

            if let errorMessage {
                Text(errorMessage)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.destruct700)
            }
        }
    }

    private var borderColor: Color {
        // Figma: Default/Typed sit on a light grey rule, Typing darkens to
        // near-black, Error is red. The focus ring was brand green here, which
        // is not a colour this component uses in the design.
        if errorMessage != nil { return DSColor.destruct600 }
        return isFocused ? DSColor.black : DSColor.gray400
    }
}

import SwiftUI

/// Native port of `text-field.md`, built on SwiftUI's `TextField`. Default /
/// Typing / Typed from the spec are derived from native `@FocusState` plus
/// whether the field is empty — not a separate state enum — so the control
/// composes with the system's own focus/keyboard management instead of
/// fighting it.
/// Figma's S / M / L / XL are **widths** (88 / 120 / 180 / 327), not type
/// sizes — every size renders its value at the same Label/L 16pt. This enum
/// previously mapped the axis onto three different type styles, which shrank
/// the smaller fields' text to 12pt and 14pt.
public enum DSTextFieldSize {
    case s, m, l, xl

    var width: CGFloat {
        switch self {
        case .s: return 88
        case .m: return 120
        case .l: return 180
        case .xl: return 327
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
            // Figma: the field label is body/M — 14pt, black. It was 12pt grey.
            Text(label)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.black)

            // Fixed 40pt tall, 8pt horizontal padding, no vertical padding.
            TextField("", text: $text)
                .dsFont(.bodyL)
                .foregroundStyle(DSColor.black)
                .focused($isFocused)
                .padding(.horizontal, DSSpacing.s)
                .frame(width: size.width, height: 40)
                .background(DSColor.white)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous)
                        .strokeBorder(borderColor, lineWidth: borderWidth)
                )
                .dsAnimation(DSMotion.quick, value: isFocused)
                .accessibilityLabel(label)
                .accessibilityHint(errorMessage ?? "")

            if let errorMessage {
                // Figma pairs the error copy with the 16pt exclamation glyph.
                HStack(spacing: DSSpacing.xs) {
                    DSIconView(.exclamation)
                        .foregroundStyle(DSColor.destruct700)
                        .accessibilityHidden(true)
                    Text(errorMessage)
                        .dsFont(.bodyS)
                        .foregroundStyle(DSColor.destruct700)
                }
            }
        }
    }

    /// Figma: the rule is gray-800 in every non-error state — it only changes
    /// *weight*, thickening from 1pt to 2pt while typing. Error swaps to a 2pt
    /// destruct-600. This previously sat on gray-400 and jumped to pure black
    /// on focus, and drew the error rule at 1pt unless the field was focused.
    private var borderColor: Color {
        errorMessage != nil ? DSColor.destruct600 : DSColor.gray800
    }

    private var borderWidth: CGFloat {
        (errorMessage != nil || isFocused) ? 2 : 1
    }
}

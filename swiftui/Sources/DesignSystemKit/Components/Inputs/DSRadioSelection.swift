import SwiftUI

/// Native port of `radio-button.md`.
///
/// A standalone radio button isn't a native iOS control — HIG's own pattern
/// for "exactly one choice from a visible list" is the row + trailing
/// checkmark idiom used throughout Settings. That idiom maps directly onto
/// SwiftUI's `Picker` with `.pickerStyle(.inline)`, which gives correct
/// VoiceOver grouping and "selected" announcements for free, so the
/// `radioStyle: .default` case is implemented as a thin `Picker` wrapper
/// rather than hand-rolled rows.
///
/// `radioStyle: .expanded` (reveal a text field under the selected option)
/// isn't expressible through `Picker`'s row content, so that variant is a
/// second, separate view built from plain rows — two native compositions
/// for two variants, rather than one component branching internally.
public struct DSRadioOption: Identifiable, Hashable {
    public let id: String
    public let label: String

    public init(id: String, label: String) {
        self.id = id
        self.label = label
    }
}

/// `radioStyle: Default`
public struct DSRadioSelectionList: View {
    private let options: [DSRadioOption]
    @Binding private var selectedID: String

    public init(options: [DSRadioOption], selectedID: Binding<String>) {
        self.options = options
        self._selectedID = selectedID
    }

    public var body: some View {
        // Figma draws an actual radio control: a leading ring that fills with
        // a brand-green dot when chosen, an optional trailing accessory, and a
        // rule under each row. This previously used `Picker(.inline)`, which
        // renders as a trailing checkmark list — the HIG idiom, but visibly
        // not the designed control, so it is drawn here instead. The rows keep
        // real radio semantics via `.isSelected` inside an
        // `accessibilityElement(children: .contain)` group.
        VStack(spacing: 0) {
            ForEach(options) { option in
                Button {
                    selectedID = option.id
                } label: {
                    // Figma: 48pt row, 8pt between mark and label, 12pt
                    // vertical / 4pt trailing padding.
                    HStack(spacing: DSSpacing.s) {
                        DSRadioMark(isOn: selectedID == option.id)
                        Text(option.label)
                            .dsFont(.bodyL)
                            .foregroundStyle(DSColor.black)
                        Spacer(minLength: 0)
                    }
                    .padding(.vertical, DSSpacing.sm)
                    .padding(.trailing, DSSpacing.xs)
                    .frame(minHeight: 48)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(selectedID == option.id ? [.isSelected, .isButton] : .isButton)
                .overlay(alignment: .bottom) {
                    DSColor.gray200.frame(height: 1)
                }
            }
        }
        .accessibilityElement(children: .contain)
    }
}

/// The radio control. Figma uses the `icon / 24px, Type=Radio` component —
/// a real exported vector already in the icon set — inside a 24pt box, not a
/// hand-drawn ring. The previous version approximated it with two `Circle`s
/// at the wrong stroke weight and grey.
struct DSRadioMark: View {
    let isOn: Bool

    var body: some View {
        DSIconView(isOn ? .radioFill : .radio)
            .frame(width: 24, height: 24)
            .accessibilityHidden(true)
    }
}

/// `radioStyle: Expanded` — selecting an option with a non-nil
/// `expandedPlaceholder` reveals an inline text field for a custom value.
public struct DSExpandableRadioOption: Identifiable, Hashable {
    public let id: String
    public let label: String
    public let expandedPlaceholder: String?

    public init(id: String, label: String, expandedPlaceholder: String? = nil) {
        self.id = id
        self.label = label
        self.expandedPlaceholder = expandedPlaceholder
    }
}

public struct DSExpandableRadioSelectionList: View {
    private let options: [DSExpandableRadioOption]
    @Binding private var selectedID: String
    @Binding private var customValue: String

    public init(options: [DSExpandableRadioOption], selectedID: Binding<String>, customValue: Binding<String>) {
        self.options = options
        self._selectedID = selectedID
        self._customValue = customValue
    }

    public var body: some View {
        ForEach(options) { option in
            VStack(alignment: .leading, spacing: DSSpacing.xs) {
                Button {
                    selectedID = option.id
                } label: {
                    HStack(spacing: DSSpacing.s) {
                        DSRadioMark(isOn: selectedID == option.id)
                        Text(option.label)
                            .dsFont(.bodyL)
                            .foregroundStyle(DSColor.black)
                        Spacer(minLength: 0)
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(selectedID == option.id ? .isSelected : [])

                if selectedID == option.id, let placeholder = option.expandedPlaceholder {
                    // Figma indents the field by a blank the width of the
                    // radio mark, then draws the same 40pt / 4pt-radius input
                    // as Text Field (at the L width) — not a system
                    // `.roundedBorder` field.
                    HStack(spacing: DSSpacing.s) {
                        Color.clear.frame(width: 24, height: 24)
                        TextField(placeholder, text: $customValue)
                            .dsFont(.bodyL)
                            .foregroundStyle(DSColor.black)
                            .padding(.horizontal, DSSpacing.s)
                            .frame(width: 180, height: 40)
                            .background(DSColor.white)
                            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
                            .overlay(
                                RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous)
                                    .strokeBorder(DSColor.gray400, lineWidth: 1)
                            )
                            .accessibilityLabel(placeholder)
                    }
                }
            }
            .padding(.vertical, DSSpacing.sm)
            .padding(.trailing, DSSpacing.xs)
            .overlay(alignment: .bottom) { DSColor.gray200.frame(height: 1) }
            .dsAnimation(DSMotion.standard, value: selectedID)
        }
    }
}

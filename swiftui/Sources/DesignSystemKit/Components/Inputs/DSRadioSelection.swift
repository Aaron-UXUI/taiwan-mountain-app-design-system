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
                    HStack(spacing: DSSpacing.sm) {
                        DSRadioMark(isOn: selectedID == option.id)
                        Text(option.label)
                            .dsFont(.bodyL)
                            .foregroundStyle(DSColor.black)
                        Spacer(minLength: 0)
                    }
                    .padding(.vertical, DSSpacing.sm)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(selectedID == option.id ? [.isSelected, .isButton] : .isButton)

                Divider()
            }
        }
        .accessibilityElement(children: .contain)
    }
}

/// The radio ring itself — Figma uses a 20pt ring with a filled centre.
struct DSRadioMark: View {
    let isOn: Bool

    var body: some View {
        ZStack {
            Circle()
                .strokeBorder(isOn ? DSColor.primaryGreen800 : DSColor.gray400, lineWidth: 1.5)
                .frame(width: 20, height: 20)
            if isOn {
                Circle()
                    .fill(DSColor.primaryGreen800)
                    .frame(width: 10, height: 10)
            }
        }
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
                    HStack(spacing: DSSpacing.sm) {
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
                    TextField(placeholder, text: $customValue)
                        .dsFont(.bodyM)
                        .textFieldStyle(.roundedBorder)
                        .accessibilityLabel(placeholder)
                }
            }
            .dsAnimation(DSMotion.standard, value: selectedID)
        }
    }
}

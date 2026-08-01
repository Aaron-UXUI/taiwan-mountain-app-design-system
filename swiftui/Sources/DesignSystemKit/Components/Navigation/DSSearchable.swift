import SwiftUI

/// Native port of `search-bar.md` — Figma `Search Bar` (node 376:456).
///
/// Figma's search bar is **not** the system search field. It is a composed
/// control that lives in page content: a 48pt bordered, elevated, 12pt-radius
/// field holding a 20pt magnifier, the query, and a 48pt microphone button —
/// with a *separate* 48pt filter button as a sibling beside it.
///
/// `.searchable(text:)` cannot express that. It renders a grey capsule inside
/// the navigation bar and has no room for a mic button or a sibling control;
/// the earlier port papered over the difference by telling callers to add the
/// filter action as a toolbar item, which puts it somewhere else on screen
/// entirely. So the designed control is built here.
///
/// `dsSearchable` is kept below for the cases that genuinely want the *system*
/// search affordance (a searchable list, where iOS's scroll-to-reveal and
/// Cancel behaviour is the right thing) — but `DSSearchBar` is the port of the
/// Figma component.
public struct DSSearchBar: View {
    @Binding private var text: String
    private let prompt: String
    private let showsMicrophone: Bool
    private let onMicrophoneTap: (() -> Void)?
    private let onFilterTap: (() -> Void)?
    private let onSubmit: () -> Void
    @FocusState private var isFocused: Bool

    public init(
        text: Binding<String>,
        prompt: String = "搜尋",
        showsMicrophone: Bool = true,
        onMicrophoneTap: (() -> Void)? = nil,
        onFilterTap: (() -> Void)? = nil,
        onSubmit: @escaping () -> Void = {}
    ) {
        self._text = text
        self.prompt = prompt
        self.showsMicrophone = showsMicrophone
        self.onMicrophoneTap = onMicrophoneTap
        self.onFilterTap = onFilterTap
        self.onSubmit = onSubmit
    }

    public var body: some View {
        HStack(spacing: DSSpacing.s) {
            field
            if let onFilterTap {
                Button(action: onFilterTap) {
                    DSIconView(.filter)
                        .frame(width: 24, height: 24)
                        .padding(DSSpacing.s)
                        .frame(width: 48, height: 48)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .foregroundStyle(DSColor.black)
                .background(DSColor.white, in: shape)
                .overlay { shape.strokeBorder(DSColor.gray200, lineWidth: 1) }
                .dsElevation(.level3)
                .accessibilityLabel("篩選")
            }
        }
    }

    private var shape: RoundedRectangle {
        RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
    }

    private var field: some View {
        HStack(spacing: DSSpacing.s) {
            DSIconView(.search20)
                .foregroundStyle(DSColor.black)
                .accessibilityHidden(true)

            // The placeholder is gray-600 in Figma, which SwiftUI will only
            // honour through a styled `prompt` — passing the string as the
            // title leaves it on the system's own placeholder colour.
            TextField("", text: $text, prompt: Text(prompt).foregroundColor(DSColor.gray600))
                .dsFont(.bodyL)
                .foregroundStyle(DSColor.black)
                .focused($isFocused)
                .submitLabel(.search)
                .onSubmit(onSubmit)
                .accessibilityLabel(prompt)

            if showsMicrophone {
                Button {
                    onMicrophoneTap?()
                } label: {
                    DSIconView(.microphone)
                        .padding(DSSpacing.sm)
                        .frame(width: 48, height: 48)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .foregroundStyle(DSColor.black)
                .disabled(onMicrophoneTap == nil)
                .accessibilityLabel("語音搜尋")
            }
        }
        // Figma: 12pt leading, no trailing inset — the mic button carries its
        // own 12pt — on a fixed 48pt field.
        .padding(.leading, DSSpacing.sm)
        .padding(.vertical, DSSpacing.s)
        .frame(height: 48)
        .background(DSColor.white, in: shape)
        .overlay { shape.strokeBorder(DSColor.gray200, lineWidth: 1) }
        .dsElevation(.level3)
    }
}

public extension View {
    /// The *system* search affordance, for screens where iOS's own
    /// scroll-to-reveal search and Cancel behaviour is wanted. For the Figma
    /// `Search Bar` component, use `DSSearchBar` instead.
    func dsSearchable(
        text: Binding<String>,
        prompt: String = "搜尋",
        historyItems: [String] = [],
        suggestionItems: [String] = [],
        onSubmit: @escaping () -> Void = {}
    ) -> some View {
        searchable(text: text, prompt: prompt)
            .searchSuggestions {
                if text.wrappedValue.isEmpty, !historyItems.isEmpty {
                    Section("最近搜尋") {
                        ForEach(historyItems, id: \.self) { item in
                            Text(item).searchCompletion(item)
                        }
                    }
                }
                ForEach(suggestionItems, id: \.self) { item in
                    Text(item).searchCompletion(item)
                }
            }
            .onSubmit(of: .search, onSubmit)
    }
}

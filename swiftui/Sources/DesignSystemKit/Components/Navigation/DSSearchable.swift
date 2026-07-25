import SwiftUI

/// Native port of `search-bar.md`, built entirely on `.searchable(text:)` —
/// it already provides the Default/Focused/Typing appearances, the Cancel
/// action, and correct combobox-style VoiceOver behavior for its
/// suggestions, all natively. History and suggestion items map onto
/// `.searchSuggestions`; the spec's separate "filter" action is added by the
/// screen itself as an ordinary toolbar item alongside this modifier.
public extension View {
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

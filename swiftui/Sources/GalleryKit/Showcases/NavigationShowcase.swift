import SwiftUI
import DesignSystemKit

struct NavigationShowcase: View {
    @State private var tabSelection: DSAppDestination = .map
    @State private var searchText = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "AppBar (nav)") {
                    NavigationStack {
                        Text("內容區域")
                            .foregroundStyle(.secondary)
                            .frame(maxWidth: .infinity, minHeight: 120)
                            .dsAppBar(title: "步道詳情") {}
                    }
                    .frame(height: 180)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
                GallerySection(title: "AppBar (ProfileInfo)") {
                    NavigationStack {
                        Text("內容區域")
                            .foregroundStyle(.secondary)
                            .frame(maxWidth: .infinity, minHeight: 120)
                            .dsProfileAppBar(name: "王小明", avatarURL: nil) {}
                    }
                    .frame(height: 180)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
                GallerySection(title: "NavigationBar (TabView)") {
                    DSAppTabView(selection: $tabSelection, newsBadgeCount: 2) {
                        Text("探索內容")
                    } map: {
                        Text("地圖內容")
                    } news: {
                        Text("消息內容")
                    } member: {
                        Text("會員內容")
                    }
                    .frame(height: 240)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
                GallerySection(title: "BottomBar") {
                    NavigationStack {
                        Text("內容區域")
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                            .dsBottomBar(.buttonWithShortcut(
                                title: "確認",
                                action: {},
                                shortcutTitle: "地圖",
                                shortcutIcon: .map,
                                shortcutAction: {}
                            ))
                    }
                    .frame(height: 180)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
                GallerySection(title: "SearchBar — Figma component") {
                    DSSearchBar(text: $searchText, onMicrophoneTap: {}, onFilterTap: {})
                }
                GallerySection(title: "SearchBar — system .searchable") {
                    NavigationStack {
                        List(1..<4) { i in Text("結果 \(i)") }
                            .dsSearchable(text: $searchText, historyItems: ["陽明山", "擎天崗"], suggestionItems: ["陽明山國家公園"])
                    }
                    .frame(height: 240)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
            }
            .padding()
        }
    }
}

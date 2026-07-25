import SwiftUI
import DesignSystemKit

struct NavigationShowcase: View {
    @State private var tabSelection: DSAppDestination = .map
    @State private var searchText = ""
    @State private var customTab = "map"

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
                    DSAppTabView(selection: $tabSelection, notifyBadgeCount: 2) {
                        Text("活動內容")
                    } map: {
                        Text("地圖內容")
                    } notify: {
                        Text("通知內容")
                    } member: {
                        Text("會員內容")
                    }
                    .frame(height: 240)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
                GallerySection(title: "CheckBoxNavigation") {
                    HStack(spacing: 8) {
                        DSCheckBoxNavigation(label: "活動", systemImage: "figure.hiking", isActive: customTab == "activity") {
                            customTab = "activity"
                        }
                        DSCheckBoxNavigation(label: "地圖", systemImage: "map.fill", isActive: customTab == "map") {
                            customTab = "map"
                        }
                        DSCheckBoxNavigation(label: "通知", systemImage: "bell.fill", isActive: customTab == "notify", badge: .count(2)) {
                            customTab = "notify"
                        }
                        DSCheckBoxNavigation(label: "會員", systemImage: "person.crop.circle", isActive: customTab == "member", badge: .dot) {
                            customTab = "member"
                        }
                    }
                }
                GallerySection(title: "BottomBar") {
                    NavigationStack {
                        Text("內容區域")
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                            .dsBottomBar(.twoButtons(secondaryTitle: "取消", secondaryAction: {}, primaryTitle: "確認", primaryAction: {}))
                    }
                    .frame(height: 180)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.secondary.opacity(0.2)))
                }
                GallerySection(title: "SearchBar (.searchable)") {
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

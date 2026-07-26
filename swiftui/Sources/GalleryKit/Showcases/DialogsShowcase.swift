import SwiftUI
import DesignSystemKit

struct DialogsShowcase: View {
    @State private var showFilterSheet = false
    @State private var showMapInfoSheet = false
    @State private var showSearchSheet = false
    @State private var showTooltip = false
    @State private var showSnackbar = false
    @State private var showBanner = false
    @State private var accordionExpanded = false
    @State private var checkedOptions: Set<String> = []
    @State private var chipsExpanded = false
    @State private var selectedChips: Set<String> = []
    @State private var filterSort: DSSegmentSide = .left
    @State private var tabSelection = "a"

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "BottomSheet") {
                    VStack(spacing: 12) {
                        DSButton("Filter_Discover") { showFilterSheet = true }
                        DSButton("Map_Info", emphasis: .secondary) { showMapInfoSheet = true }
                        DSButton("Filter_MapSearch", emphasis: .tertiary) { showSearchSheet = true }
                    }
                }
                GallerySection(title: "Tooltip") {
                    DSButton("顯示提示", emphasis: .tertiary) { showTooltip = true }
                        .dsTooltip(isPresented: $showTooltip, text: "步道全長 4.2 公里")
                }
                GallerySection(title: "Snackbar") {
                    DSButton("顯示 Snackbar", emphasis: .secondary) { showSnackbar = true }
                }
                GallerySection(title: "Banner") {
                    DSToggle("顯示離線提示", isOn: $showBanner)
                }
                GallerySection(title: "AccordionCheckBox") {
                    DSAccordionCheckBox(
                        title: "難度",
                        options: ["簡單", "中等", "困難"],
                        isExpanded: $accordionExpanded,
                        checkedOptions: $checkedOptions
                    )
                }
                GallerySection(title: "AccordionChips") {
                    DSAccordionChips(
                        title: "設施",
                        options: ["廁所", "停車場", "涼亭", "飲水機"],
                        isExpanded: $chipsExpanded,
                        selectedOptions: $selectedChips
                    )
                }
                GallerySection(title: "CollapseText") {
                    DSCollapseText(
                        "陽明山國家公園是台灣唯一以火山地質景觀為主的國家公園,園區內擁有豐富的動植物生態與溫泉資源,每年吸引大量遊客前來健行賞花。",
                        collapsedLineLimit: 2
                    )
                }
                GallerySection(title: "TabBar") {
                    DSTabBar(
                        tabs: [
                            .init(id: "a", title: "全部"),
                            .init(id: "b", title: "已收藏", badgeCount: 3),
                            .init(id: "c", title: "最近瀏覽")
                        ],
                        selection: $tabSelection
                    )
                }
            }
            .padding()
        }
        .dsSnackbar(isPresented: $showSnackbar, message: "已加入收藏")
        .dsBanner(isPresented: showBanner, message: "目前為離線模式,部分資訊可能未更新")
        .dsBottomSheet(isPresented: $showFilterSheet) {
            DSFilterDiscoverSheet(
                sortLeading: "瀏覽數",
                sortTrailing: "距離",
                sortSelection: $filterSort,
                checkBoxGroup: .init(title: "園區", options: ["內洞", "滿月圓", "東眼山"]),
                chipsGroups: [
                    .init(title: "景點主題", options: ["日出", "賞花", "瀑布", "吊橋", "森林浴"]),
                    .init(title: "難度", options: ["簡單", "中等", "困難"]),
                    .init(title: "設施", options: ["廁所", "停車場"])
                ]
            )
        }
        .dsBottomSheet(isPresented: $showMapInfoSheet) {
            DSMapInfoSheet(
                photoURL: nil,
                title: "陽明山國家公園",
                statusLabel: "今日開放",
                crowdedness: .partial,
                tags: ["步道", "停車場", "涼亭"],
                isSaved: .constant(false)
            )
        }
        .dsBottomSheet(isPresented: $showSearchSheet) {
            DSFilterMapSearchSheet(results: [
                .init(id: "1", imageURL: nil, siteName: "陽明山國家公園", location: "台北市北投區"),
                .init(id: "2", imageURL: nil, siteName: "擎天崗", location: "台北市士林區")
            ])
        }
    }
}

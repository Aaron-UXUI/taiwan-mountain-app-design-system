import SwiftUI
import DesignSystemKit

struct ButtonsShowcase: View {
    @State private var isLoading = false
    @State private var chipASelected = false
    @State private var chipBSelected = true

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "Button") {
                    VStack(spacing: 12) {
                        DSButton("繼續") {}
                        DSButton("取消", emphasis: .secondary) {}
                        DSButton("略過", emphasis: .tertiary, size: .small) {}
                        DSButton(isLoading ? "處理中" : "送出登入", isLoading: isLoading) {
                            isLoading = true
                            Task {
                                try? await Task.sleep(nanoseconds: 1_500_000_000)
                                isLoading = false
                            }
                        }
                    }
                }
                GallerySection(title: "IconButton") {
                    HStack(spacing: 16) {
                        // Figma Icon Buttons: Location is Type=Primary
                        // (green circle, white glyph); Save and OfflineMap
                        // are Type=Tertiary (bare glyph).
                        DSIconButton(.location()) {}
                        DSIconButton(.location(isLocating: true)) {}
                        DSIconButton(.save(isSaved: false)) {}
                        DSIconButton(.offlineMap(.idle)) {}
                        DSIconButton(.offlineMap(.downloading(progress: 0.6))) {}
                        DSIconButton(.offlineMap(.downloaded)) {}
                    }
                }
                GallerySection(title: "Link / LinkFurtherInfo") {
                    VStack(alignment: .leading, spacing: 12) {
                        DSLink("了解更多") {}
                        DSLinkFurtherInfo("查看更多資訊") {}
                    }
                }
                GallerySection(title: "Chips") {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack(spacing: 12) {
                            DSChip("親子友善", isSelected: $chipASelected)
                            DSChip("步道", size: .small, isSelected: $chipBSelected)
                        }
                        HStack(spacing: 12) {
                            DSSalientTag("特別活動", kind: .special)
                            DSSalientTag("天候警示", kind: .warning)
                        }
                    }
                }
            }
            .padding()
        }
    }
}

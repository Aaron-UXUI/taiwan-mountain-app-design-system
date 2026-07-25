import SwiftUI
import DesignSystemKit

struct CardsShowcase: View {
    @State private var sceneSaved = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "CardScene") {
                    DSCardScene(
                        imageURL: nil,
                        siteName: "陽明山國家公園",
                        location: "台北市北投區",
                        distance: "3.2km",
                        isFamilyFriendly: true,
                        statusLabel: "今日開放",
                        isSaved: $sceneSaved
                    )
                    .frame(height: 236)
                }
                GallerySection(title: "CardDescription") {
                    DSCardDescription(title: "關於步道", body: "本步道全長 4.2 公里,沿途設有休息座椅與觀景平台。")
                }
                GallerySection(title: "CardTickets") {
                    DSCardTickets(scene: "陽明山國家公園", ticketType: "全票 x2", additionalItem: "接駁券 x2", due: "2026/08/01 前有效", price: "NT$300")
                }
                GallerySection(title: "CardNotification") {
                    DSCardNotification(headline: "步道即將關閉維護", body: "受颱風影響,本步道將於明日休園一天。", time: "10 分鐘前", isUnread: true)
                }
                GallerySection(title: "CardSavedItems") {
                    DSCardSavedItems(title: "我的收藏 · 北部步道", isLiked: true, photoURLs: [])
                        .frame(height: 160)
                }
                GallerySection(title: "List Rows") {
                    VStack(spacing: 0) {
                        DSWeatherRow(date: "週三", condition: .sunny, conditionText: "晴天", temperature: "28°")
                        Divider()
                        DSSettingRowLabel("帳戶設定")
                        Divider()
                        DSDownloadMapRow(regionName: "北部地區", downloadState: .idle)
                        Divider()
                        DSNotificationSettingRow("推播通知", isOn: .constant(true))
                    }
                }
            }
            .padding()
        }
    }
}

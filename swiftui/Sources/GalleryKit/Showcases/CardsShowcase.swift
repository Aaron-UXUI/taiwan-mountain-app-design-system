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
                    VStack(spacing: 12) {
                        DSCardTickets(scene: "阿里山國家森林遊樂區",
                                      ticketLines: ["全票 x 1", "烏來臺車來回搭乘券 x 1"],
                                      due: "2026/09/10", price: "NT$ 425")
                        DSCardTickets(scene: "阿里山國家森林遊樂區",
                                      ticketLines: ["全票 x 1"],
                                      due: "2026/09/10", price: "NT$ 425", isDisabled: true)
                    }
                }
                GallerySection(title: "CardNotification") {
                    DSCardNotification(headline: "步道即將關閉維護", body: "受颱風影響,本步道將於明日休園一天。", time: "10 分鐘前", isUnread: true)
                }
                GallerySection(title: "CardSavedItems") {
                    DSCardSavedItems(title: "台灣北部", savedCount: 3, photoURLs: [])
                        .frame(height: 160)
                }
                GallerySection(title: "Weather Column") {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(alignment: .top, spacing: 8) {
                            DSWeatherColumn(
                                date: "08/11", weekday: "星期日", condition: .cloudSun, conditionText: "多雲時晴",
                                temperature: "29 / 33℃", apparentTemperature: "29 / 33℃", precipitationRate: "90%",
                                uvIndex: "5", uvLevel: "中量級", sunrise: "05:48", sunset: "17:37",
                                humidity: "84%", windSpeed: "4", windDirection: "東南"
                            )
                            DSWeatherColumn(
                                date: "08/12", weekday: "星期一", condition: .rain, conditionText: "陣雨",
                                temperature: "27 / 31℃", apparentTemperature: "28 / 32℃", precipitationRate: "70%",
                                uvIndex: "3", uvLevel: "低量級", sunrise: "05:49", sunset: "17:36",
                                humidity: "88%", windSpeed: "5", windDirection: "南"
                            )
                        }
                    }
                }
                GallerySection(title: "List Rows") {
                    VStack(spacing: 0) {
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

import SwiftUI
import DesignSystemKit

struct IndicatorsShowcase: View {
    @State private var offlineExpanded = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "Badge") {
                    HStack(spacing: 12) {
                        DSBadge(count: 3)                                    // Accordion / Large
                        DSBadge(count: 3, kind: .notification)               // Notification / Large
                        DSBadge(count: 128, kind: .notification, size: .maximum) // Maximum → "99+"
                        DSBadge.dot                                          // Notification / Small
                    }
                }
                GallerySection(title: "Crowdedness / Status Label") {
                    VStack(alignment: .leading, spacing: 8) {
                        DSCrowdednessTag(level: .comfortable)
                        DSCrowdednessTag(level: .partial)
                        DSCrowdednessTag(level: .crowded)
                        HStack(spacing: 8) {
                            DSStatusLabel(.open)
                            DSStatusLabel(.partial)
                            DSStatusLabel(.closed)
                            DSStatusLabel(.familyFriendly)
                        }
                    }
                }
                GallerySection(title: "OfflineMap") {
                    VStack(alignment: .leading, spacing: 8) {
                        DSOfflineMapCard(
                            carriers: [.init(name: "中華電信", coverage: .noneMissing)],
                            isExpanded: .constant(false)
                        )
                        DSOfflineMapCard(
                            carriers: [.init(name: "中華電信", coverage: .mostMissing)],
                            isExpanded: .constant(false)
                        )
                    }
                    DSOfflineMapCard(
                        carriers: [
                            .init(name: "中華電信", coverage: .someMissing),
                            .init(name: "台灣大哥大", coverage: .someMissing),
                            .init(name: "遠傳電信", coverage: .noneMissing)
                        ],
                        isExpanded: $offlineExpanded
                    )
                }
                GallerySection(title: "PaymentInfo") {
                    DSPaymentInfo(
                        title: "內洞國家森林遊樂區",
                        lineItems: [.init(label: "全票 x 2", value: "NT$300"), .init(label: "半票 x 1", value: "NT$125")],
                        total: "425",
                        isSelected: true
                    )
                    DSPaymentInfo(title: "內洞國家森林遊樂區", lineItems: [], total: "425")
                }
                GallerySection(title: "ProgressIndicator") {
                    DSStepProgressIndicator(current: .method)
                }
                GallerySection(title: "PageIndicator") {
                    DSPageIndicator(pageCount: 4, currentPage: 1, isOnDarkBackground: false)
                }
            }
            .padding()
        }
    }
}

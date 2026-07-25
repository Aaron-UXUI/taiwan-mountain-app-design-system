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
                    HStack(spacing: 12) {
                        DSCrowdednessTag(level: .comfortable)
                        DSCrowdednessTag(level: .crowded)
                        DSStatusLabel(.open)
                        DSStatusLabel(.partial)
                        DSStatusLabel(.closed)
                        DSStatusLabel(.familyFriendly)
                    }
                }
                GallerySection(title: "OfflineMap") {
                    DSOfflineMapCard(
                        coverage: .someMissing,
                        carriers: [
                            .init(name: "中華電信", hasSignal: true),
                            .init(name: "台灣大哥大", hasSignal: false),
                            .init(name: "遠傳電信", hasSignal: true)
                        ],
                        isExpanded: $offlineExpanded
                    )
                }
                GallerySection(title: "PaymentInfo") {
                    DSPaymentInfo(
                        title: "訂單摘要",
                        lineItems: [.init(label: "全票 x2", value: "NT$300"), .init(label: "接駁券 x2", value: "NT$100")],
                        total: "NT$400",
                        isSelected: true
                    )
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

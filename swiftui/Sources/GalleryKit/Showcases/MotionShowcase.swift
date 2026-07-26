import SwiftUI
import DesignSystemKit

struct MotionShowcase: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "Spinner") {
                    HStack(spacing: 24) {
                        DSSpinner.onWhite
                        ZStack {
                            Color.black
                            DSSpinner.onDark
                        }
                        .frame(width: 60, height: 60)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    }
                }
                GallerySection(title: "Success") {
                    DSSuccessCheckmark()
                }
                GallerySection(title: "Transaction") {
                    DSTransactionAnimation()
                }
            }
            .padding()
        }
    }
}

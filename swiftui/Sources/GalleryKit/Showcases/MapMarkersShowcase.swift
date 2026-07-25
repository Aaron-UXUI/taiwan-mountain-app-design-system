import SwiftUI
import DesignSystemKit

struct MapMarkersShowcase: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "LocationPin") {
                    HStack(spacing: 16) {
                        DSLocationPin(label: "1", placeName: "陽明山國家公園")
                        DSLocationPin(label: "2", placeName: "擎天崗", kind: .info, isFocused: true)
                    }
                    .padding()
                    .background(DSColor.gray50)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                GallerySection(title: "UserLocationMarker") {
                    DSUserLocationMarker(headingDegrees: 45)
                        .padding()
                        .background(DSColor.gray50)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
            }
            .padding()
        }
    }
}

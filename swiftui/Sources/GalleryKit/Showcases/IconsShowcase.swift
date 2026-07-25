import SwiftUI
import DesignSystemKit

struct IconsShowcase: View {
    private let sampleGlyphs: [DSIcon] = [.search, .heart, .heartFilled, .map, .member, .trail, .sunny, .rain]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "DSIcon (SF Symbols)") {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 44))], spacing: 16) {
                        ForEach(sampleGlyphs, id: \.systemName) { glyph in
                            glyph.image
                                .imageScale(.large)
                                .foregroundStyle(DSColor.primaryGreen800)
                        }
                    }
                }
                GallerySection(title: "Logo") {
                    VStack(alignment: .leading, spacing: 12) {
                        DSLogo(size: .large)
                        DSLogo(size: .small)
                    }
                }
                GallerySection(title: "Payment / Login Brand Badges") {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 80))], spacing: 8) {
                        ForEach(DSPaymentBrand.allCases, id: \.self) { brand in
                            DSPaymentBrandBadge(brand)
                        }
                    }
                }
            }
            .padding()
        }
    }
}

import SwiftUI
import DesignSystemKit

struct IconsShowcase: View {
    private struct IconSet: Identifiable {
        let id: String
        let title: String
        let icons: [DSIcon]
    }

    private let sets: [IconSet] = [
        IconSet(id: "24", title: "icon / 24px", icons: [
            .map, .mapFill, .search, .searchFill, .notify, .notifyFill,
            .member, .memberFill, .heart, .heartFill, .radio, .radioFill,
            .gps, .gpsFill, .setting, .more, .filter, .back, .close,
            .minus, .plus, .placeholder,
        ]),
        IconSet(id: "weather", title: "icon / 24px / weather", icons: [
            .cloudSun, .sunny, .rain, .lightningRain, .windy, .typhoon, .cloudSnow,
        ]),
        IconSet(id: "map", title: "icon / 24px / Map (white — shown on a pin fill)", icons: [
            .tree, .camera, .walk, .mapInfo,
        ]),
        IconSet(id: "20", title: "icon / 20px", icons: [
            .search20, .microphone, .check, .info20, .creditCard, .closeEye, .openEye,
        ]),
        IconSet(id: "16", title: "icon / 16px", icons: [
            .exclamation, .externalLink, .notNotified, .notified, .heart16, .heart16Fill,
        ]),
        IconSet(id: "14", title: "icon / 14px", icons: [.chevron, .secured]),
    ]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                ForEach(sets) { set in
                    GallerySection(title: set.title) {
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: 44), spacing: 12)], spacing: 12) {
                            ForEach(set.icons, id: \.self) { icon in
                                DSIconView(icon)
                                    .frame(width: 32, height: 32)
                                    // The Map glyphs are drawn white because
                                    // they sit on a coloured pin, so they need
                                    // a dark backing to be visible here.
                                    .background(set.id == "map" ? DSColor.primaryGreen800 : .clear)
                                    .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs))
                            }
                        }
                    }
                }

                GallerySection(title: "Tinting (template glyphs inherit foregroundStyle)") {
                    HStack(spacing: 16) {
                        DSIconView(.heart)
                        DSIconView(.heart).foregroundStyle(DSColor.destruct600)
                        DSIconView(.heart).foregroundStyle(DSColor.primaryGreen800)
                        DSIconView(.heart).foregroundStyle(DSColor.accentYellow700)
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

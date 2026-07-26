import SwiftUI

/// Native port of `card-saved-items.md`, using a 2×2 `LazyVGrid` of
/// `AsyncImage` thumbnails.
public struct DSCardSavedItems: View {
    private let title: String
    private let savedCount: Int
    private let photoURLs: [URL]

    public init(title: String, savedCount: Int, photoURLs: [URL]) {
        self.title = title
        self.savedCount = savedCount
        self.photoURLs = photoURLs
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.s) {
            // Figma: four 70pt tiles with a 4pt gutter, each rounded only on
            // the outer corner of the mosaic (12pt) — the grid is not one
            // uniformly-clipped block, and the gutter is 4pt, not 2pt.
            VStack(spacing: DSSpacing.xs) {
                HStack(spacing: DSSpacing.xs) {
                    tile(0, corners: .topLeading)
                    tile(1, corners: .topTrailing)
                }
                HStack(spacing: DSSpacing.xs) {
                    tile(2, corners: .bottomLeading)
                    tile(3, corners: .bottomTrailing)
                }
            }
            .accessibilityHidden(true)

            // Figma pairs the title with a "N 個收藏" count line — there is no
            // heart on this card (the earlier version invented one).
            VStack(alignment: .leading, spacing: 0) {
                Text(title)
                    .dsFont(.bodyM)
                    .fontWeight(.semibold)
                    .foregroundStyle(DSColor.black)
                Text("\(savedCount) 個收藏")
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.gray800)
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel("\(title), \(savedCount) 個收藏")
        }
        .frame(width: 144, alignment: .leading)
    }

    private enum TileCorner { case topLeading, topTrailing, bottomLeading, bottomTrailing }

    @ViewBuilder
    private func tile(_ index: Int, corners: TileCorner) -> some View {
        let radius = DSRadius.s
        let shape = UnevenRoundedRectangle(
            topLeadingRadius: corners == .topLeading ? radius : 0,
            bottomLeadingRadius: corners == .bottomLeading ? radius : 0,
            bottomTrailingRadius: corners == .bottomTrailing ? radius : 0,
            topTrailingRadius: corners == .topTrailing ? radius : 0,
            style: .continuous
        )
        Group {
            if index < photoURLs.count {
                AsyncImage(url: photoURLs[index]) { phase in
                    if case .success(let image) = phase {
                        image.resizable().scaledToFill()
                    } else {
                        Rectangle().fill(DSColor.gray100)
                    }
                }
            } else {
                Rectangle().fill(DSColor.gray100)
            }
        }
        .frame(width: 70, height: 70)
        .clipShape(shape)
    }
}

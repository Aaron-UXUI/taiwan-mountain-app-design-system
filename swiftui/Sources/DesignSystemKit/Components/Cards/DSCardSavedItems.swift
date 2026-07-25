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
            LazyVGrid(columns: [GridItem(.flexible(), spacing: 2), GridItem(.flexible(), spacing: 2)], spacing: 2) {
                ForEach(0..<4, id: \.self) { index in
                    if index < photoURLs.count {
                        AsyncImage(url: photoURLs[index]) { phase in
                            if case .success(let image) = phase {
                                image.resizable().scaledToFill()
                            } else {
                                Rectangle().fill(DSColor.gray100)
                            }
                        }
                        .aspectRatio(1, contentMode: .fill)
                        .clipped()
                    } else {
                        Rectangle().fill(DSColor.gray100).aspectRatio(1, contentMode: .fill)
                    }
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
            .accessibilityHidden(true)

            // Figma pairs the title with a "N 個收藏" count line — there is no
            // heart on this card (the earlier version invented one).
            VStack(alignment: .leading, spacing: 2) {
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
    }
}

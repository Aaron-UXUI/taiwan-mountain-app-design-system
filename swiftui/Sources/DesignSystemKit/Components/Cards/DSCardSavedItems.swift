import SwiftUI

/// Native port of `card-saved-items.md`, using a 2×2 `LazyVGrid` of
/// `AsyncImage` thumbnails.
public struct DSCardSavedItems: View {
    private let title: String
    private let isLiked: Bool
    private let photoURLs: [URL]

    public init(title: String, isLiked: Bool = false, photoURLs: [URL]) {
        self.title = title
        self.isLiked = isLiked
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

            HStack(spacing: DSSpacing.xs) {
                Text(title)
                    .dsFont(.bodyM)
                    .fontWeight(.semibold)
                    .foregroundStyle(DSColor.black)
                if isLiked {
                    Image(systemName: "heart.fill")
                        .foregroundStyle(DSColor.destruct600)
                        .accessibilityHidden(true)
                }
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel(isLiked ? "\(title), 已收藏" : title)
        }
    }
}

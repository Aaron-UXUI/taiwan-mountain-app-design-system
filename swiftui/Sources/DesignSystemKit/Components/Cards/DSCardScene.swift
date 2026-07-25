import SwiftUI

/// Native port of `card-scene.md`. Uses `AsyncImage` (native networked image
/// loading, with a built-in placeholder phase) instead of a bundled
/// placeholder illustration. The save affordance uses a native
/// `.symbolEffect(.bounce)` on toggle — SF Symbol effects already minimize
/// automatically under Reduce Motion, so no extra guarding is needed the way
/// plain `.animation()` calls require elsewhere in this kit.
public struct DSCardScene: View {
    private let imageURL: URL?
    private let siteName: String
    private let location: String
    private let distance: String?
    private let isFamilyFriendly: Bool
    private let statusLabel: String
    @Binding private var isSaved: Bool
    private let onToggleSave: () -> Void

    public init(
        imageURL: URL?,
        siteName: String,
        location: String,
        distance: String? = nil,
        isFamilyFriendly: Bool = false,
        statusLabel: String,
        isSaved: Binding<Bool>,
        onToggleSave: @escaping () -> Void = {}
    ) {
        self.imageURL = imageURL
        self.siteName = siteName
        self.location = location
        self.distance = distance
        self.isFamilyFriendly = isFamilyFriendly
        self.statusLabel = statusLabel
        self._isSaved = isSaved
        self.onToggleSave = onToggleSave
    }

    public var body: some View {
        ZStack(alignment: .bottom) {
            photo

            LinearGradient(
                colors: [.clear, .black],
                startPoint: .init(x: 0.5, y: 0.67),
                endPoint: .init(x: 0.5, y: 1)
            )
            .accessibilityHidden(true)

            VStack {
                HStack(alignment: .top) {
                    Spacer()
                    VStack(alignment: .trailing, spacing: DSSpacing.xs) {
                        tag(statusLabel, fill: DSColor.primaryGreen900)
                        if isFamilyFriendly {
                            tag("親子友善", fill: DSColor.accentYellow900)
                        }
                    }
                }
                Spacer()
                footer
            }
            .padding(DSSpacing.s)
        }
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.m, style: .continuous))
        .aspectRatio(327.0 / 236.0, contentMode: .fit)
    }

    private var photo: some View {
        AsyncImage(url: imageURL) { phase in
            switch phase {
            case .success(let image):
                image.resizable().scaledToFill()
            default:
                Rectangle().fill(DSColor.gray200)
            }
        }
        .accessibilityHidden(true)
    }

    private func tag(_ text: String, fill: Color) -> some View {
        Text(text)
            .dsFont(.bodyS)
            .foregroundStyle(DSColor.white)
            .padding(DSSpacing.xs)
            .background(fill.opacity(0.95))
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
    }

    private var footer: some View {
        HStack(spacing: DSSpacing.s) {
            VStack(alignment: .leading, spacing: 0) {
                Text(siteName)
                    .dsFont(.headline3)
                    .foregroundStyle(DSColor.white)
                    .lineLimit(1)
                HStack(spacing: DSSpacing.s) {
                    Text(location)
                        .lineLimit(1)
                    if let distance {
                        Circle().frame(width: 4, height: 4)
                        Text(distance)
                    }
                }
                .dsFont(.bodyS)
                .foregroundStyle(DSColor.white)
            }
            Spacer(minLength: 0)
            Button {
                isSaved.toggle()
                onToggleSave()
            } label: {
                Image(systemName: isSaved ? "heart.fill" : "heart")
                    .symbolEffect(.bounce, value: isSaved)
                    .imageScale(.large)
                    .foregroundStyle(DSColor.white)
                    .frame(width: 48, height: 48)
            }
            .accessibilityLabel(isSaved ? "取消收藏" : "加入收藏")
            .accessibilityAddTraits(isSaved ? .isSelected : [])
        }
        .padding(DSSpacing.s)
        .background(.black.opacity(0.5))
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
    }
}

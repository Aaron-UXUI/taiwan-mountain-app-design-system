import SwiftUI

/// Native port of `card-scene.md` — Figma `Cards / Scene` (node 374:3819).
///
/// Uses `AsyncImage` (native networked image loading, with a built-in
/// placeholder phase) instead of a bundled placeholder illustration. The save
/// affordance uses a native `.symbolEffect(.bounce)` on toggle — SF Symbol
/// effects already minimize automatically under Reduce Motion, so no extra
/// guarding is needed the way plain `.animation()` calls require elsewhere.
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

            // Status tags float over the photo, top-trailing.
            VStack(alignment: .trailing, spacing: DSSpacing.xs) {
                tag(statusLabel, fill: DSColor.primaryGreen900)
                if isFamilyFriendly {
                    tag("親子友善", fill: DSColor.accentYellow900)
                }
                Spacer(minLength: 0)
            }
            .frame(maxWidth: .infinity, alignment: .trailing)
            .padding(DSSpacing.s)

            // Figma runs the caption bar edge to edge across the bottom of the
            // card — it is not an inset, separately-rounded panel, and there is
            // no gradient scrim above it.
            footer
        }
        .aspectRatio(327.0 / 236.0, contentMode: .fit)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.m, style: .continuous))
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
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
    }

    private var footer: some View {
        HStack(spacing: DSSpacing.s) {
            VStack(alignment: .leading, spacing: 2) {
                Text(siteName)
                    .dsFont(.headline4)
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
                DSIconView(isSaved ? .heartFill : .heart)
                    .symbolEffect(.bounce, value: isSaved)
                    .foregroundStyle(DSColor.white)
                    .frame(width: 24, height: 24)
            }
            .accessibilityLabel(isSaved ? "取消收藏" : "加入收藏")
            .accessibilityAddTraits(isSaved ? .isSelected : [])
        }
        .padding(.horizontal, DSSpacing.m)
        .padding(.vertical, DSSpacing.sm)
        .frame(maxWidth: .infinity)
        .background(DSColor.black.opacity(0.55))
    }
}

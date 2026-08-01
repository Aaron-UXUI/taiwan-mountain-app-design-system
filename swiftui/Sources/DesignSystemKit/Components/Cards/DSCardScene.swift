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

            // Figma floats the caption as its own translucent panel inset 8pt
            // from the card's leading/trailing/bottom edges, with a 12pt radius
            // of its own — not an edge-to-edge bar, and not a gradient scrim.
            footer
                .padding(DSSpacing.s)
        }
        .aspectRatio(327.0 / 236.0, contentMode: .fit)
        .background(DSColor.white)
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
        // The photo used to carry a bottom scrim in its fill stack. Design has
        // since removed it — the caption gets its contrast from its own
        // translucent panel, so a second darkening layer would only muddy the
        // photo. Verified on the Filter_MapSearch instances (9528:34104),
        // which no longer emit any gradient.
        .accessibilityHidden(true)
    }

    /// The floating `Label` component — 4pt padding, 4pt radius, 95% opaque
    /// over a blurred backdrop.
    private func tag(_ text: String, fill: Color) -> some View {
        Text(text)
            .dsFont(.bodyS)
            .foregroundStyle(DSColor.white)
            .padding(DSSpacing.xs)
            .background(fill, in: RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
            .opacity(0.95)
    }

    private var footer: some View {
        HStack(spacing: 0) {
            // Figma: Headline/3 title, body/S location — the title was a step
            // too small here, at Headline/4.
            VStack(alignment: .leading, spacing: 0) {
                Text(siteName)
                    .dsFont(.headline3)
                    .foregroundStyle(DSColor.white)
                    .lineLimit(1)
                HStack(spacing: DSSpacing.s) {
                    Text(location)
                        .lineLimit(1)
                    if let distance {
                        HStack(spacing: DSSpacing.xs) {
                            Circle().frame(width: 4, height: 4)
                            Text(distance)
                        }
                    }
                }
                .dsFont(.bodyS)
                .foregroundStyle(DSColor.white)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(DSSpacing.s)

            Button {
                isSaved.toggle()
                onToggleSave()
            } label: {
                DSIconView(isSaved ? .heartFill : .heart)
                    .symbolEffect(.bounce, value: isSaved)
                    .foregroundStyle(DSColor.white)
                    .frame(width: 24, height: 24)
                    .padding(DSSpacing.sm)
            }
            .accessibilityLabel(isSaved ? "取消收藏" : "加入收藏")
            .accessibilityAddTraits(isSaved ? .isSelected : [])
        }
        .background {
            // rgba(0,0,0,0.5) over a 6pt backdrop blur.
            RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
                .fill(DSColor.black.opacity(0.5))
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
        }
    }
}

import SwiftUI

/// Native port of `card-description.md`. Title uses `.font(.headline)`-class
/// styling and is exposed as a heading trait so it participates in
/// VoiceOver's heading-navigation rotor, per the spec's accessibility note.
public struct DSCardDescription: View {
    private let title: String?
    private let body_: String
    private let imageURL: URL?

    public init(title: String? = nil, body: String, imageURL: URL? = nil) {
        self.title = title
        self.body_ = body
        self.imageURL = imageURL
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.sm) {
            if let imageURL {
                AsyncImage(url: imageURL) { phase in
                    if case .success(let image) = phase {
                        image.resizable().scaledToFill()
                    } else {
                        Rectangle().fill(DSColor.gray100)
                    }
                }
                .frame(height: 160)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
                .accessibilityHidden(true)
            }
            if let title {
                Text(title)
                    .dsFont(.headline3)
                    .foregroundStyle(DSColor.black)
                    .accessibilityAddTraits(.isHeader)
            }
            Text(body_)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.gray800)
        }
        .padding(DSSpacing.s)
    }
}

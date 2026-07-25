import SwiftUI

/// Native port of `bottom-sheet.md`. This is the single largest surface in
/// the spec (11 nested dependencies across three layouts) — and almost all
/// of its custom mechanics (drag handle, resize/dismiss gesture, modal focus
/// trapping) are exactly what SwiftUI's native `.sheet` +
/// `.presentationDetents` + `.presentationDragIndicator` already provide, so
/// this is a thin presentation modifier rather than a rebuilt panel.
/// `style: Filter_Discover / Map_Info / Filter_MapSearch` becomes three
/// separate content views below, composed from the already-native
/// Accordion/SegmentedControl/Button/CardScene components, instead of one
/// view branching on an enum.
public extension View {
    func dsBottomSheet<SheetContent: View>(
        isPresented: Binding<Bool>,
        detents: Set<PresentationDetent> = [.medium, .large],
        @ViewBuilder content: @escaping () -> SheetContent
    ) -> some View {
        sheet(isPresented: isPresented) {
            content()
                .presentationDetents(detents)
                .presentationDragIndicator(.visible)
        }
    }
}

/// `style: Filter_Discover`
public struct DSFilterDiscoverSheet: View {
    public struct Group: Identifiable {
        public let id = UUID()
        public let title: String
        public let options: [String]
        public init(title: String, options: [String]) {
            self.title = title
            self.options = options
        }
    }

    private let title: String
    private let groups: [Group]
    @State private var expanded: Set<UUID> = []
    @State private var checked: Set<String> = []
    private let onApply: () -> Void

    public init(title: String, groups: [Group], onApply: @escaping () -> Void = {}) {
        self.title = title
        self.groups = groups
        self.onApply = onApply
    }

    public var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: DSSpacing.sm) {
                    Text(title)
                        .dsFont(.headline3)
                        .foregroundStyle(DSColor.black)
                        .accessibilityAddTraits(.isHeader)

                    ForEach(groups) { group in
                        groupRow(group)
                    }
                }
                .padding(.horizontal, DSSpacing.lm)
            }
            Divider()
            DSButton("套用篩選") { onApply() }
                .padding(.horizontal, DSSpacing.lm)
                .padding(.vertical, DSSpacing.s)
        }
    }

    private func groupRow(_ group: Group) -> some View {
        DisclosureGroup(isExpanded: Binding(
            get: { expanded.contains(group.id) },
            set: { isOn in
                if isOn { expanded.insert(group.id) } else { expanded.remove(group.id) }
            }
        )) {
            ForEach(group.options, id: \.self) { option in
                DSCheckBox(option, isChecked: Binding(
                    get: { checked.contains(option) },
                    set: { isOn in
                        if isOn { checked.insert(option) } else { checked.remove(option) }
                    }
                ))
            }
            .padding(.top, DSSpacing.xs)
        } label: {
            Text(group.title).dsFont(.labelM).foregroundStyle(DSColor.black)
        }
    }
}

/// `style: Map_Info`
public struct DSMapInfoSheet: View {
    private let photoURL: URL?
    private let title: String
    private let statusLabel: String
    private let crowdedness: DSCrowdednessLevel
    private let tags: [String]
    @Binding private var isSaved: Bool
    private let onFurtherInfo: () -> Void
    private let onBuyTicket: () -> Void

    public init(
        photoURL: URL?,
        title: String,
        statusLabel: String,
        crowdedness: DSCrowdednessLevel,
        tags: [String],
        isSaved: Binding<Bool>,
        onFurtherInfo: @escaping () -> Void = {},
        onBuyTicket: @escaping () -> Void = {}
    ) {
        self.photoURL = photoURL
        self.title = title
        self.statusLabel = statusLabel
        self.crowdedness = crowdedness
        self.tags = tags
        self._isSaved = isSaved
        self.onFurtherInfo = onFurtherInfo
        self.onBuyTicket = onBuyTicket
    }

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: DSSpacing.sm) {
                AsyncImage(url: photoURL) { phase in
                    if case .success(let image) = phase {
                        image.resizable().scaledToFill()
                    } else {
                        Rectangle().fill(DSColor.gray200)
                    }
                }
                .frame(height: 236)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
                .accessibilityHidden(true)

                HStack {
                    Text(title).dsFont(.headline3).foregroundStyle(DSColor.black)
                    Spacer()
                    Button {
                        isSaved.toggle()
                    } label: {
                        Image(systemName: isSaved ? "heart.fill" : "heart")
                            .symbolEffect(.bounce, value: isSaved)
                    }
                    .accessibilityLabel(isSaved ? "取消收藏" : "加入收藏")
                }

                DSSalientTag(statusLabel, kind: .general)
                DSCrowdednessTag(level: crowdedness)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: DSSpacing.s) {
                        ForEach(tags, id: \.self) { tag in
                            DSChip(tag, size: .small, isSelected: .constant(false))
                        }
                    }
                }

                DSLinkFurtherInfo("查看更多資訊", action: onFurtherInfo)

                DSButton("購買票券", action: onBuyTicket)
            }
            .padding(.horizontal, DSSpacing.lm)
        }
    }
}

/// `style: Filter_MapSearch`
public struct DSFilterMapSearchSheet: View {
    public struct Result: Identifiable {
        public let id: String
        public let imageURL: URL?
        public let siteName: String
        public let location: String
        public init(id: String, imageURL: URL?, siteName: String, location: String) {
            self.id = id
            self.imageURL = imageURL
            self.siteName = siteName
            self.location = location
        }
    }

    private let results: [Result]
    @State private var saved: Set<String> = []

    public init(results: [Result]) {
        self.results = results
    }

    public var body: some View {
        ScrollView {
            LazyVStack(spacing: DSSpacing.lm) {
                ForEach(results) { result in
                    DSCardScene(
                        imageURL: result.imageURL,
                        siteName: result.siteName,
                        location: result.location,
                        statusLabel: "今日開放",
                        isSaved: Binding(
                            get: { saved.contains(result.id) },
                            set: { isOn in
                                if isOn { saved.insert(result.id) } else { saved.remove(result.id) }
                            }
                        )
                    )
                }
            }
            .padding(.horizontal, DSSpacing.lm)
            .padding(.vertical, DSSpacing.lm)
        }
    }
}

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
///
/// Figma composes this from two labelled blocks — **排序依據** holding a
/// `Segmented Controls`, then **篩選** holding one `Accordion / CheckBox`
/// followed by a run of `Accordion / Chips` — and closes with a `Bottom Bar`.
/// The earlier version had no sort block at all, gave the sheet a Headline/3
/// title Figma does not have, and built every group from a raw
/// `DisclosureGroup` + checkboxes rather than reusing the two Accordion
/// components the design actually instantiates.
public struct DSFilterDiscoverSheet: View {
    /// The `Accordion / CheckBox` group — options are checkboxes.
    public struct CheckBoxGroup {
        public let title: String
        public let options: [String]
        public init(title: String, options: [String]) {
            self.title = title
            self.options = options
        }
    }

    /// An `Accordion / Chips` group — options are Chips/Large.
    public struct ChipsGroup: Identifiable {
        public let id = UUID()
        public let title: String
        public let options: [String]
        public init(title: String, options: [String]) {
            self.title = title
            self.options = options
        }
    }

    private let sortLabel: String
    private let sortLeading: String
    private let sortTrailing: String
    private let filterLabel: String
    private let checkBoxGroup: CheckBoxGroup?
    private let chipsGroups: [ChipsGroup]
    private let onApply: () -> Void

    @Binding private var sortSelection: DSSegmentSide
    @State private var expanded: Set<String> = []
    @State private var checked: Set<String> = []
    @State private var selectedChips: Set<String> = []

    public init(
        sortLabel: String = "排序依據",
        sortLeading: String,
        sortTrailing: String,
        sortSelection: Binding<DSSegmentSide>,
        filterLabel: String = "篩選",
        checkBoxGroup: CheckBoxGroup? = nil,
        chipsGroups: [ChipsGroup] = [],
        onApply: @escaping () -> Void = {}
    ) {
        self.sortLabel = sortLabel
        self.sortLeading = sortLeading
        self.sortTrailing = sortTrailing
        self._sortSelection = sortSelection
        self.filterLabel = filterLabel
        self.checkBoxGroup = checkBoxGroup
        self.chipsGroups = chipsGroups
        self.onApply = onApply
    }

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: DSSpacing.sm) {
                section(sortLabel) {
                    DSSegmentedControl(
                        leftLabel: sortLeading,
                        rightLabel: sortTrailing,
                        selected: $sortSelection
                    )
                }

                section(filterLabel) {
                    VStack(spacing: 0) {
                        if let checkBoxGroup {
                            DSAccordionCheckBox(
                                title: checkBoxGroup.title,
                                options: checkBoxGroup.options,
                                isExpanded: expansion(for: checkBoxGroup.title),
                                checkedOptions: $checked
                            )
                        }
                        ForEach(chipsGroups) { group in
                            DSAccordionChips(
                                title: group.title,
                                options: group.options,
                                isExpanded: expansion(for: group.title),
                                selectedOptions: $selectedChips
                            )
                        }
                    }
                }

                // Figma's 32pt Blank before the Bottom Bar.
                Spacer(minLength: DSSpacing.l)
            }
            .padding(.horizontal, DSSpacing.lm)
        }
        .dsBottomBar(.singleButton(title: "套用篩選", action: onApply))
    }

    /// Figma labels each block with a 20pt-tall caption 4pt above its content.
    private func section<Content: View>(
        _ label: String,
        @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: DSSpacing.xs) {
            Text(label)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.black)
                .accessibilityAddTraits(.isHeader)
            content()
        }
    }

    private func expansion(for title: String) -> Binding<Bool> {
        Binding(
            get: { expanded.contains(title) },
            set: { isOn in
                if isOn { expanded.insert(title) } else { expanded.remove(title) }
            }
        )
    }
}

/// `style: Map_Info`
///
/// Figma's running order is title → salient chips → tag chips → crowdedness →
/// further-info link → action row → photo → buy button. The earlier version
/// put the photo first, replaced the action row with a bare heart glyph beside
/// the title, and omitted the carousel indicators over the photo entirely.
public struct DSMapInfoSheet: View {
    private let photoURL: URL?
    private let photoCount: Int
    private let currentPhoto: Int
    private let title: String
    private let statusLabel: String
    private let isFamilyFriendly: Bool
    private let crowdedness: DSCrowdednessLevel
    private let tags: [String]
    @Binding private var isSaved: Bool
    @Binding private var isFollowing: Bool
    private let onFurtherInfo: () -> Void
    private let onDownloadOfflineMap: () -> Void
    private let onBuyTicket: () -> Void

    public init(
        photoURL: URL?,
        photoCount: Int = 1,
        currentPhoto: Int = 0,
        title: String,
        statusLabel: String,
        isFamilyFriendly: Bool = false,
        crowdedness: DSCrowdednessLevel,
        tags: [String],
        isSaved: Binding<Bool>,
        isFollowing: Binding<Bool> = .constant(false),
        onFurtherInfo: @escaping () -> Void = {},
        onDownloadOfflineMap: @escaping () -> Void = {},
        onBuyTicket: @escaping () -> Void = {}
    ) {
        self.photoURL = photoURL
        self.photoCount = photoCount
        self.currentPhoto = currentPhoto
        self.title = title
        self.statusLabel = statusLabel
        self.isFamilyFriendly = isFamilyFriendly
        self.crowdedness = crowdedness
        self.tags = tags
        self._isSaved = isSaved
        self._isFollowing = isFollowing
        self.onFurtherInfo = onFurtherInfo
        self.onDownloadOfflineMap = onDownloadOfflineMap
        self.onBuyTicket = onBuyTicket
    }

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: DSSpacing.sm) {
                Text(title)
                    .dsFont(.headline3)
                    .foregroundStyle(DSColor.black)
                    .accessibilityAddTraits(.isHeader)

                HStack(spacing: DSSpacing.s) {
                    DSSalientTag(statusLabel, kind: .general)
                    if isFamilyFriendly {
                        DSSalientTag("親子友善", kind: .special)
                    }
                }

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: DSSpacing.s) {
                        ForEach(tags, id: \.self) { tag in
                            DSChip(tag, size: .small, isSelected: .constant(false))
                        }
                    }
                }

                DSCrowdednessTag(level: crowdedness)

                VStack(alignment: .leading, spacing: DSSpacing.s) {
                    DSLinkFurtherInfo("更多資訊", action: onFurtherInfo)
                    // Figma's "Prototype Buttons" row; visually these are the
                    // Secondary/Small button treatment, so it is reused rather
                    // than duplicated as a new component.
                    HStack(spacing: DSSpacing.s) {
                        DSButton(isSaved ? "已收藏" : "收藏", emphasis: .secondary, size: .small) {
                            isSaved.toggle()
                        }
                        .accessibilityAddTraits(isSaved ? .isSelected : [])
                        DSButton(isFollowing ? "已追蹤" : "追蹤園區動態", emphasis: .secondary, size: .small) {
                            isFollowing.toggle()
                        }
                        .accessibilityAddTraits(isFollowing ? .isSelected : [])
                        DSButton("下載離線地圖", emphasis: .secondary, size: .small, action: onDownloadOfflineMap)
                    }
                }

                photo

                DSButton("購買票券", action: onBuyTicket)
            }
            .padding(.horizontal, DSSpacing.lm)
        }
    }

    private var photo: some View {
        AsyncImage(url: photoURL) { phase in
            if case .success(let image) = phase {
                image.resizable().scaledToFill()
            } else {
                Rectangle().fill(DSColor.gray200)
            }
        }
        .frame(height: 236)
        .frame(maxWidth: .infinity)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
        .overlay(alignment: .bottom) {
            if photoCount > 1 {
                DSPageIndicator(pageCount: photoCount, currentPage: currentPhoto)
                    .padding(.bottom, DSSpacing.sm)
            }
        }
        .accessibilityHidden(true)
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

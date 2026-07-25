import SwiftUI
import DesignSystemKit

/// The Component Gallery's entry point. `NavigationSplitView` is used
/// deliberately: on iPad/landscape it renders as a persistent sidebar +
/// detail split (matching HIG's guidance for catalog-style apps), and on
/// iPhone it collapses to a standard push-navigation stack automatically —
/// no size-class branching needed to get both idioms right.
public enum GalleryCategory: String, CaseIterable, Identifiable, Hashable {
    case buttons = "Buttons & Actions"
    case inputs = "Inputs & Selection"
    case cards = "Cards & Lists"
    case dialogs = "Dialogs & Disclosure"
    case navigation = "Navigation"
    case indicators = "Indicators & Status"
    case motion = "Motion"
    case mapMarkers = "Map Markers"
    case iconsAndBrand = "Icons & Brand"

    public var id: String { rawValue }

    var systemImage: String {
        switch self {
        case .buttons: return "hand.tap.fill"
        case .inputs: return "checklist"
        case .cards: return "rectangle.stack.fill"
        case .dialogs: return "rectangle.portrait.bottomthird.inset.filled"
        case .navigation: return "square.grid.2x2.fill"
        case .indicators: return "gauge.with.dots.needle.50percent"
        case .motion: return "sparkles"
        case .mapMarkers: return "mappin.circle.fill"
        case .iconsAndBrand: return "square.grid.3x3.fill"
        }
    }
}

public struct GalleryRootView: View {
    @State private var selection: GalleryCategory? = .buttons

    public init() {}

    public var body: some View {
        NavigationSplitView {
            List(GalleryCategory.allCases, selection: $selection) { category in
                Label(category.rawValue, systemImage: category.systemImage)
                    .tag(category)
            }
            .navigationTitle("Component Gallery")
        } detail: {
            NavigationStack {
                detailContent
                    .navigationTitle(selection?.rawValue ?? "Component Gallery")
            }
        }
    }

    @ViewBuilder
    private var detailContent: some View {
        switch selection {
        case .buttons: ButtonsShowcase()
        case .inputs: InputsShowcase()
        case .cards: CardsShowcase()
        case .dialogs: DialogsShowcase()
        case .navigation: NavigationShowcase()
        case .indicators: IndicatorsShowcase()
        case .motion: MotionShowcase()
        case .mapMarkers: MapMarkersShowcase()
        case .iconsAndBrand: IconsShowcase()
        case .none:
            ContentUnavailableView("選擇一個分類", systemImage: "square.grid.2x2")
        }
    }
}

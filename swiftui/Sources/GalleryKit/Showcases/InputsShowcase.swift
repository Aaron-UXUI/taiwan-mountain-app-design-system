import SwiftUI
import DesignSystemKit

struct InputsShowcase: View {
    @State private var isChecked = true
    @State private var radioSelection = "a"
    @State private var expandableSelection = "other"
    @State private var customValue = ""
    @State private var toggleOn = true
    @State private var stepAmount = 2
    @State private var segment: DSSegmentSide = .left
    @State private var text = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                GallerySection(title: "CheckBox") {
                    DSCheckBox("我同意條款", isChecked: $isChecked)
                }
                GallerySection(title: "RadioButton — Default") {
                    DSRadioSelectionList(
                        options: [.init(id: "a", label: "距離"), .init(id: "b", label: "熱門度")],
                        selectedID: $radioSelection
                    )
                }
                GallerySection(title: "RadioButton — Expanded") {
                    DSExpandableRadioSelectionList(
                        options: [
                            .init(id: "family", label: "家庭出遊"),
                            .init(id: "other", label: "其他", expandedPlaceholder: "請輸入原因")
                        ],
                        selectedID: $expandableSelection,
                        customValue: $customValue
                    )
                }
                GallerySection(title: "Toggle") {
                    DSToggle("推播通知", isOn: $toggleOn)
                }
                GallerySection(title: "Stepper") {
                    DSStepper(amount: $stepAmount, range: 0...10, errorMessage: stepAmount >= 10 ? "已達可購買上限" : nil)
                }
                GallerySection(title: "SegmentedControl") {
                    DSSegmentedControl(leftLabel: "距離", rightLabel: "熱門度", selected: $segment)
                }
                GallerySection(title: "TextField") {
                    DSTextField("搜尋景點", text: $text, errorMessage: text.count > 20 ? "字數過長" : nil)
                }
            }
            .padding()
        }
    }
}

import SwiftUI

/// Native port of `progress-indicator.md`. Exposed as a single combined
/// accessibility element announcing "Step X of Y", matching the spec's
/// requirement that position not be conveyed by connecting-line color alone.
public enum DSCheckoutStep: Int, CaseIterable {
    case choice, method, info

    var label: String {
        switch self {
        case .choice: return "方案"
        case .method: return "付款方式"
        case .info: return "資訊確認"
        }
    }
}

public struct DSStepProgressIndicator: View {
    private let current: DSCheckoutStep

    public init(current: DSCheckoutStep) {
        self.current = current
    }

    public var body: some View {
        // Figma draws step labels joined by rules — there are no status dots.
        // Only the current step is emphasised (semibold, brand green); the
        // others stay in the same grey regardless of whether they are done.
        HStack(spacing: DSSpacing.xs) {
            ForEach(DSCheckoutStep.allCases, id: \.self) { step in
                Text(step.label)
                    .dsFont(.bodyM)
                    .fontWeight(step == current ? .semibold : .regular)
                    .foregroundStyle(step == current ? DSColor.primaryGreen900 : DSColor.gray800)
                    .fixedSize()
                if step != DSCheckoutStep.allCases.last {
                    Rectangle()
                        .fill(DSColor.gray800)
                        .frame(height: 1)
                }
            }
        }
        .padding(.horizontal, DSSpacing.lm)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Step \(current.rawValue + 1) of \(DSCheckoutStep.allCases.count): \(current.label)")
    }
}

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
        HStack(spacing: DSSpacing.xs) {
            ForEach(DSCheckoutStep.allCases, id: \.self) { step in
                HStack(spacing: DSSpacing.xs) {
                    Circle()
                        .fill(step.rawValue <= current.rawValue ? DSColor.primaryGreen900 : DSColor.gray200)
                        .frame(width: 8, height: 8)
                    Text(step.label)
                        .dsFont(.bodyM)
                        .fontWeight(step == current ? .semibold : .regular)
                        .foregroundStyle(step.rawValue <= current.rawValue ? DSColor.gray800 : DSColor.gray200)
                }
                if step != DSCheckoutStep.allCases.last {
                    Rectangle()
                        .fill(step.rawValue < current.rawValue ? DSColor.primaryGreen900 : DSColor.gray200)
                        .frame(height: 1)
                }
            }
        }
        .padding(.horizontal, DSSpacing.lm)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Step \(current.rawValue + 1) of \(DSCheckoutStep.allCases.count): \(current.label)")
    }
}

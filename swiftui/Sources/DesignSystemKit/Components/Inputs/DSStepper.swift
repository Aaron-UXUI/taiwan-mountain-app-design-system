import SwiftUI

/// Native port of `stepper.md`, built on SwiftUI's own `Stepper` — which
/// already provides independently-disabled edge controls at range limits
/// and native VoiceOver "adjustable" support (swipe up/down to change value)
/// for free. The visible numeral uses the Number type token; it's hidden
/// from the accessibility tree since the underlying `Stepper` already
/// exposes the amount as its accessibility value, so VoiceOver never
/// announces it twice.
public struct DSStepper: View {
    @Binding private var amount: Int
    private let range: ClosedRange<Int>
    private let errorMessage: String?

    public init(amount: Binding<Int>, range: ClosedRange<Int> = 0...99, errorMessage: String? = nil) {
        self._amount = amount
        self.range = range
        self.errorMessage = errorMessage
    }

    public var body: some View {
        VStack(alignment: .trailing, spacing: DSSpacing.xs) {
            HStack(spacing: DSSpacing.s) {
                Text("\(amount)")
                    .dsFont(.numberL)
                    .frame(minWidth: 24)
                    .accessibilityHidden(true)
                Stepper("數量", value: $amount, in: range)
                    .labelsHidden()
                    .tint(errorMessage == nil ? DSColor.primaryGreen800 : DSColor.destruct600)
                    .accessibilityLabel("數量")
                    .accessibilityValue("\(amount)")
                    .accessibilityHint(errorMessage ?? "")
            }
            if let errorMessage {
                Text(errorMessage)
                    .dsFont(.bodyS)
                    .foregroundStyle(DSColor.destruct700)
                    .accessibilityHidden(true)
            }
        }
    }
}

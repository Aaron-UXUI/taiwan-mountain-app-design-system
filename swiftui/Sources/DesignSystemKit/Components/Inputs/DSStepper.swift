import SwiftUI

/// Native port of `stepper.md` — Figma `Stepper` (node 12190:23425).
///
/// This was SwiftUI's own `Stepper` up to now. That control puts the value
/// *outside* a small −/+ pair, whereas Figma draws one bordered pill with the
/// value **between** the two buttons — a structural difference, not just a
/// tint, so it is drawn here (same call as `DSToggle` / `DSSegmentedControl`).
///
/// The accessibility contract stays native: the whole control projects a real
/// `Stepper` through `accessibilityRepresentation`, so VoiceOver still exposes
/// it as an adjustable value (swipe up/down to change) rather than as two
/// separate buttons.
///
/// Figma's `State=0` is not a separate mode here — it is what the control looks
/// like when `amount` sits at the range's lower bound and the minus button
/// disables itself, which falls out of the range check for free.
public struct DSStepper: View {
    @Binding private var amount: Int
    private let range: ClosedRange<Int>
    private let errorMessage: String?
    @Environment(\.isEnabled) private var isEnabled

    public init(amount: Binding<Int>, range: ClosedRange<Int> = 0...99, errorMessage: String? = nil) {
        self._amount = amount
        self.range = range
        self.errorMessage = errorMessage
    }

    private var canDecrement: Bool { isEnabled && amount > range.lowerBound }
    private var canIncrement: Bool { isEnabled && amount < range.upperBound }

    private var borderColor: Color {
        if !isEnabled { return DSColor.gray100 }
        return errorMessage == nil ? DSColor.gray200 : DSColor.destruct600
    }

    private var borderWidth: CGFloat { errorMessage == nil ? 1 : 2 }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.xs) {
            HStack(spacing: 0) {
                stepButton(.minus, enabled: canDecrement) {
                    amount = max(range.lowerBound, amount - 1)
                }

                Text("\(amount)")
                    // Figma: Number/Mono Bold — SF Mono Semibold at Headline/4.
                    .dsFont(.numberL)
                    .foregroundStyle(isEnabled ? DSColor.black : DSColor.gray200)
                    .frame(width: 48, height: 48)

                stepButton(.plus, enabled: canIncrement) {
                    amount = min(range.upperBound, amount + 1)
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: DSRadius.s, style: .continuous)
                    .strokeBorder(borderColor, lineWidth: borderWidth)
            }

            if let errorMessage {
                HStack(spacing: DSSpacing.xs) {
                    DSIconView(.exclamation)
                        .accessibilityHidden(true)
                    Text(errorMessage)
                        .dsFont(.bodyS)
                        .foregroundStyle(DSColor.destruct700)
                }
            }
        }
        .accessibilityRepresentation {
            Stepper("數量", value: $amount, in: range)
                .accessibilityValue("\(amount)")
                .accessibilityHint(errorMessage ?? "")
        }
    }

    private func stepButton(_ icon: DSIcon, enabled: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            DSIconView(icon)
                .foregroundStyle(enabled ? DSColor.black : DSColor.gray200)
                .padding(DSSpacing.s)
                .frame(width: 48, height: 48)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .disabled(!enabled)
    }
}

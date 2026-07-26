import SwiftUI

/// Shared helpers for the storyboard-driven motion pieces.
///
/// The Figma storyboards (`Motion / Success`, `Motion / Transaction`) are
/// keyframes of one continuous animation rather than a flipbook, so these are
/// rebuilt as real interpolated motion over the extracted artwork instead of
/// cross-fading ten bitmaps.
private enum DSMotionCurve {
    /// Progress of `t` through the window `start...end`, clamped to 0...1.
    static func ramp(_ t: Double, _ start: Double, _ end: Double) -> Double {
        guard end > start else { return t >= end ? 1 : 0 }
        return min(max((t - start) / (end - start), 0), 1)
    }

    /// `ramp` with an ease-in-out applied, for movement that should settle.
    static func easedRamp(_ t: Double, _ start: Double, _ end: Double) -> Double {
        let x = ramp(t, start, end)
        return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
    }
}

/// Native port of `motion-success.md`, rebuilt from Figma `Motion / Success`
/// (node 4188:21162).
///
/// The three storyboard frames are a single checkmark revealed by a
/// left-to-right wipe — the mask rect grows 1 → 22 → 60 across the frames,
/// anchored at x=19, y=23, height 52 inside the 96×96 circle. That is what is
/// reproduced here, replacing the earlier `checkmark.circle.fill` SF Symbol
/// with `.bounce`, which was neither the right artwork nor the right motion.
public struct DSSuccessCheckmark: View {
    /// Full cycle length. `motion-success.md` specifies 2.4s.
    private static let cycle: Double = 2.4

    /// Wipe geometry, in the artwork's own 96×96 coordinate space.
    private static let artSize: CGFloat = 96
    private static let wipeX: CGFloat = 19
    private static let wipeY: CGFloat = 23
    private static let wipeWidth: CGFloat = 60
    private static let wipeHeight: CGFloat = 52

    private let size: CGFloat
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    public init(size: CGFloat = 96) {
        self.size = size
    }

    public var body: some View {
        Group {
            if reduceMotion {
                // Reduce Motion: show the completed state rather than looping.
                artwork(revealed: 1)
            } else {
                TimelineView(.animation) { context in
                    let t = context.date.timeIntervalSinceReferenceDate
                        .truncatingRemainder(dividingBy: Self.cycle) / Self.cycle
                    // Draw on over the first half, then hold so the completed
                    // mark is readable before the loop restarts.
                    artwork(revealed: DSMotionCurve.easedRamp(t, 0.05, 0.5))
                }
            }
        }
        .frame(width: size, height: size)
        .accessibilityElement()
        .accessibilityLabel("成功")
        .accessibilityAddTraits(.isImage)
    }

    private func artwork(revealed: Double) -> some View {
        let scale = size / Self.artSize
        return ZStack {
            Circle().fill(DSColor.success600)

            DSIcon.successCheck.image
                .resizable()
                .scaledToFit()
                .foregroundStyle(DSColor.white)
                .mask(alignment: .topLeading) {
                    Rectangle()
                        .frame(
                            width: Self.wipeWidth * scale * revealed,
                            height: Self.wipeHeight * scale
                        )
                        .offset(x: Self.wipeX * scale, y: Self.wipeY * scale)
                }
        }
    }
}

/// Native port of `motion-transaction.md`, rebuilt from Figma
/// `Motion / Transaction` (node 8512:7478).
///
/// The ten storyboard frames describe one loop: a card slides in from the
/// left across a static payment terminal, the terminal screen turns green and
/// approves with a checkmark, then the card slides out to the right and the
/// screen resets. The terminal and card are shipped as separate pieces of
/// artwork so this is real motion, not a bitmap flipbook — and so it replaces
/// the earlier `wave.3.right` SF Symbol, which depicted something else
/// entirely.
public struct DSTransactionAnimation: View {
    /// Full cycle length. `motion-transaction.md` specifies 4s.
    private static let cycle: Double = 4

    /// Artwork coordinate space, straight from the storyboard frames.
    private static let artWidth: CGFloat = 180
    private static let artHeight: CGFloat = 236

    /// Terminal screen rect within the artwork (the `#C5C8BE` panel).
    private static let screen = CGRect(x: 26.84, y: 21.45, width: 126.32, height: 83.96)
    private static let screenRadius: CGFloat = 8.4

    /// How far the card travels off each edge, in artwork units.
    private static let cardTravel: CGFloat = 118

    private let height: CGFloat
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    public init(height: CGFloat = 236) {
        self.height = height
    }

    public var body: some View {
        Group {
            if reduceMotion {
                // Reduce Motion: hold the approved state — it is the frame
                // that carries the meaning — with no card movement.
                artwork(cardOffset: 0, cardOpacity: 0, approved: 1, revealed: 1)
            } else {
                TimelineView(.animation) { context in
                    let t = context.date.timeIntervalSinceReferenceDate
                        .truncatingRemainder(dividingBy: Self.cycle) / Self.cycle
                    artwork(
                        // In from the left, hold, then out to the right.
                        cardOffset: -Self.cardTravel
                            + Self.cardTravel * CGFloat(DSMotionCurve.easedRamp(t, 0.05, 0.30))
                            + Self.cardTravel * CGFloat(DSMotionCurve.easedRamp(t, 0.55, 0.78)),
                        cardOpacity: DSMotionCurve.ramp(t, 0.03, 0.10)
                            - DSMotionCurve.ramp(t, 0.74, 0.80),
                        approved: DSMotionCurve.ramp(t, 0.32, 0.42)
                            - DSMotionCurve.ramp(t, 0.84, 0.94),
                        revealed: DSMotionCurve.easedRamp(t, 0.42, 0.56)
                            - DSMotionCurve.ramp(t, 0.84, 0.92)
                    )
                }
            }
        }
        .frame(width: height * (Self.artWidth / Self.artHeight), height: height)
        .accessibilityElement()
        .accessibilityLabel("交易感應動畫")
        .accessibilityAddTraits(.isImage)
    }

    private func artwork(
        cardOffset: CGFloat,
        cardOpacity: Double,
        approved: Double,
        revealed: Double
    ) -> some View {
        let scale = height / Self.artHeight
        let screen = Self.screen

        return ZStack(alignment: .topLeading) {
            DSIcon.transactionTerminal.image
                .resizable()
                .scaledToFit()

            // Screen turns green on approval.
            RoundedRectangle(cornerRadius: Self.screenRadius * scale, style: .continuous)
                .fill(DSColor.primaryGreen800)
                .frame(width: screen.width * scale, height: screen.height * scale)
                .offset(x: screen.minX * scale, y: screen.minY * scale)
                .opacity(approved)

            // Approval checkmark, wiped in the same way as DSSuccessCheckmark.
            DSIcon.successCheck.image
                .resizable()
                .scaledToFit()
                .foregroundStyle(DSColor.white)
                .frame(width: screen.height * 0.62 * scale, height: screen.height * 0.62 * scale)
                .mask(alignment: .leading) {
                    Rectangle().scaleEffect(x: max(revealed, 0), anchor: .leading)
                }
                .offset(
                    x: (screen.midX - screen.height * 0.31) * scale,
                    y: (screen.midY - screen.height * 0.31) * scale
                )
                .opacity(approved)

            DSIcon.transactionCard.image
                .resizable()
                .scaledToFit()
                .offset(x: cardOffset * scale)
                .opacity(max(cardOpacity, 0))
        }
        .frame(
            width: Self.artWidth * scale,
            height: Self.artHeight * scale,
            alignment: .topLeading
        )
        .clipped()
    }
}

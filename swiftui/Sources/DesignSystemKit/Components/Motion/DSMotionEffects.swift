import SwiftUI

/// Native ports of `motion-success.md` / `motion-transaction.md`. Both
/// replace the spec's custom looping SVG/CSS animation with a native SF
/// Symbol effect (`.symbolEffect`) — the HIG-preferred way to animate
/// system iconography, which already degrades correctly under Reduce
/// Motion without extra guarding.
public struct DSSuccessCheckmark: View {
    @State private var hasAppeared = false

    public init() {}

    public var body: some View {
        Image(systemName: "checkmark.circle.fill")
            .font(.system(size: 64))
            .foregroundStyle(DSColor.success600)
            .symbolEffect(.bounce, value: hasAppeared)
            .onAppear { hasAppeared = true }
            .accessibilityLabel("成功")
    }
}

public struct DSTransactionAnimation: View {
    public init() {}

    public var body: some View {
        Image(systemName: "wave.3.right")
            .font(.system(size: 48))
            .foregroundStyle(DSColor.success600)
            .symbolEffect(.variableColor.iterative.reversing, options: .repeating)
            .accessibilityLabel("交易感應動畫")
    }
}

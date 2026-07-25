import SwiftUI

/// Native port of `tooltip.md`. HIG has no hover-triggered tooltip pattern
/// on iOS (most input is touch, not hover) — a tap/long-press-triggered
/// `.popover` is the native equivalent, and unlike a CSS hover tooltip it is
/// reachable identically by touch, pointer, and VoiceOver (focus + activate)
/// for free.
public extension View {
    func dsTooltip(isPresented: Binding<Bool>, text: String) -> some View {
        popover(isPresented: isPresented) {
            Text(text)
                .dsFont(.bodyS)
                .foregroundStyle(DSColor.white)
                .padding(DSSpacing.s)
                .background(DSColor.black)
                .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
                // Figma attaches Elevation/4 to the tooltip; this had none.
                .dsElevation(.level4)
                .presentationCompactAdaptation(.popover)
        }
    }
}

import SwiftUI

/// Native port of `snackbar.md` — a transient, bottom-anchored, auto-dismissing
/// toast. Announced via `.accessibilityAddTraits(.updatesFrequently)` so
/// VoiceOver treats its appearance as a live update rather than requiring the
/// user to discover it by navigating there manually, matching the spec's
/// live-region requirement.
public extension View {
    func dsSnackbar(isPresented: Binding<Bool>, message: String, autoDismissAfter seconds: Double = 4, showsCloseButton: Bool = true) -> some View {
        overlay(alignment: .bottom) {
            if isPresented.wrappedValue {
                DSSnackbarView(message: message, showsCloseButton: showsCloseButton) {
                    isPresented.wrappedValue = false
                }
                .padding(.horizontal, DSSpacing.m)
                .padding(.bottom, DSSpacing.sm)
                .transition(.move(edge: .bottom).combined(with: .opacity))
                .task {
                    guard seconds > 0 else { return }
                    try? await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
                    isPresented.wrappedValue = false
                }
            }
        }
        .dsAnimation(DSMotion.standard, value: isPresented.wrappedValue)
    }
}

private struct DSSnackbarView: View {
    let message: String
    let showsCloseButton: Bool
    let onClose: () -> Void

    var body: some View {
        HStack(spacing: DSSpacing.sm) {
            Text(message)
                .dsFont(.bodyM)
                .foregroundStyle(DSColor.white)
            if showsCloseButton {
                Spacer(minLength: 0)
                Button(action: onClose) {
                    Image(systemName: "xmark")
                        .foregroundStyle(DSColor.white)
                }
                .accessibilityLabel("關閉")
            }
        }
        .padding(.vertical, DSSpacing.s)
        .padding(.horizontal, DSSpacing.m)
        .background(DSColor.gray800)
        .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
        .dsElevation(.level3)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(.updatesFrequently)
    }
}

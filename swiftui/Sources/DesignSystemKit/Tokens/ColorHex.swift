import SwiftUI

/// Shared hex-color initializer used by the generated `DSColor` constants
/// (see `Tokens/Generated/DSColor.swift`). Hand-written — the generator
/// only emits the semantic constants, not this helper.
extension Color {
    init(hex: UInt32) {
        let r = Double((hex >> 16) & 0xFF) / 255
        let g = Double((hex >> 8) & 0xFF) / 255
        let b = Double(hex & 0xFF) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: 1)
    }
}

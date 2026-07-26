import SwiftUI

/// Native port of `logos.md`. The Figma source shows the real trademarked
/// marks (Visa, Mastercard, Apple, Google, Facebook, telecom carriers) —
/// reproducing those pixel-for-pixel would fabricate real trademarks this
/// project has no license to use, so each renders as a neutral badge
/// labelled with its name, matching the same decision already made in the
/// React source's `Logos.tsx`.
///
/// Unlike the spec's own note that the source component has no accessible
/// name (a documented gap there), this native version closes that gap by
/// construction: the label is always also the accessibility label.
public enum DSPaymentBrand: CaseIterable {
    case creditCard, mastercard, jcb, linePay, googlePay, applePay
    case apple, google, facebook, cht, taiwanMobile, fet

    var label: String {
        switch self {
        case .creditCard: return "卡"
        case .mastercard: return "Mastercard"
        case .jcb: return "JCB"
        case .linePay: return "LINE Pay"
        case .googlePay: return "Google Pay"
        case .applePay: return "Apple Pay"
        case .apple: return "Apple"
        case .google: return "G"
        case .facebook: return "f"
        case .cht: return "中華電信"
        case .taiwanMobile: return "台灣大哥大"
        case .fet: return "遠傳"
        }
    }
}

public struct DSPaymentBrandBadge: View {
    private let brand: DSPaymentBrand

    public init(_ brand: DSPaymentBrand) {
        self.brand = brand
    }

    public var body: some View {
        Text(brand.label)
            .dsFont(.bodyS)
            .fontWeight(.semibold)
            .foregroundStyle(DSColor.gray800)
            .padding(.horizontal, DSSpacing.s)
            .padding(.vertical, DSSpacing.xs)
            .background(DSColor.gray100)
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.xxs, style: .continuous))
            .accessibilityLabel(brand.label)
    }
}

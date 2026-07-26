import SwiftUI

/// Native port of `app-bar.md` — Figma `App Bar` (node 495:426).
///
/// Unlike `DSToggle` / `DSSegmentedControl` / `DSStepper` / `DSSearchBar`, this
/// one deliberately **stays native**. Figma draws a 48pt white bar with a
/// centred 16pt regular title; iOS gives a 44pt bar with a 17pt semibold one.
/// That gap is small, and replacing the navigation bar to close it would mean
/// giving up the automatic back button tied to real navigation depth, the
/// swipe-back gesture, large-title collapse, and toolbar safe-area handling —
/// a large behavioural cost for a minor visual one. The gap is narrowed here
/// instead: the title is pinned inline (centred and compact, as in Figma) and
/// the toolbar buttons use the brand's own 24pt glyphs rather than SF Symbols.
///
/// The back button isn't reproduced at all: `NavigationStack` supplies it
/// automatically whenever the screen was reached via `NavigationLink`, and
/// never shows one for a root screen — which is strictly more correct than the
/// spec's manual `showBack` flag, since it can never get out of sync with
/// actual navigation depth.
public extension View {
    /// `type: nav`
    func dsAppBar(title: String, onSettingsTap: (() -> Void)? = nil) -> some View {
        navigationTitle(title)
            .dsInlineTitle()
            .toolbar {
                if let onSettingsTap {
                    ToolbarItem(placement: DSPlatform.toolbarTrailing) {
                        Button(action: onSettingsTap) {
                            DSIconView(.setting)
                        }
                        .accessibilityLabel("設定")
                    }
                }
            }
    }

    /// `type: ProfileInfo`
    func dsProfileAppBar(name: String, avatarURL: URL?, onSettingsTap: (() -> Void)? = nil) -> some View {
        toolbar {
            ToolbarItem(placement: .principal) {
                // Figma: a 48pt avatar and a 14pt name, 16pt apart — this was
                // a 32pt avatar with a 16pt name.
                HStack(spacing: DSSpacing.m) {
                    AsyncImage(url: avatarURL) { phase in
                        if case .success(let image) = phase {
                            image.resizable().scaledToFill()
                        } else {
                            Circle().fill(DSColor.gray100)
                        }
                    }
                    .frame(width: 48, height: 48)
                    .clipShape(Circle())
                    Text(name).dsFont(.bodyM).foregroundStyle(DSColor.black)
                }
                .accessibilityElement(children: .combine)
            }
            if let onSettingsTap {
                ToolbarItem(placement: DSPlatform.toolbarTrailing) {
                    Button(action: onSettingsTap) {
                        DSIconView(.setting)
                    }
                    .accessibilityLabel("設定")
                }
            }
        }
    }
}

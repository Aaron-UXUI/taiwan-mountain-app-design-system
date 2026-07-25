import SwiftUI

/// Native port of `app-bar.md`, applied as toolbar content to a screen
/// already inside a `NavigationStack`. The back button isn't reproduced at
/// all: `NavigationStack` supplies it automatically whenever the screen was
/// reached via `NavigationLink`, and never shows one for a root screen —
/// which is strictly more correct than the spec's manual `showBack` flag,
/// since it can never get out of sync with actual navigation depth.
public extension View {
    /// `type: nav`
    func dsAppBar(title: String, onSettingsTap: (() -> Void)? = nil) -> some View {
        navigationTitle(title)
            .toolbar {
                if let onSettingsTap {
                    ToolbarItem(placement: DSPlatform.toolbarTrailing) {
                        Button(action: onSettingsTap) {
                            Image(systemName: "gearshape")
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
                HStack(spacing: DSSpacing.s) {
                    AsyncImage(url: avatarURL) { phase in
                        if case .success(let image) = phase {
                            image.resizable().scaledToFill()
                        } else {
                            Circle().fill(DSColor.gray100)
                        }
                    }
                    .frame(width: 32, height: 32)
                    .clipShape(Circle())
                    Text(name).dsFont(.bodyL).foregroundStyle(DSColor.black)
                }
                .accessibilityElement(children: .combine)
            }
            if let onSettingsTap {
                ToolbarItem(placement: DSPlatform.toolbarTrailing) {
                    Button(action: onSettingsTap) {
                        Image(systemName: "gearshape")
                    }
                    .accessibilityLabel("設定")
                }
            }
        }
    }
}

import SwiftUI

/// Native ports of `list-weather.md`, `list-setting.md`,
/// `list-download-map.md`, and `list-notification.md`. All four are designed
/// to be placed inside a native `List` / `Form`, not to reimplement one —
/// they compose with `List`'s own separators, swipe actions, and section
/// styling instead of re-drawing that chrome.

/// `list-weather.md`
public struct DSWeatherRow: View {
    private let date: String
    private let condition: DSIcon
    private let conditionText: String
    private let temperature: String

    public init(date: String, condition: DSIcon, conditionText: String, temperature: String) {
        self.date = date
        self.condition = condition
        self.conditionText = conditionText
        self.temperature = temperature
    }

    public var body: some View {
        HStack {
            Text(date)
                .dsFont(.bodyL)
                .foregroundStyle(DSColor.black)
                .frame(width: 56, alignment: .leading)
            Spacer()
            // The glyph carries no accessible text of its own; the row's
            // combined label below states the condition in words, which
            // `list-weather.md` requires (the icon must never be the only
            // carrier of the forecast).
            DSIconView(condition)
            Spacer()
            Text(temperature)
                .dsFont(.bodyL)
                .foregroundStyle(DSColor.black)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(date), \(conditionText), \(temperature)")
    }
}

/// `list-setting.md` — presentation only; wrap in `Button` for an in-place
/// action or `NavigationLink` for drill-down navigation, exactly like a
/// native Settings row.
public struct DSSettingRowLabel: View {
    private let text: String
    private let showsChevron: Bool

    public init(_ text: String, showsChevron: Bool = true) {
        self.text = text
        self.showsChevron = showsChevron
    }

    public var body: some View {
        HStack {
            Text(text).dsFont(.bodyL).foregroundStyle(DSColor.black)
            Spacer()
            if showsChevron {
                Image(systemName: "chevron.forward")
                    .foregroundStyle(DSColor.gray400)
                    .accessibilityHidden(true)
            }
        }
        .contentShape(Rectangle())
    }
}

/// `list-download-map.md`
public struct DSDownloadMapRow: View {
    private let regionName: String
    private let downloadState: DSIconButtonDownloadState

    public init(regionName: String, downloadState: DSIconButtonDownloadState = .idle) {
        self.regionName = regionName
        self.downloadState = downloadState
    }

    public var body: some View {
        HStack {
            Text(regionName).dsFont(.bodyL).foregroundStyle(DSColor.black)
            Spacer()
            DSIconButton(.offlineMap(downloadState)) {}
        }
    }
}

/// `list-notification.md` — a thin `Toggle` row; unlike the standalone
/// `Toggle` component, the label is required, so it always has an
/// accessible name.
public struct DSNotificationSettingRow: View {
    private let label: String
    @Binding private var isOn: Bool

    public init(_ label: String, isOn: Binding<Bool>) {
        self.label = label
        self._isOn = isOn
    }

    public var body: some View {
        Toggle(label, isOn: $isOn)
            .dsFont(.bodyL)
            .tint(DSColor.primaryGreen800)
    }
}

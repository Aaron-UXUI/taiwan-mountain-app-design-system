import SwiftUI

/// Native ports of `list-weather.md`, `list-setting.md`,
/// `list-download-map.md`, and `list-notification.md`. All four are designed
/// to be placed inside a native `List` / `Form`, not to reimplement one —
/// they compose with `List`'s own separators, swipe actions, and section
/// styling instead of re-drawing that chrome.

/// `list-weather.md` — Figma `List / weather` (node 877:8425).
///
/// Despite the "list row" name this is a **vertical day column**, 96pt wide,
/// meant to be laid out side by side in a horizontally scrolling forecast
/// strip: condition glyph on top, then date/weekday, temperature, apparent
/// temperature, precipitation, UV, sunrise, sunset, humidity and wind. The
/// earlier port was a three-item horizontal row (date · glyph · temperature),
/// which is a different component entirely.
public struct DSWeatherColumn: View {
    private let date: String
    private let weekday: String
    private let condition: DSIcon
    private let conditionText: String
    private let temperature: String
    private let apparentTemperature: String
    private let precipitationRate: String
    private let uvIndex: String
    private let uvLevel: String
    private let sunrise: String
    private let sunset: String
    private let humidity: String
    private let windSpeed: String
    private let windDirection: String

    public init(
        date: String,
        weekday: String,
        condition: DSIcon,
        conditionText: String,
        temperature: String,
        apparentTemperature: String,
        precipitationRate: String,
        uvIndex: String,
        uvLevel: String,
        sunrise: String,
        sunset: String,
        humidity: String,
        windSpeed: String,
        windDirection: String
    ) {
        self.date = date
        self.weekday = weekday
        self.condition = condition
        self.conditionText = conditionText
        self.temperature = temperature
        self.apparentTemperature = apparentTemperature
        self.precipitationRate = precipitationRate
        self.uvIndex = uvIndex
        self.uvLevel = uvLevel
        self.sunrise = sunrise
        self.sunset = sunset
        self.humidity = humidity
        self.windSpeed = windSpeed
        self.windDirection = windDirection
    }

    public var body: some View {
        VStack(spacing: 0) {
            // The glyph carries no accessible text of its own; the column's
            // combined label below states the condition in words, which
            // `list-weather.md` requires (the icon must never be the only
            // carrier of the forecast).
            DSIconView(condition)
                .frame(width: 24, height: 24)

            VStack(spacing: DSSpacing.s) {
                cell {
                    primary(date)
                    secondary(weekday)
                }
                cell { primary(temperature) }
                cell { primary(apparentTemperature) }
                cell { primary(precipitationRate) }
                cell(spacing: 0) {
                    primary(uvIndex)
                    secondary(uvLevel)
                }
                cell { primary(sunrise) }
                cell { primary(sunset) }
                cell { primary(humidity) }
                cell { primary(windSpeed) }
                cell { secondary(windDirection) }
            }
            .padding(.horizontal, DSSpacing.sm)
            .padding(.vertical, DSSpacing.xs)
        }
        .padding(.vertical, DSSpacing.sm)
        .frame(width: 96)
        .background(DSColor.white, in: RoundedRectangle(cornerRadius: DSRadius.xs, style: .continuous))
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(
            "\(date) \(weekday), \(conditionText), 溫度 \(temperature), 體感 \(apparentTemperature), "
            + "降雨機率 \(precipitationRate), 紫外線 \(uvIndex) \(uvLevel), 日出 \(sunrise), 日落 \(sunset), "
            + "相對濕度 \(humidity), 風速 \(windSpeed), 風向 \(windDirection)"
        )
    }

    private func cell<Content: View>(spacing: CGFloat = DSSpacing.xs, @ViewBuilder content: () -> Content) -> some View {
        VStack(spacing: spacing, content: content)
            .padding(.vertical, DSSpacing.s)
            .frame(maxWidth: .infinity)
    }

    private func primary(_ text: String) -> some View {
        Text(text)
            .dsFont(.bodyL)
            .foregroundStyle(DSColor.black)
            .multilineTextAlignment(.center)
    }

    private func secondary(_ text: String) -> some View {
        Text(text)
            .dsFont(.bodyS)
            .foregroundStyle(DSColor.black)
            .multilineTextAlignment(.center)
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
        // Figma: 24pt horizontal / 12pt vertical padding, black bodyL label,
        // and the brand 14pt chevron rotated to point trailing — not an SF
        // Symbol in grey.
        HStack {
            Text(text).dsFont(.bodyL).foregroundStyle(DSColor.black)
            Spacer(minLength: DSSpacing.s)
            if showsChevron {
                DSIconView(.chevron)
                    .rotationEffect(.degrees(-90))
                    .foregroundStyle(DSColor.black)
                    .accessibilityHidden(true)
            }
        }
        .padding(.horizontal, DSSpacing.lm)
        .padding(.vertical, DSSpacing.sm)
        .background(DSColor.white)
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
        // Figma: 4pt vertical padding around the row; the icon button supplies
        // its own 12pt padding.
        HStack(spacing: 0) {
            Text(regionName).dsFont(.bodyL).foregroundStyle(DSColor.black)
            Spacer(minLength: DSSpacing.s)
            DSIconButton(.offlineMap(downloadState)) {}
        }
        .padding(.vertical, DSSpacing.xs)
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
        // Figma: 8pt vertical padding around the row. The switch is the same
        // `Toggles` component as `DSToggle`, so it uses the same brand style
        // rather than the native one.
        Toggle(label, isOn: $isOn)
            .dsFont(.bodyL)
            .toggleStyle(DSSwitchStyle())
            .padding(.vertical, DSSpacing.s)
    }
}

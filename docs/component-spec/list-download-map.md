# ListDownloadMap

## Component Behavior
A row offering to download an offline map region by name, with a dedicated download action at the trailing edge.

## Interaction
- **Download**: pointer click/tap on the trailing download control initiates the download (the actual progress/completion states live on the embedded download control itself — see IconButton, OfflineMap purpose).
- **Keyboard**: the download control is focusable; Enter/Space activates it.

## Accessibility
- The download control is exposed as a **button** with a fixed accessible name ("下載離線地圖") since it's icon-only.
- The row's label text (region name) should be associated with — or at least adjacent in reading order to — the download control, so assistive tech users understand *what* is being downloaded, not just that "download" is available.

## State
Content toggle: download control shown/hidden (a row may be display-only without an active download offer).

## Variant
No variant axis — label text only.

## Animation
None defined at this component's level (download progress animation, if any, lives in the embedded control).

## Token Mapping
| Role | Token |
|---|---|
| Text | `color.gray-black` |
| Typography | `typography.body-l`, `font-weight.regular` |
| Spacing | `spacing.sm`, `spacing.xs` |

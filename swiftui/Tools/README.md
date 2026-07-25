# Figma icon + motion extraction

Regenerates `Sources/DesignSystemKit/Resources/DSIcons.xcassets` from the
Figma frame exports checked in beside these scripts. Run in order:

```bash
cd swiftui/Tools
node extract.mjs         # frame exports -> per-glyph SVGs + manifest.json
node make-xcassets.mjs   # per-glyph SVGs -> 48 imagesets
node extract-motion.mjs  # storyboard artwork -> 3 more imagesets
```

## Source frames

| File | Figma node | Contents |
|---|---|---|
| `frame-24.svg` | `486:5205` | `icon / 24px` — 22 glyphs |
| `frame-weather.svg` | `1743:13737` | `icon / 24px / weather` — 7 |
| `frame-map.svg` | `11129:12166` | `icon / 24px / Map` — 4 |
| `frame-20.svg` | `490:21891` | `icon / 20px` — 7 |
| `frame-16.svg` | `10787:61593` | `icon / 16px` — 6 |
| `frame-14.svg` | `507:4429` | `icon / 14px` — 2 |
| `motion-success.svg` | `4188:21162` | `Motion / Success` — 3 keyframes |
| `tx-frame01.svg` | `8512:7477` | `Motion / Transaction` frame 01 (terminal only) |
| `tx-frame04.svg` | `8512:7827` | `Motion / Transaction` frame 04 (card over terminal) |

Frame-level exports are used deliberately. A per-symbol export from Figma
comes wrapped in ancestor canvas artwork (a `#1E1E1E` page background, huge
page rects, and the purple `#9747FF` dashed component boundary), whereas a
frame export nests each glyph as `<g id="Type=NAME">` at a known offset —
so the glyph can be sliced out cleanly and re-origined to its own box.

## Things these scripts guard against

Both extractors fail loudly rather than silently shipping broken art:

- **Canvas chrome leaking in** — the `#1E1E1E` / `#9747FF` / `#F3F5EE`
  ancestor artwork must never reach a glyph.
- **Dangling paint references** — the transaction card's body is filled with
  `url(#paint0_linear_…)`, so slicing the group without carrying its `<defs>`
  across left the card invisible with only its chip drawn. `collectDefs`
  copies referenced gradients over and a post-check rejects any `url(#…)`
  with no matching `id=` in the same file.

## Rendering modes

44 glyphs ship as **template** images and take their colour from the
surrounding `foregroundStyle`. Four are **original**-rendered because their
multiple colours are the design: `weather/cloud-sun` and `weather/sunny`
(yellow sun over a grey cloud) and `24/radio` and `24/radio-fill` (a white
centre knocked out of a dark ring, which a flat tint would fill in).

Two glyphs are drawn with a semantic colour rather than the default ink —
`16/exclamation` (`destruct-600`) and `20/check` (`success-700`). They stay
template-rendered so callers can override them, with `DSIcon.defaultTint`
supplying the Figma colour by default.

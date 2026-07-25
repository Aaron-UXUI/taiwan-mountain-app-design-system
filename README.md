# 台灣山林 App Design System

一個跨平台 Design System:同一份需求,同時在 **React（Storybook）** 與 **SwiftUI（Component Gallery App）** 兩個平台上實作,透過單一 Design Tokens 來源 + 平台無關的 Component Spec 保持同步。

```
Figma Variables
      │
      ▼
Design Tokens ──generate──▶ React CSS 變數 ──▶ Storybook
(唯一來源 JSON)  │
      └─────────generate──▶ SwiftUI Swift 常數
                                   │
Component Spec ──behavior 規格依據──▶ React 元件實作 ──▶ Storybook
(docs/component-spec/*.md)   └──────behavior 規格依據──▶ SwiftUI 元件實作 ──▶ Component Gallery App
```

新增或修改一個元件時,永遠先動這兩個地方,再回頭去 React / SwiftUI 兩邊實作:

1. **Design Tokens**(`tokens/design-tokens.json`)——新增數值,跑 `npm run tokens:build`,React 跟 SwiftUI 自動拿到一致的常數。
2. **Component Spec**(`docs/component-spec/<name>.md`)——先定案 Behavior / Interaction / Accessibility / State / Variant / Animation / Token Mapping,兩邊實作都對照這份文件。

完整流程、每一步在做什麼、為什麼 Design Tokens 能全自動而 Component Spec 不行,請見 **[`docs/workflow.md`](docs/workflow.md)**。

## Repository 結構

```
design-system/
├── tokens/                    ← Design Tokens 唯一來源 + 產生器
├── docs/
│   ├── component-spec/         ← 60 份平台無關元件規格
│   └── workflow.md              ← 跨平台同步流程(從這裡開始讀)
├── react/                     ← React 元件實作
├── storybook/                 ← Storybook 設定
├── swiftui/                   ← SwiftUI 元件庫 + Component Gallery App
└── README.md
```

## 快速開始

```bash
npm install              # npm workspaces,一次裝好 react/ 的相依套件
npm run tokens:build      # 改動 tokens/design-tokens.json 後重新產生 CSS + Swift 常數
npm run typecheck
npm run storybook
```

SwiftUI 側需要 Xcode——在 Xcode 開啟 `swiftui/Package.swift`,選 `ComponentGallery` scheme 執行,或先用 `cd swiftui && swift build --target DesignSystemKit` 驗證元件庫本身。細節見 [`swiftui/README.md`](swiftui/README.md)。

## 其他文件

- [`docs/workflow.md`](docs/workflow.md) — 跨平台同步的完整工作流程
- [`docs/component-spec/`](docs/component-spec/) — 60 份平台無關元件規格
- [`docs/DESIGN_SYSTEM_ANALYSIS.md`](docs/DESIGN_SYSTEM_ANALYSIS.md) — 現況分析:tokens 盤點、元件目錄、架構、Storybook 覆蓋率評估
- [`docs/figma-mapping.md`](docs/figma-mapping.md) — Figma 元件 ↔ 程式碼元件對照表
- [`docs/style-guide.md`](docs/style-guide.md) — Typography/Elevation 官方組合與使用元件清單
- [`swiftui/README.md`](swiftui/README.md) — SwiftUI 元件對照原生控制項的取捨說明

## Figma 來源資訊

- Figma 檔案:`nXFkT45U8mDzUK5rUfL0eK`,library「【設計】台灣山林 App」
- Color 數值來自 Figma 外掛匯出的 `Mode 1.tokens.json`(W3C Design Tokens 格式)
- Typography / Elevation 數值來自檔案內建的「🔶 Design System」→ Style Guide 文件 frame(而非個別元件實例)
- 目前沒有正式 Code Connect(方案限制),`docs/figma-mapping.md` 是手動維護的替代方案

# 台灣山林 App Design System

一個跨平台 Design System:同一份需求,同時在 **React（Storybook）** 與 **SwiftUI（Component Gallery App）** 兩個平台上實作,透過單一 Design Tokens 來源 + 平台無關的 Component Spec 保持同步。

```
              Figma 檔案 = 唯一依據來源
                       │
     ┌─────────────────┼─────────────────┐
     ▼                 ▼                 ▼
Design Tokens    React 元件實作    SwiftUI 元件實作
(Figma Variables  (對照 Figma       (對照 Figma
 匯出的 JSON)      節點的實際 CSS)   節點的實際 CSS)
     │                 │                 │
     ├──▶ CSS 變數 ────┘                 │
     └──▶ Swift 常數 ────────────────────┘
```

**視覺一律以 Figma 為準。** 尺寸、間距、圓角、線寬、字級、字重、顏色——實作前用
Figma MCP 的 `get_design_context` 取得該節點的實際 CSS,不要憑截圖目測,也不要憑
`docs/component-spec/` 的文字描述(那是二手轉述,寫錯了兩個平台會一起錯)。

新增或修改一個元件時:

1. **先看 Figma**——取得目標節點的精確 CSS,並在程式碼註解裡記下節點 id。
2. **Design Tokens**(`tokens/design-tokens.json`)——需要新數值就先加在這裡,跑 `npm run tokens:build`,React 跟 SwiftUI 自動拿到一致的常數。
3. **兩個平台各自實作**,對照同一個 Figma 節點。
4. **Component Spec**(`docs/component-spec/<name>.md`)——補上 Behavior / Interaction / Accessibility 等**行為**決策;它記錄的是跨平台取捨,不是視覺數值的依據。

完整流程與這個原則的來由(前幾輪照 spec 實作而與原稿差很遠的實例),請見 **[`docs/workflow.md`](docs/workflow.md)**。

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

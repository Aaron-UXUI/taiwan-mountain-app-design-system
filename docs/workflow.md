# Workflow — 跨平台 Design System 同步流程

```
                    ┌─────────────────────────────┐
                    │  Figma 檔案 = 唯一依據來源   │
                    │  nXFkT45U8mDzUK5rUfL0eK      │
                    └──────────────┬──────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
  Design Tokens            React 元件實作            SwiftUI 元件實作
  (從 Figma Variables       (對照 Figma 節點           (對照 Figma 節點
   匯出的 JSON)              的實際 CSS)                的實際 CSS)
         │                         │                         │
         ├──generate──▶ CSS 變數 ──┘                         │
         └──generate──▶ Swift 常數 ────────────────────────-─┘

  docs/component-spec/*.md  ← 描述性文件,記錄 behavior/a11y 決策
                              **不是**視覺規格的依據
```

## 核心原則:Figma 是唯一依據來源

視覺上的任何問題——尺寸、間距、圓角、線寬、字級、字重、顏色、層級順序——
**一律以 Figma 檔案本身為準**,用 Figma MCP 的 `get_design_context` 取得該節點的
實際 CSS 再實作,不要憑截圖目測,也不要憑 `docs/component-spec/` 的描述。

> **為什麼特別強調這件事**:前幾輪稽核吃過虧。spec 是人寫的二手轉述,寫錯了
> 兩個平台就會一起錯,而且錯得「很一致」所以不容易發現。實際發生過的例子:
> spec 把 `List / weather` 寫成水平列(Figma 是垂直的一整欄)、把 Bottom Bar 的
> `2 Buttons` 寫成兩顆按鈕(Figma 是一顆按鈕加一個分頁捷徑)、把 Text Field 的
> S/M/L/XL 寫成字級(Figma 是寬度)。這些都是照 spec 實作、也「照做了」,
> 但跟原稿差很遠。
>
> `docs/component-spec/` 仍然有用,但它的角色是**記錄行為與無障礙決策**
> (例如「iOS 上這個元件改用原生控制項」、VoiceOver 要怎麼報讀),
> 以及跨平台的取捨紀錄——**不是**視覺數值的依據。兩者衝突時,以 Figma 為準,
> 並回頭修正 spec。

新增或修改一個元件時:

1. **先看 Figma**——用 `get_design_context` 取得目標節點的精確 CSS。
2. **Design Tokens**(`tokens/design-tokens.json`)——如果需要新的顏色/間距/圓角/字級/陰影/動效數值,先加在這裡。
3. **兩個平台各自實作**,都對照同一個 Figma 節點,並在程式碼註解裡記下節點 id。
4. **Component Spec**——補上這次確立的 behavior / a11y 決策。

這兩份東西各自的「同步」機制不一樣,必須先講清楚,才不會誤解成「全自動」:

| | Design Tokens | Component Spec |
|---|---|---|
| 同步方式 | **全自動**——跑一個指令,React 的 CSS 變數跟 SwiftUI 的 Swift 常數會從同一份 JSON 重新產生,數值、變數名稱保證一致 | **人工但有規格可循**——spec 是給人(或 AI 助手)看的行為契約,不是可執行的程式碼。改完 spec 之後,要分別去 React 跟 SwiftUI 兩邊,照著同一份 spec 實作/修改元件 |
| 為什麼不能全自動 | Design Tokens 本來就是結構化資料(JSON),可以機械式轉換成任何語言的常數 | Behavior/Interaction/Accessibility 這些是自然語言描述的設計決策(例如「RadioButton 在 iOS 上要改用原生的選單打勾列表,而不是真的畫一個圓形選項」),沒有辦法從一段文字自動生出正確、道地、通過各平台 HIG/無障礙檢查的程式碼——這一步永遠需要人(或 AI)讀懂 spec 之後動手刻 |
| 保證「同步」的方式 | 兩個平台的產出**數值保證相同**,因為都來自同一份 JSON | 兩個平台的**行為保證一致**,因為兩邊的實作都是照著同一份 spec 文件寫的,不是各自猜 |

---

## Repository 結構

```
design-system/
├── tokens/
│   ├── design-tokens.json      ← 唯一來源(single source of truth):Color / Spacing / Radius / Typography / Elevation / Motion
│   ├── build-tokens.mjs        ← 產生器:讀 json,產出下面三組檔案
│   └── design-tokens.css       ← 產生檔(勿手動編輯)
│
├── docs/
│   ├── component-spec/*.md      ← 唯一來源:平台無關的元件行為規格,每元件一份
│   ├── workflow.md              ← 本文件
│   ├── figma-mapping.md         ← Figma 元件 ↔ 程式碼元件對照表
│   ├── style-guide.md           ← Typography/Elevation 官方組合表
│   └── DESIGN_SYSTEM_ANALYSIS.md ← 現況分析報告
│
├── react/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── tokens.css           ← 產生檔(勿手動編輯):Typography + Elevation 的 CSS 變數
│       ├── foundations/
│       └── components/**        ← React 實作,60 個元件,依照 docs/component-spec 撰寫
│
├── storybook/                   ← Storybook 設定(main.ts / preview.ts),瀏覽/測試 React 元件
│
├── swiftui/
│   ├── Package.swift
│   ├── README.md                ← SwiftUI 這一側的細節(哪些元件對應原生元件、為什麼)
│   └── Sources/
│       ├── DesignSystemKit/
│       │   ├── Tokens/
│       │   │   ├── Generated/*.swift   ← 產生檔(勿手動編輯):對應 tokens/design-tokens.json
│       │   │   └── (其餘手寫檔)         ← ViewModifier / 機制本身,不隨 tokens 變動
│       │   └── Components/**            ← SwiftUI 實作,依照 docs/component-spec 撰寫
│       ├── GalleryKit/                  ← Component Gallery App 的畫面
│       └── ComponentGallery/            ← App 進入點
│
├── package.json                  ← root workspace manifest,"tokens:build" 指令在這裡
└── README.md
```

---

## Design Tokens Pipeline(自動同步)

**唯一來源**:`tokens/design-tokens.json`。每個 token 除了數值,還會明確標註它在各平台要輸出成什麼名字:

```json
"green-800": {
  "value": "#464F34",
  "cssVar": "--color-primary-green-800",
  "swiftName": "primaryGreen800"
}
```

**產生器**:`tokens/build-tokens.mjs`(純 Node.js,零額外套件),讀這份 JSON,一次產出三組檔案:

```bash
npm run tokens:build
```

| 輸出 | 內容 | 平台 |
|---|---|---|
| `tokens/design-tokens.css` | Spacing / Radius / Color 的 CSS 變數 | React / Storybook |
| `react/src/tokens.css` | Typography / Elevation 的 CSS 變數 | React / Storybook |
| `swiftui/.../Tokens/Generated/*.swift` | `DSColor` / `DSSpacing` / `DSRadius` / `DSTypeStyle.*` / `DSElevationStyle.*` / `DSMotion.*` 常數 | SwiftUI |

**什麼時候要跑這個指令**:改完 `tokens/design-tokens.json` 之後(新增顏色、調整間距、修正字級……)。跑完之後,React 跟 SwiftUI 元件完全不用改一行程式碼就會拿到新數值——因為兩邊的元件永遠只 reference 語意化的名字(`var(--color-primary-green-800)` / `DSColor.primaryGreen800`),從來不寫死原始數值。

**目前 6 大類 token 都已經整併進這份 JSON**(先前 Typography/Elevation 只存在於 `react/src/tokens.css` 手寫檔裡,跟 Color/Spacing/Radius 的 JSON 是分開兩個來源——重新整理後全部併成一份)。已知的 Figma Style Guide 本身的不一致(例如 Headline/1 字重異常、Number/L 與 Number/M 數值重複)都忠實保留,並在 JSON 裡用 `note` 欄位記錄原因,不擅自「修正」。

**已知限制**:目前只有一組 Mode(無 Dark Mode 數值)。之後如果 Figma 端有 Dark Mode 變數,擴充方式是在每個 color leaf 底下新增一個 `darkValue` 欄位,產生器再多輸出一份 `[data-theme="dark"]`(CSS)/ 之後 SwiftUI 端也要跟進 Asset Catalog 或 `@Environment(\.colorScheme)` 條件判斷。

---

## Component Spec(人工同步,但有明確流程)

**唯一來源**:`docs/component-spec/<component-name>.md`,平台無關,固定 7 個段落:

- **Component Behavior** — 這個元件在 UI 裡扮演什麼角色、組合規則
- **Interaction** — 指標/鍵盤等輸入方式與觸發結果
- **Accessibility** — 語意角色、可及名稱、狀態如何傳達給輔助科技
- **State** — 所有狀態列表
- **Variant** — 所有變體軸列表
- **Animation** — 觸發時機、時長、緩動曲線(沒有動畫就明講 None)
- **Token Mapping** — 對應到 Design Tokens 的語意化角色

這份文件故意不提 React 或 SwiftUI 語法,只描述「應該要有什麼行為」——這樣它才能同時是 React 實作跟 SwiftUI 實作的共同依據,而不是被綁死在某一個平台的既有做法上。

### 新增 / 修改一個元件的標準流程

1. **確認 tokens 夠不夠用**。不夠就先加進 `tokens/design-tokens.json`,跑 `npm run tokens:build`。
2. **寫/改 `docs/component-spec/<name>.md`**——先把 7 個段落定案,這是接下來兩邊實作唯一要對照的依據。
3. **實作/修改 React 元件**(`react/src/components/<category>/<Name>/`)——照 spec 的 State/Variant/Animation 寫 props 與樣式,樣式只能 `var(--token-name)`,不得寫死數值。
4. **補上 Storybook story**(`.stories.tsx`,CSF3 + `tags:["autodocs"]`)——每個 variant/state 都要至少一個 story 能切換到。
5. **實作/修改 SwiftUI 元件**(`swiftui/Sources/DesignSystemKit/Components/<Category>/`)——照同一份 spec 寫,樣式只能 `DSColor.*`/`DSSpacing.*`/`.dsFont(...)` 等 token 存取點;優先看有沒有對應的原生 SwiftUI 控制項可以直接用(見 `swiftui/README.md` 的對照表),不要預設要手刻。
6. **把新元件加進 Gallery 的對應 Showcase**(`swiftui/Sources/GalleryKit/Showcases/`),讓它能被瀏覽到。
7. **回填 `docs/figma-mapping.md`** 對應那一列的程式碼元件與檔案路徑。

步驟 1、2 是這個流程裡「只需要動一次、兩邊自動或有依據跟上」的部分;步驟 3–6 是兩邊平台各自的實作動作,但因為都對照同一份 spec,兩邊的**行為**會保持一致,不會出現「React 這樣做、SwiftUI 卻那樣做」的分裂。

---

## 快速開始

```bash
# 安裝依賴(npm workspaces,一次裝好 react/ 的相依套件)
npm install

# 改動 design tokens 之後重新產生 CSS + Swift 常數
npm run tokens:build

# 型別檢查
npm run typecheck

# 啟動 Storybook
npm run storybook
```

SwiftUI 那一側(需要 Xcode):

```bash
cd swiftui
swift build --target DesignSystemKit   # 只驗證元件庫本身
```

或直接在 Xcode 開啟 `swiftui/Package.swift`,選 `ComponentGallery` scheme,在 iOS 17+ 模擬器上執行。細節見 [`swiftui/README.md`](../swiftui/README.md)。

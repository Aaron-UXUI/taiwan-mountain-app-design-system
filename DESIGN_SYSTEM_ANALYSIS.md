# 台灣山林 App Design System — 現況分析

分析範圍：整個 repository 現有程式碼(截至本文件產生時)。純分析,未修改任何檔案。

---

## 1. Design Tokens

Token 分兩處定義:`tokens/design-tokens.css`(spacing / radius / color,來自 Figma Variables 匯出)與 `src/tokens.css`(typography / elevation,來自 Figma Style Guide 頁面,並 `@import` 前者)。`tokens/design-tokens.json` 是 spacing/radius/color 的 JSON 版本,供非 CSS 環境參考,但**與 `.css` 檔的數值有落差**(見下方 Radius 小節)。

### 1.1 Color

| 群組 | Token | 值 |
|---|---|---|
| Primary | `--color-primary-green-50` | `#ECF0E4` |
| | `--color-primary-green-100` | `#D6E0C3` |
| | `--color-primary-green-700` | `#5C6647` |
| | `--color-primary-green-800` | `#464F34` |
| | `--color-primary-green-900` | `#343C25` |
| Accent | `--color-accent-yellow-50` | `#FFF19C` |
| | `--color-accent-yellow-100` | `#FFD966` |
| | `--color-accent-yellow-700` | `#695400` |
| | `--color-accent-yellow-900` | `#493700` |
| Semantic | `--color-semantic-info-600` | `#006AD1` |
| | `--color-semantic-info-700` | `#0051B8` |
| | `--color-semantic-success-600` | `#467800` |
| | `--color-semantic-success-700` | `#396100` |
| | `--color-semantic-destruct-600` | `#CF0000` |
| | `--color-semantic-destruct-700` | `#B20000` |
| Gray | `--color-gray-black` | `#1D1F1B` |
| | `--color-gray-white` | `#FDFDFC` |
| | `--color-gray-50` | `#F3F5EE` |
| | `--color-gray-100` | `#DBDED5` |
| | `--color-gray-200` | `#C5C8BE` |
| | `--color-gray-400` | `#989C91` |
| | `--color-gray-800` | `#494C44` |

**狀態**:22 個色票,分 4 組。**只有一組 Mode**(Figma 的 "Mode 1")——沒有 Dark Mode token。51/53(96%)個元件 CSS 檔有使用 color token,**0 個檔案有硬編色碼繞過 token**(全部透過 `var(--color-*)` 引用)。

### 1.2 Typography

字體家族:PingFang TC(主要)、SF Mono(僅 Stepper 的數字用)。

| Category / Level | Size | Line-height | Weight | Token |
|---|---|---|---|---|
| Heading/H1 | 40px | 56px | Regular ⚠️ | `--type-scale-headline-1` / `--line-height-h1` |
| Heading/H2 | 24px | 36px | Semibold | `--type-scale-headline-2` / `--line-height-h2` |
| Heading/H3 | 20px | 30px | Semibold | `--type-scale-headline-3` / `--line-height-h3` |
| Heading/H4 | 16px | 24px | Semibold | `--type-scale-headline-4` / `--line-height-h4` |
| Body/L | 16px | 24px | Regular | `--type-scale-body-l` / `--line-height-body-l` |
| Body/M | 14px | 20px | Regular | `--type-scale-body-m` / `--line-height-body-m` |
| Body/S | 12px | 18px | Regular | `--type-scale-body-s` / `--line-height-body-s` |
| Label/M | 14px | 20px | Semibold | `--type-scale-label-m` / `--line-height-label-m` |
| Label/S | 12px | 18px | Semibold | `--type-scale-label-s` / `--line-height-label-s` |
| Number/L | 16px | 24px | Semibold (SF Mono) | `--type-scale-number-l` / `--line-height-number` |
| Number/M | 16px | 24px | Regular (SF Mono) | `--type-scale-number-m` / `--line-height-number` |

**已知異常(刻意保留,未擅自「修正」)**:
- Heading/H1 標記 Weight=Regular、2% 字距,跟 H2–H4(皆 Semibold/0%)不一致,疑似 Figma Style Guide 本身文件錯誤。
- Number/L 與 Number/M 數值完全相同(16/24),只有粗細不同,疑似複製貼上遺漏更新。
- Label/L(16px)在 Style Guide 裡不存在,但曾經被誤用;現已核實對照 Style Guide 後,原本誤用 Label/L 的元件已改綁 Body/L(兩者數值/字重/字體剛好一致)。

45/53(85%)個元件 CSS 檔有使用 typography token。

### 1.3 Radius

| Token | 值 |
|---|---|
| `--radius-none` | 0px |
| `--radius-xxs` | 4px |
| `--radius-xs` | 8px |
| `--radius-s` | 12px |
| `--radius-m` | 16px |
| `--radius-rounded` | 9999px(pill / 全圓角) |

**⚠️ 已知資料落差**:`tokens/design-tokens.json` 的數值(`xxs:4, xs:8, s:12, m:16`)跟 `tokens/design-tokens.css` **目前**的數值一致——但 `.css` 檔案裡有註解記錄,這是本次專案期間發現並修正過的(原本 `.css` 曾經是錯位的 `xxs:4, s:8, m:12, l:16`,靠實際呼叫 Figma `get_design_context` 拿到 "Radius/s(12)" 才校正回來)。**`design-tokens.json` 本身從未更新這次修正**,如果之後有人只看 json 檔案,兩份文件目前應該是一致的,但 json 檔案的 `_meta.completeness` 註記還停留在舊版說法,建議之後同步更新兩份文件的說明文字。

39/53(74%)個元件 CSS 檔有使用 radius token。

### 1.4 Elevation

| Level | box-shadow | 用量(元件數) |
|---|---|---|
| Elevation/1 | `0 1px 2px 0 var(--color-gray-100)` | 1 |
| Elevation/2 | `0 1px 4px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.08)` | 1 |
| Elevation/3 | `0 2px 1px rgba(0,0,0,.12), 0 2px 12px rgba(0,0,0,.12)` | 6 |
| Elevation/4 | `0 6px 20px rgba(0,0,0,.12)` | 3 |
| Elevation/5 | `0 8px 32px rgba(0,0,0,.16), 0 2px 4px rgba(0,0,0,.12)` | 1 |

只有 11/53(21%)個元件 CSS 檔使用 Elevation token——這是 5 種 token 裡覆蓋率最低的一類。另外 `ios-system/Keyboard`、`ios-system/KeyboardNumbers` 兩個元件用了不屬於這 5 級的自訂陰影(`0 1px 0 rgba(0,0,0,.3)` / `.35`,按鍵立體感),彼此透明度還不一致,屬於已知但尚未處理的落差。

### 1.5 Motion

**沒有正式的 Motion token**(沒有 `--duration-*`、`--easing-*` 這類變數)。目前每個用到 transition/animation 的元件都是各自硬編數值:

| 元件 | 用途 | 數值 |
|---|---|---|
| `Button` | hover/press 顏色過渡 | `0.1s ease` |
| `SegmentedControls` | 指示器滑動 | `0.15s ease` |
| `Toggle` | 開關切換 | `0.15s ease` |
| `ListNotification` | 開關切換(內部 Toggle 樣式) | `0.15s ease` |
| `AccordionCheckBox` / `AccordionChips` / `CollapseText` | 展開箭頭旋轉 | `0.15s ease` |
| `SpinnerOnWhite` / `SpinnerOnDark` | 8 點淡出動畫 | `1s linear infinite` |
| `MotionSuccess` | 打勾繪製動畫 | `2.4s ease-in-out infinite` |
| `MotionTransaction` | 交易感應循環動畫 | `4s ease-in-out infinite` |

**觀察**:`0.15s ease` 這個值在 6 個不同元件重複出現,是一個「事實上的標準」但沒有被提升成 token——若之後要調整互動過渡速度,得改 6 個檔案。這是 Motion 類別裡最值得補上正式 token 的地方。

### 1.6 Spacing

| Token | 值 |
|---|---|
| `--spacing-0` | 0px |
| `--spacing-xs` | 4px |
| `--spacing-s` | 8px |
| `--spacing-sm` | 12px |
| `--spacing-m` | 16px |
| `--spacing-lm` | 24px |
| `--spacing-l` | 32px |
| `--spacing-xl` | 40px |
| `--spacing-2xl` | 48px |
| `--spacing-3xl` | 56px |
| `--spacing-4xl` | 64px |

43/53(81%)個元件 CSS 檔有使用 spacing token。11 個級距,是 6 類 token 裡選項最多的一組;實務上只有 `xs`~`lm` 這幾階被高頻使用,`L` 以上的大間距(32px 以上)在目前 60 個元件裡幾乎沒有被用到,屬於「定義了但沒被消費」的 token。

---

## 2. Component Library

60 個元件,分 8 類。每個元件都對應 `docs/figma-mapping.md` 裡的一個 Figma node id。Props 欄位只列出元件自訂的 props(省略繼承自原生 HTML 屬性的 `...rest`,例如 `Omit<ButtonHTMLAttributes<...>, "type">`)。

### 2.1 Clickable(15)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **Button** | 主要操作按鈕,依 type 決定強調程度,loading 時內嵌 Spinner | `type`: Primary/Secondary/Tertiary | `state`: Default/Disabled/Pressing/Loading | `size`: Large/Small | `label` |
| **CheckBox** | 單一核取方塊 + 文字標籤 | — | 原生 `checked`/`disabled` | — | `label` |
| **ChipsLarge** | 大尺寸可選標籤 | — | `selected` (bool) | — | `label` |
| **ChipsSalient** | 強調型狀態標籤(不可互動) | `type`: General/Special/Warning | — | — | `label` |
| **ChipsSmall** | 小尺寸過濾標籤 | — | `active` (bool) | — | `label` |
| **IconButton** | 圖示按鈕,依用途(定位/收藏/離線地圖)切換圖示與行為 | `for`: Location/Save/OfflineMap | `state`: Default/Pressing/Clicked/Loading/Downloaded | — | `progress`(下載百分比) |
| **Link** | 純文字超連結 | — | — | — | `label` |
| **LinkFurtherInfo** | 帶箭頭圖示的連結按鈕(白底綠框) | — | — | — | `label` |
| **LocationPin** | 地圖上的地點標記 | `type`: Default/Info | `state`: Default/Focused | — | `label` |
| **RadioButton** | 單選按鈕,Expanded 樣式會展開額外輸入框 | `radioStyle`: Default/Expanded | 原生 `checked` | — | `label`, `inputPlaceholder` |
| **SegmentedControls** | 兩段式切換器(如排序方式) | — | `selected`: Left/Right(受控) | — | `leftLabel`, `rightLabel`, `onSelectedChange` |
| **Stepper** | 數量增減器 | — | `state`: Default/Error/Disabled | — | `amount`, `errorMessage`, `onDecrement`, `onIncrement` |
| **TextField** | 文字輸入框 | — | `state`: Default/Typing/Typed/Error | `size`: S/M/L/XL | `label`, `errorMsg`, `showIcon` |
| **Toggle** | 開關切換 | — | `active` (bool) | — | — |
| **UserLocation** | 地圖上「使用者位置」標記(方向錐 + 定位點) | — | — | — | 無(純樣式元件) |

### 2.2 Icons(8)

| Name | Purpose | Variant(name 可選值) | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **Icon24** | 24px 通用圖示集 | 22 個 glyph(map/search/notify/member/heart/radio/gps 等,含 outline/filled 對) | — | 固定 24px | `name` |
| **Icon20** | 20px 圖示集 | search/microphone/check/info/credit-card/open-eye/close-eye(7) | — | 固定 20px | `name` |
| **Icon16** | 16px 圖示集 | exclamation/arrow-up-right/notified/non-notified/heart/heart-filled(6) | — | 固定 16px | `name` |
| **Icon14** | 14px 圖示集 | chevron/secured(2) | — | 固定 14px | `name` |
| **IconMap** | 地圖情境圖示集 | tree/camera/walk/info(4) | — | 固定 24px | `name` |
| **IconWeather** | 天氣圖示集 | cloud-sun/sunny/rain/lightning-rain/windy/typhoon/cloud-snow(7) | — | 固定 24px | `name` |
| **Logo** | App 標準字/簡式標誌 | — | — | `size`: Large/Small | — |
| **Logos** | 金流/登入品牌標誌佔位(非真實商標) | 12 個品牌(信用卡/mastercard/jcb/line-pay/…) | — | — | `name` |

### 2.3 Content Container(9)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **CardScene** | 景點照片卡(含收藏、狀態標籤、漸層遮罩) | — | `saved` (bool) | — | `siteName`, `location`, `distance`, `showDistance`, `showFamilyFriendlyLabel`, `statusLabel`, `imageSrc`, `onToggleSave` |
| **CardDescription** | 純文字說明卡(可選圖片) | — | `showTitle`/`showImage` (bool) | — | `title`, `supportingText`, `imageSrc` |
| **CardTickets** | 票券卡 | — | `state`: Default/Disabled | — | `scene`, `ticketType`, `additionalItem`, `due`, `price` |
| **CardNotification** | 通知卡(未讀圓點) | — | `showBadge` (bool) | — | `infoMain`, `infoContent`, `time` |
| **CardSavedItems** | 收藏合輯卡(2×2 縮圖) | — | — | — | `title`, `liked`, `photos`(最多4張) |
| **ListWeather** | 天氣預報單日欄位 | — | — | — | `date`, `temperature`, `precipitationRate`, `uv`, `sunrise`, `sunset`… 等 13 個資料欄位 |
| **ListSetting** | 設定頁列表項(可選箭頭) | — | `showChevron` (bool) | — | `text` |
| **ListDownloadMap** | 離線地圖下載列 | — | `showDownloadButton` (bool) | — | `label`, `onDownload`, `downloadButtonProps` |
| **ListNotification** | 通知開關設定列(內嵌開關) | — | 原生 `checked` | — | `label` |

### 2.4 Progressive Disclosure(6)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **AccordionCheckBox** | 可展開的複選篩選群組 | — | `expanded`/`selected` (bool) | — | `title`, `selectedCount`, `options`, `checkedOptions`, `onOptionChange` |
| **AccordionChips** | 可展開的標籤篩選群組(內部渲染 Badge) | — | `expanded`/`selected` (bool) | — | `title`, `selectedCount`, `options`, `onOptionClick` |
| **BottomSheet** | 底部彈出面板,3 種內容佈局 | `style`: Filter_Discover/Map_Info/Filter_MapSearch | — | — | 無獨立 props,內容依 `style` 切換(巢套多個其他元件,見 3.2) |
| **CollapseText** | 可展開/收合的長文字段落 | — | `expanded` (bool) | — | `text`, `onToggle` |
| **Tab** | 分頁籤 | — | `active` (bool) | `size`: Small/Medium/Large | `label`, `showBadge`, `badgeCount` |
| **Tooltip** | 深色文字提示氣泡 | — | — | — | `text` |

### 2.5 Motion(4)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **SpinnerOnDark** | 深色底用的白點載入動畫 | — | — | — | — |
| **SpinnerOnWhite** | 淺色底用的深點載入動畫 | — | — | — | — |
| **MotionSuccess** | 打勾成功動畫(CSS 描邊循環) | — | — | — | — |
| **MotionTransaction** | 交易感應循環動畫(刷卡機示意) | — | — | — | — |

以上 4 個都是**純展示型、無 props 的靜態/循環動畫元件**,狀態完全由 CSS `@keyframes` 自行驅動,不受外部控制。

### 2.6 Navigation(5)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **NavigationBar** | 底部主導覽列(4個分頁) | — | `state`: activity/map/notify/member | — | `onTabClick` |
| **SearchBar** | 搜尋框,含歷史/建議下拉選單 | — | `state`: Default/Focused/Typing | — | `placeholder`, `historyItems`, `suggestionItems`, `onFilterClick`, `onCancelClick` |
| **AppBar** | 頂部工具列 | `type`: nav/ProfileInfo | — | — | `title`, `showBack`, `name`, `avatarSrc`, `onBackClick`, `onSettingClick` |
| **BottomBar** | 底部操作區(巢套 Button/NavigationBar/CheckBoxNavigation) | `type`: Button/2 Buttons/Navigation/Place Order | — | — | `buttonLabel`, `navigationState`, `ticketTitle`, `ticketLines`, `price`… |
| **CheckBoxNavigation** | 導覽分頁按鈕(單顆,供 NavigationBar/BottomBar 重用) | — | `active` (bool) | — | `label`, `badge`: none/dot/count, `icon` |

### 2.7 iOS System(4)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **StatusBar** | 頂部系統狀態列(時間/訊號/電池) mockup | — | — | — | `time` |
| **Keyboard** | 標準 iOS 鍵盤 mockup(非真實輸入) | — | — | — | `returnKeyLabel`, `spaceKeyLabel` |
| **KeyboardNumbers** | 數字鍵盤 mockup(非真實輸入) | — | — | — | — |
| **HomeIndicator** | 底部 Home 手勢列 | — | — | — | — |

這 4 個都是**靜態系統 UI 模擬元件**,不具備真實互動功能,純視覺參考用。

### 2.8 Indicators(9)

| Name | Purpose | Variant | State | Size | 自訂 Props |
|---|---|---|---|---|---|
| **Badge** | 數字/圓點徽章 | `for`: Accordion/Notification | — | `attribute`: Small/Large/Maximum | `count` |
| **Banner** | 全寬警示條(如離線提示) | `type`: Default(目前只有一種) | — | — | `label` |
| **CarouselIndicators** | 輪播圓點指示器 | `background`: White/Dark | — | — | `dotCount`, `activeIndex` |
| **Crowdedness** | 即時人潮狀態標籤 | — | `state`: Comfortable/Partial Crowded/Crowded | — | `label` |
| **Label** | 通用狀態標籤(開放時間等) | — | `state`: Open/Partial/Close/family | — | `label` |
| **OfflineMap** | 離線地圖訊號狀態卡(可展開三大電信商細節) | — | `signalMissing`: Some/Most,`expanded` (bool) | — | `onToggle` |
| **PaymentInfo** | 付款/票券金額摘要卡 | — | `state`: Selected/Unselected | — | `title`, `ticketLines`, `total` |
| **ProgressIndicator** | 三步驟進度指示 | — | `step`: Choice/Method/Info | — | `labels`(三步驟文字) |
| **Snackbar** | 底部提示訊息條 | — | `showCloseButton` (bool) | — | `label`, `onClose` |

---

## 3. Architecture

### 3.1 Folder Structure

```
/
├── tokens/
│   ├── design-tokens.css      ← spacing / radius / color(CSS 變數,單一事實來源)
│   └── design-tokens.json     ← 同上內容的 JSON 版(⚠️ radius 說明文字未同步最新修正)
├── src/
│   ├── tokens.css              ← @import tokens/design-tokens.css,再擴充 typography / elevation
│   ├── vite-env.d.ts
│   ├── assets/
│   │   └── containers/          ← 3 個 SVG 佔位插圖(CardScene/CardDescription/CardSavedItems 用)
│   ├── foundations/             ← 非元件的文件頁(Typography、Elevation 對照表)
│   │   ├── Typography.stories.tsx
│   │   └── Elevation.stories.tsx
│   └── components/
│       ├── clickable/       (15 個元件資料夾)
│       ├── icons/           (8)
│       ├── containers/      (9)
│       ├── disclosure/      (6)
│       ├── motion/          (4,外加共用的 spinnerDots.ts)
│       ├── navigation/      (5)
│       ├── ios-system/      (4)
│       └── indicators/      (9)
├── docs/
│   ├── figma-mapping.md     ← 60 個元件 ↔ Figma node id 對照表
│   └── style-guide.md       ← Typography/Elevation 官方組合 + 使用元件清單
├── .storybook/
│   ├── main.ts               ← stories glob、GitHub Pages base path
│   └── preview.ts            ← 全域載入 src/tokens.css
└── .github/workflows/deploy-storybook.yml
```

每個元件資料夾統一結構:`ComponentName.tsx`、`ComponentName.css`(7 個純 SVG/共用樣式元件例外,見 1.3 統計)、`ComponentName.stories.tsx`、`index.ts`(re-export)。

**⚠️ 沒有頂層 barrel export**:`src/` 或 `src/components/` 底下都沒有彙總的 `index.ts`。目前只能逐一從個別元件資料夾匯入(`src/components/clickable/Button`),沒有單一入口(例如 `import { Button } from "@ds/react"`)。如果之後要把這個 design system 發布成 npm package 給實際 App 使用,這是必須補上的第一步。

### 3.2 Component Dependency

大部分元件是葉節點(不依賴其他元件),以下是實際存在巢套關係的部分:

```
Button
 └─ SpinnerOnWhite / SpinnerOnDark          (Loading 狀態)

NavigationBar
 └─ CheckBoxNavigation                       (每個分頁項目)

BottomBar
 ├─ Button                                   (單顆/主要按鈕)
 ├─ CheckBoxNavigation                       (2 Buttons 類型的次要按鈕)
 ├─ NavigationBar                            (Navigation 類型)
 │   └─ CheckBoxNavigation
 └─ HomeIndicator

CheckBoxNavigation
 └─ Badge                                    (未讀數字/圓點)

AccordionCheckBox
 ├─ CheckBox                                 (展開後的選項列表)
 └─ Badge                                    (已選數量)

AccordionChips
 └─ Badge                                    (已選數量)

Keyboard
 └─ HomeIndicator

BottomSheet                                  (巢套最多的元件,3 種 style 各自組合)
 ├─ SegmentedControls    (Filter_Discover)
 ├─ AccordionCheckBox    (Filter_Discover)
 ├─ AccordionChips ×9    (Filter_Discover)
 ├─ Button               (Filter_Discover 的「套用」/ Map_Info 的「購買票券」)
 ├─ ChipsSalient ×2      (Map_Info)
 ├─ ChipsSmall ×10       (Map_Info)
 ├─ Crowdedness          (Map_Info)
 ├─ LinkFurtherInfo      (Map_Info)
 ├─ CarouselIndicators   (Map_Info)
 ├─ CardScene ×6         (Filter_MapSearch)
 └─ HomeIndicator        (全部 3 種 style)

SpinnerOnDark / SpinnerOnWhite
 └─ spinnerDots.ts                           (共用的 8 點座標資料,非元件)
```

**觀察**:
- **60 個元件裡只有 11 個(18%)有巢套其他元件**,其餘 49 個都是獨立葉節點。這代表元件庫的「組合密度」偏低——大部分複合畫面(例如 Map_Info 裡的 3 顆按鈕群組)是在使用端(`BottomSheet.tsx`)手刻,而非拆成新的可重用元件。
- `BottomSheet` 是唯一的「頁面級」組合元件,一個檔案內巢套了 10 種不同元件,複雜度明顯高於其他元件,如果之後要繼續擴充內容,建議考慮把 3 個 style 拆成獨立子元件檔案。
- `Icon Buttons`(對應 `IconButton` 元件)在 Figma 對照表裡有列,但**沒有被任何其他元件實際引用**;`BottomSheet` 裡視覺相似的 3 顆按鈕(收藏/追蹤/下載)是另外手刻的,沒有重用 `IconButton`(原因記錄在 `BottomSheet.tsx` 註解:Figma 的 for 選項集不吻合)。

### 3.3 Token Dependency

| Token 類別 | 使用檔案數 / 53 | 佔比 |
|---|---|---|
| Color | 51 | 96% |
| Typography | 45 | 85% |
| Spacing | 43 | 81% |
| Radius | 39 | 74% |
| Elevation | 11 | 21% |

- **無硬編顏色**:全部 53 個檔案裡,0 個檔案用原始 hex 色碼繞過 color token。
- **Elevation 覆蓋率明顯偏低**:多數卡片/按鈕類元件應該都該有陰影層級,但只有 11 個檔案真的引用 `--elevation-*`;`ios-system` 類別的 2 個元件甚至用了自訂、不成體系的陰影值(見 1.4)。
- 純 SVG 圖示元件(`icons/*`,7 個)天生不依賴大部分 token(顏色透過 `currentColor`/`stroke` 直接指定,無獨立 CSS 檔),這是合理現象,非缺陷。

---

## 4. Storybook Stories 完整性評估

**檔案覆蓋率:60/60(100%)** —— 每一個元件都有對應的 `.stories.tsx`,沒有遺漏。另外還有 2 個 `src/foundations/*.stories.tsx` 做為 Typography/Elevation 的視覺化文件頁(非元件 story)。

| 檢查項目 | 結果 |
|---|---|
| 有 `.stories.tsx` 檔案 | 60 / 60(100%) |
| 有 `tags: ["autodocs"]` | 58 / 60(97%) |
| 有 `argTypes` 定義 Controls | 53 / 60(88%) |
| Story 數量中位數 | 3 個/元件 |

**缺 `autodocs` 的 2 個**:`SpinnerOnDark`、`SpinnerOnWhite`。這兩個是 Button loading 狀態內嵌用的裝飾元件,缺少 autodocs 屬於小缺口,建議補上以維持文件一致性。

**沒有 `argTypes` 的 7 個**(`UserLocation`、`HomeIndicator`、`KeyboardNumbers`、`SpinnerOnDark`、`SpinnerOnWhite`、`MotionSuccess`、`MotionTransaction`)——全部都是本來就沒有可調整 props 的純靜態/動畫元件,沒有 Controls 是合理現象,不算缺口。

**Story 內容深度不一**:
- 覆蓋較完整的例子:`Button`(2 個 story,含一個把 3×2×4 全部 24 種組合攤開展示的 `AllVariants`)、`Badge`(5 個 story,涵蓋 attribute×for 的主要組合)、`OfflineMap`(4 個 story,涵蓋 collapsed/expanded × signal 組合)。
- 覆蓋較單薄的例子:`Link`、`LinkFurtherInfo`、`Banner`、`CardSavedItems`(都只有 1 個 story,即預設狀態;雖然這些元件本身變體軸也的確很少甚至沒有,單一 story 尚稱合理,但沒有展示任何 prop 被改動後的樣子)。
- `BottomSheet` 只有 3 個 story(對應 3 種 `style`),但每種 style 內部實際巢套了 5–13 個子元件的組合狀態(例如 Map_Info 裡 Crowdedness 的 3 種狀態、CarouselIndicators 的位置等)完全沒有獨立 story 可以單獨切換——只能透過切換最外層的 `style` 三選一整包一起看,細部狀態需要另外去看被巢套元件自己的 story。

**結論**:檔案層級的覆蓋率是滿分,但「每個 story 是否窮舉所有 variant × state × size 組合」這件事,只有大約 1/4 的元件真正做到(通常是 `AllVariants` 這種一次全展開的 story);多數元件的 story 只涵蓋 2–4 個代表性狀態,並非詳盡的排列組合矩陣。對於已建立 Foundations 頁面(Typography、Elevation)的作法值得延伸——目前沒有等價的「Spacing」或「Color」總覽頁面,是文件層面可以再補的部分。

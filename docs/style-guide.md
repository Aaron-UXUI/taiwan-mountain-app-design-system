# Typography & Elevation — 完整組合清單

來源：Figma 檔案 `nXFkT45U8mDzUK5rUfL0eK` 的「🔶 Design System」頁面 → Style Guide → Typography / Elevation 兩個文件 frame（node `12948:43690` / `12948:43756`）。

這份清單跟 Storybook 的 `Foundations/Typography`、`Foundations/Elevation` 兩頁內容一致（那邊有互動式視覺對照，可以直接看每個等級套用在真實文字上的樣子）：https://aaron-uxui.github.io/taiwan-mountain-app-design-system/?path=/docs/foundations-typography--docs

Token 定義在 [`src/tokens.css`](../src/tokens.css)。

## Typography

| Category / Level | Size | Line-height | Weight | Family | Used by |
|---|---|---|---|---|---|
| Heading/H1 | 40px | 56px | Regular ⚠️ | PingFang TC | `indicators/PaymentInfo`, `navigation/BottomBar` |
| Heading/H2 | 24px | 36px | Semibold | PingFang TC | *(尚無元件使用)* |
| Heading/H3 | 20px | 30px | Semibold | PingFang TC | `containers/CardDescription`, `containers/CardScene`, `disclosure/BottomSheet`, `indicators/PaymentInfo`, `navigation/BottomBar` |
| Heading/H4 | 16px | 24px | Semibold | PingFang TC | `clickable/Button`, `clickable/LocationPin`, `disclosure/Tab` |
| Body/L | 16px | 24px | Regular | PingFang TC | `clickable/RadioButton`, `clickable/TextField`, `containers/ListDownloadMap`, `containers/ListNotification`, `containers/ListSetting`, `containers/ListWeather`, `disclosure/BottomSheet`, `disclosure/Tab`, `navigation/AppBar`, `navigation/SearchBar` |
| Body/M | 14px | 20px | Regular | PingFang TC | `clickable/Button`, `clickable/CheckBox`, `clickable/ChipsLarge`, `clickable/IconButton`, `clickable/Link`, `clickable/LinkFurtherInfo`, `clickable/RadioButton`, `clickable/SegmentedControls`, `clickable/TextField`, `containers/CardDescription`, `containers/CardNotification`, `containers/CardSavedItems`, `containers/CardTickets`, `disclosure/AccordionCheckBox`, `disclosure/AccordionChips`, `disclosure/BottomSheet`, `disclosure/CollapseText`, `disclosure/Tab`, `indicators/Crowdedness`, `indicators/OfflineMap`, `indicators/PaymentInfo`, `indicators/ProgressIndicator`, `indicators/Snackbar`, `ios-system/Keyboard`, `ios-system/KeyboardNumbers`, `ios-system/StatusBar`, `navigation/AppBar`, `navigation/BottomBar` |
| Body/S | 12px | 18px | Regular | PingFang TC | `clickable/ChipsSalient`, `clickable/ChipsSmall`, `clickable/Stepper`, `clickable/TextField`, `containers/CardNotification`, `containers/CardSavedItems`, `containers/CardScene`, `containers/CardTickets`, `containers/ListWeather`, `disclosure/Tab`, `disclosure/Tooltip`, `indicators/Badge`, `indicators/Banner`, `indicators/Label`, `indicators/PaymentInfo`, `navigation/BottomBar`, `navigation/CheckBoxNavigation`, `navigation/SearchBar` |
| Label/M | 14px | 20px | Semibold | PingFang TC | *(尚無元件使用)* |
| Label/S | 12px | 18px | Semibold | PingFang TC | *(尚無元件使用)* |
| Number/L | 16px | 24px | Semibold | SF Mono | `clickable/Stepper` |
| Number/M | 16px | 24px | Regular | SF Mono | *(尚無元件使用)* |

⚠️ **Heading/H1 的資料異常**：Style Guide 文件裡 H1 標記 Weight=Regular、字距 2%，跟其他 H2–H4（全部 Semibold、0%）不一致，很可能是 Figma 文件本身的錯誤。目前沒有任何元件套用 Headline/1 時同時吃到「Regular + 2% 字距」這組合，所以先不下判斷，等 Figma 那邊確認後再決定要不要修正 token。

## Elevation

| Level | box-shadow | Used by |
|---|---|---|
| Elevation/1 | `0 1px 2px 0 var(--color-gray-100)` | `clickable/SegmentedControls` |
| Elevation/2 | `0 1px 4px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.08)` | `navigation/BottomBar` |
| Elevation/3 | `0 2px 1px rgba(0,0,0,.12), 0 2px 12px rgba(0,0,0,.12)` | `clickable/Button`, `clickable/LinkFurtherInfo`, `clickable/UserLocation`, `disclosure/BottomSheet`, `indicators/Snackbar`, `navigation/SearchBar` |
| Elevation/4 | `0 6px 20px rgba(0,0,0,.12)` | `clickable/IconButton`, `clickable/LocationPin`, `disclosure/Tooltip` |
| Elevation/5 | `0 8px 32px rgba(0,0,0,.16), 0 2px 4px rgba(0,0,0,.12)` | `navigation/SearchBar` |

### 沒有對應到任何 Elevation 等級

| 元件 | box-shadow | 說明 |
|---|---|---|
| `ios-system/Keyboard` | `0 1px 0 rgba(0,0,0,.3)` | 按鍵底部陰影，沒有模糊半徑，不符合任何 Elevation 定義。推測是刻意模擬 iOS 系統鍵盤按鍵的立體感，不屬於本設計系統的 Elevation 範疇。 |
| `ios-system/KeyboardNumbers` | `0 1px 0 rgba(0,0,0,.35)` | 跟 Keyboard 同樣的按鍵陰影手法，但透明度不同（.35 vs .3），兩個元件彼此都不一致。 |

## 使用規則

1. 新元件的文字樣式要先對照上表，找出最接近的 Category/Level，直接引用對應的 `--type-scale-*` / `--line-height-*` token，不要照抄 Figma 個別元件產生的任意數值。
2. 陰影同理，優先用 `--elevation-1` ~ `--elevation-5`；如果數值跟任何一級都對不上，先如實記錄在這份文件的「沒有對應」表格裡，不要為了套用而竄改視覺效果。
3. 這份文件跟 Storybook 的 Foundations 頁面要保持同步——改了 `src/tokens.css` 或任何元件的 Typography/Elevation 用法，記得回來更新這裡跟 `src/foundations/*.stories.tsx`。

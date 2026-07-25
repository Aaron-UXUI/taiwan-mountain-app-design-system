# Figma ↔ Design System 一致性稽核

對照來源:Figma `nXFkT45U8mDzUK5rUfL0eK` → Component 頁面(node `12256:1743`),
透過 Figma MCP 取得**實際**的 component / component-set 結構與 variant 軸,
再與 `docs/figma-mapping.md`、`docs/component-spec/*.md`、`react/src/components/**`、
`swiftui/Sources/DesignSystemKit/Components/**` 逐項比對。

---

## 摘要

| 稽核項目 | 結果 |
|---|---|
| Figma 元件總數 | **60**(與文件記載一致) |
| `docs/figma-mapping.md` node id 對照 | ✅ 60/60 完全吻合,無遺漏、無失效 |
| Variant / State 軸完整性 | ❌ **8 項落差**(詳見下方) |
| 其中屬 Figma 檔案本身的資料問題 | 2 項 |

---

## A. figma-mapping.md ↔ Figma:完全一致 ✅

60 個 node id 全數比對通過,沒有任何一個在 Figma 存在卻沒登記,也沒有登記了但
Figma 已不存在的失效項目。分類數量也吻合:Clickable 15、Icons 8、Content
Container 9、Progressive Disclosure 6、Motion 4、Navigation 5、iOS System 4、
Indicators 9。

---

## B. 已修正的落差

### B1. `Label` 缺少 `family` 狀態(SwiftUI)

- **Figma**:`State=Open / Partial / Close / family`(4 個)
- **React**:`LabelState = "Open" | "Partial" | "Close" | "family"` ✅ 有
- **SwiftUI**:`DSOperatingStatus = open / partial / closed` ❌ **少一個**
- **Spec**:只列 3 個,第 4 個被我寫成一句含糊的
  「Additional related states in the same family follow the same pattern」

這是**跨平台不一致**:同一份 spec,React 有 4 個狀態、SwiftUI 只有 3 個。
根因是我當初寫 spec 時沒有把 `family` 明確列出來,SwiftUI 照 spec 實作就漏了。
已補上 SwiftUI 的 `.familyFriendly`,並把 spec 的狀態表補完整。

### B2. `Icon Buttons` 缺少 `Type` 軸,導致視覺錯誤(兩平台)

- **Figma**:有 **`Type=Primary` / `Type=Tertiary`** 這個軸
  - `Type=Primary`(只有 Location 用):深綠**實心圓形底**
  - `Type=Tertiary`(Save、OfflineMap 用):**沒有底色**,只有圖示本身
- **Spec / React / SwiftUI**:完全沒有這個軸

後果是 SwiftUI 把**所有** purpose 都畫成實心綠圓——在模擬器上可以看到收藏
(愛心)和離線地圖(下載)都套了不該有的綠色圓底。已依 Figma 補上 Type 軸,
Location 維持實心圓,Save / OfflineMap 改為無底色。

---

## C. 後續處理結果

以下項目在稽核後依設計端指示處理完畢(2026-07-25):

| 項目 | 處置 |
|---|---|
| C1 `Stepper` `State=0` | React 補上 `"0"` 狀態(減號停用);SwiftUI 用原生 range 下界即可,不另設具名狀態 |
| C2 `Search Bar` `Typed` | **忽略**,不實作 |
| C3 `Icon Buttons` `Type` / `Enabled` / `Loading...` | Type 與 State 全部補齊;`Loading` 與 `Loading...` 只實作 `Loading`;並修正**深綠底必須搭配白色圖示** |
| C4 `App Bar` `Color=black` | **忽略** |
| C5 `Buttons` 矩陣不完整 | 依 Figma 為準,未定義的組合不實作,已在 spec/JSDoc/story 標明實際 19 種 |
| C6 `Badge` 組合 | 維持現狀(實作較寬鬆,不影響正確性) |
| D1 `OfflineMap` variant 命名 | **設計端已修正**,且新增 `Signal Missing=None`;已同步 React / SwiftUI / Storybook / spec |
| D2 `List / weather` `state=other` | **設計端已改名**為 `Property 1=Default`;React 本來就沒有這個 prop,無需變更 |

---

## C-原始. 稽核當下尚未處理的落差

### C1. `Stepper` 缺少 `State=0`

Figma 有 4 個狀態:`State=0 / Default / Error / Disabled`。
`State=0` 是「數量為 0,減號變灰不可按」的狀態(截圖確認)。

- **Spec**:只列 Default / Error / Disabled
- **React**:type 只有 3 個 — 但它自己的 JSDoc 寫的是
  `State=0/Default/Error/Disabled`,**註解和型別互相矛盾**
- **SwiftUI**:用原生 `Stepper(value:in:)` 的 range 下界,行為上 0 的時候減號
  確實會自動停用 → **行為正確,但沒被當成一個具名狀態**

建議:spec 補上這個狀態,React 補進型別。SwiftUI 已符合行為,只需文件說明。

### C2. `Search Bar` 缺少 `Typed`

Figma 有 4 個:`Default / Focused / Typing / Typed`。Spec 與 React 都只有前 3 個。
(SwiftUI 用 `.searchable` + `@FocusState` 推導,`Typed` 隱含成立但未具名。)

### C3. `Icon Buttons` 還有兩個未涵蓋的狀態

除了 B2 的 Type 軸,Figma 還有 spec 沒有的:
- `State=Enabled`(Location 專用,定位啟用中的樣子)
- `State=Loading...`(OfflineMap 專用,與 `State=Loading` 並存)

`Loading` 與 `Loading...` 在截圖上都顯示「0%」,看不出差異,推測是
determinate / indeterminate 之分,但**無法從檔案本身確認**——需要你確認原意,
我不想用猜的寫進 spec。

### C4. `App Bar` 有未記載的 `Color` 軸

Figma 是 `Type=nav|ProfileInfo, Color=black`。`Color` 目前只有 `black` 一個值,
所以實務上沒差別,但 spec 沒有提到這個軸的存在。若之後要加深色底的 AppBar,
這個軸就會變成真的分歧點。

### C5. `Buttons` 的變體矩陣在 Figma 本身就不完整

Spec 寫「Type 3 × Size 2 × State 4」會讓人以為有 24 種組合,但 Figma 實際只有 19 種:

| Size | 實際存在的組合 |
|---|---|
| Large | Primary / Secondary / Tertiary × Default / Disabled / Pressing / Loading = 12 ✅ 完整 |
| Small | Primary × 3(**無 Loading**)、Secondary × 3(**無 Loading**)、Tertiary × **只有 Default** = 7 |

也就是:**Small 尺寸完全沒有 Loading 狀態,Tertiary/Small 只有 Default**。
目前兩個實作都允許任意組合,等於可以做出 Figma 裡不存在的樣式。

### C6. `Badge` 的組合在 Figma 也不是完整交叉

Figma 只定義 4 種:`Small/Accordion`、`Small/Notification`、`Large/Notification`、
`Maximum/Notification`——**沒有 `Large/Accordion` 和 `Maximum/Accordion`**。
Spec 把兩個軸寫成可自由組合,SwiftUI 的 `DSBadge` 也允許全部 6 種。

---

## D. Figma 檔案本身的資料問題

這兩項不是程式的問題,是 Figma 端需要修:

### D1. `OfflineMap` 有一個命名錯誤的 variant

```
Signal Missing=Some,           Expanded?=No
Signal Missing=Signal Missing3, Expanded?=Yes   ← 值被命名成 "Signal Missing3"
Signal Missing=Most,           Expanded?=No
```

中間那個的值叫 `Signal Missing3`,看起來是 Figma 自動產生的預設名稱沒改到。
從結構推測它應該是 `Some` 或 `Most` 其中之一的展開態。**建議在 Figma 改名**,
否則任何自動化對照都會把它當成第三種訊號狀態。

### D2. `List / weather` 的 variant 值叫 `state=other`

單一 variant、值為 `other`,語意不明。目前實作把它當成唯一樣式處理,沒有問題,
但這個命名對後續維護沒有幫助。

---

## F. 第二輪:SwiftUI 逐元件視覺稽核(2026-07-25)

第一輪只比對 variant/state **名稱**。這一輪改為從 Figma 匯出各分區 SVG,抽出
**實際 fill/stroke 色值**,對照每個 SwiftUI 元件真正引用的 token,再用 Figma
截圖確認。共找到 4 項真實視覺落差,全部已修正:

### F1. `Button` — 停用與按下狀態幾乎全錯(影響最大)

從 Figma 抽出的實際矩陣:

| Type | State | 底色 | 外框 | 文字 | 陰影 |
|---|---|---|---|---|---|
| Primary | Default | green-800 | — | white | elevation-3 |
| Primary | Pressing | green-900 | — | white | elevation-3 |
| Primary | **Disabled** | **green-50** | — | **gray-400** | **無** |
| Secondary | Default | **white** | **green-800** | green-800 | elevation-3 |
| Secondary | Pressing | **green-50** | **green-900** | **green-900** | elevation-3 |
| Secondary | **Disabled** | **white** | **green-100** | **green-100** | **無** |
| Tertiary | Default | 透明 | — | green-800 | 無 |
| Tertiary | Pressing | **green-50** | — | **green-900** | 無 |
| Tertiary | **Disabled** | 透明 | — | **green-100** | 無 |

原本的 SwiftUI:停用一律填 `gray-400`、Secondary 用 `green-50` 實心底**且完全
沒有外框**、按下時文字不變色、Tertiary 停用也被填灰。全部改正。

順帶修正尺寸:Large 應為 44pt 高、padding 12/16;Small 36pt、padding 8/12
(原本用 16/24 與 8/16)。另外原本把「滿版寬度」綁在 `emphasis == .primary`,
但 Figma 是**依 Size** 決定(Large 滿版、Small 包住文字),已改正。

> 這一項也發現 **React 端的 Tertiary Pressing 是錯的**——Figma 有 green-50 底色,
> React CSS 只改了文字顏色。已在 SwiftUI 註記,React 待修。

### F2. `Progress Indicator` — 多畫了 Figma 沒有的圓點

Figma 只有「文字 + 連接線」,沒有任何狀態圓點。原本 SwiftUI 每一步都畫了
8pt 圓點。已移除;現行步驟改為 green-900 semibold,其餘 gray-800。

### F3. `Payment Info` — 兩個狀態的差別是**內容**,不是外框

Figma 的 `Selected` 會顯示景點標題 + 明細,`Unselected` 只顯示總價。原本
SwiftUI 兩種狀態都顯示全部內容,只用一條 green-800 外框區分——那條外框在
Figma 裡根本不存在。已改為依狀態顯示不同內容。

### F4. `Tab` — 未選取的分頁也有底線

Figma 每個分頁都有底線:未選取是淺色細線,選取是較粗的 green-900。原本只畫
選取狀態,而且用了 green-800。已補上未選取的細線並改為 green-900。

### 附帶發現(非落差)

- Figma SVG 匯出的紅色是 `#B30000`,而 token 是 `#B20000`。這是
  display-p3 → sRGB 轉換的 **1/255 捨入差**(肉眼不可分辨),且 token 來自你
  官方的 variable 匯出,因此維持不動。

---

## G. 第三輪:版面結構稽核(2026-07-25)

前兩輪都只查**顏色 token**,沒有比對版面結構,所以漏掉了下面這些——這也是
實際畫面看起來仍與原稿差距明顯的主因。這輪改為逐元件把 Figma 原稿截圖與
模擬器實際畫面並排比較。

| # | 元件 | 落差 | 處置 |
|---|---|---|---|
| G1 | `Cards / Scene` | 底部說明列在 Figma 是**整條齊邊貼底**(只有卡片本身的圓角),原本做成內縮、自帶圓角的小卡,還多加了一層漸層遮罩;標題級距也過大 | 改為齊邊、移除漸層、標題改 headline-4 |
| G2 | `Cards / Description` | Figma 順序是**標題 → 內文 → 圖片**,原本把圖片放在最上面 | 改回正確順序 |
| G3 | `Cards / Tickets` | 缺少 Figma 左緣的**綠色票根色條**;內容順序整個相反(Figma 是 使用期限 → 分隔線 → 景點 → 票種 → 金額);停用態缺少「已使用」標記 | 全部補上並重排 |
| G4 | `Cards / Saved Items` | Figma 是「標題 + **N 個收藏**」,原本做成標題 + 一顆愛心(設計裡沒有這顆愛心) | 改為收藏數量 |
| G5 | `Text Field` | 輸入中的外框在 Figma 是**近黑色**,原本用品牌綠——這個元件在設計裡根本沒用到綠色 | 改為 black |
| G6 | `Radio button` | Figma 畫的是**真正的圓形 radio**(左側圓圈 + 選中填綠點 + 每列分隔線),原本用 `Picker(.inline)`,iOS 會渲染成「右側打勾清單」——是 HIG 慣例,但明顯不是設計稿的控制項 | 改為依照設計繪製,並保留 radio 的無障礙語意 |

---

## H. 第四輪:細節稽核(圓角 / 線寬 / 間距 / 字重 / 陰影)

這輪改用 `get_design_context` 取得 Figma 的**精確 CSS**(padding、radius、
border-width、font-weight、shadow),而不是從截圖推測。

| # | 元件 | 落差 | 處置 |
|---|---|---|---|
| H1 | `Chips` | **外框與填色形狀不一致**——外框畫成 `Capsule`,底色卻裁成 8pt 圓角矩形,等於框線沒有貼合它要框的形狀 | 統一成同一個 8pt 圓角矩形 |
| H2 | `Chips` | 選取時外框應為 **green-100**,原本用 green-900 | 改正 |
| H3 | `Chips` | 選取時文字應轉 **Semibold**,原本不變 | 改正 |
| H4 | `Chips / Salient` | Figma 是**固定 32pt 高 + 只有左右 padding**,原本四邊都給 16;字重應為 Semibold(Label/S) | 改正 |
| H5 | `CheckBox` | 用 SF Symbol `checkmark.square.fill` 代替設計稿的控制項。Figma 是 **20pt 方框、4pt 圓角**,未選時 1pt gray-800 外框,選取時填 green-800 + 白色勾 | 依設計重繪 |
| H6 | `CheckBox` | 選取時**標籤文字要轉 green-800**,原本恆為 gray-800;整列缺少 16pt padding 與 8pt gap | 改正 |
| H7 | `Tooltip` | Figma 掛了 **Elevation/4** 陰影,實作完全沒有陰影 | 補上 |
| H8 | `Accordion`(兩個) | 標題列 Figma 固定 **48pt 高**;展開箭頭用系統 accent 色而非設計的墨色 | 補上高度並改用品牌墨色 |

### 一個值得記錄的來源陷阱

Figma 的字級變數命名會誤導:Chips 與 CheckBox 的標籤引用的是
`type-scale/body/L`,但它的**實際值是 14/20**,也就是我們的 `body-m` token
(`body-l` 是 16/24)。原本的對應是對的,這輪等於再次向來源確認。

### 尚未逐項比對的元件

以下仍**只做過顏色比對、尚未做細節比對**:`BottomSheet`、`Collapse / Text`、
`List / weather`、`List / Setting`、`List / DownloadMap`、`Segmented Controls`、
`Toggle`、`Stepper`、`Location Pin`、`Navigation Bar`、`Search Bar`、`App Bar`、
`Bottom Bar`、`Banner`、`Snackbar`、`Carousel Indicators`、`Crowdedness`。

---

## E. 補充說明:刻意的偏離(非落差)

以下項目與 Figma 不同,但都是有記錄的平台決策,不列為落差:

- **6 個圖示元件 → 1 個 `DSIcon`**:SwiftUI 端合併成單一 enum,但**圖檔本身
  是從 Figma 直接抽出的真實向量**(見 `swiftui/Tools/`),不是 SF Symbol 替代。
- **4 個 iOS System 元件未移植**:StatusBar / Keyboard / KeyboardNumbers /
  HomeIndicator 在真機上由 OS 繪製。
- **`CheckBox/Navigation` 已從 SwiftUI 移除**:`TabView` 只讀取 `.tabItem` 的
  image + text,自訂樣式會被丟棄。React 端保留(其 `NavigationBar` 有用到)。
- **多個元件改用原生控制項**:見 `swiftui/README.md` 的對照表。

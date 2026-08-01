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
> React CSS 只改了文字顏色。已在 SwiftUI 註記,React 待修。**（已於第七輪 K4a 補上，見下方。）**

### F2. `Progress Indicator` — 多畫了 Figma 沒有的圓點

Figma 只有「文字 + 連接線」,沒有任何狀態圓點。原本 SwiftUI 每一步都畫了
8pt 圓點。已移除;現行步驟改為 green-900 semibold,其餘 gray-800。

### F3. `Payment Info` — 兩個狀態的差別是**內容**,不是外框

Figma 的 `Selected` 會顯示景點標題 + 明細,`Unselected` 只顯示總價。原本
SwiftUI 兩種狀態都顯示全部內容,只用一條 green-800 外框區分——那條外框在
Figma 裡根本不存在。已改為依狀態顯示不同內容。

### F4. `Tab` — 未選取的分頁也有底線

Figma 每個分頁都有底線:未選取是淺色細線,選取是較粗的。原本只畫選取狀態。
已補上未選取的細線。

> **更正(第五輪 I6h)**:這裡當時把作用中底線寫成 green-900,實際上底線是
> **green-800**、文字才是 green-900。已改正。

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
| G6 | `Radio button` | Figma 畫的是**真正的圓形 radio**(左側圓圈 + 每列分隔線),原本用 `Picker(.inline)`,iOS 會渲染成「右側打勾清單」——是 HIG 慣例,但明顯不是設計稿的控制項 | 改為依照設計繪製,並保留 radio 的無障礙語意。**更正(第六/七輪 J2、K3)**:當時是「手繪」圓圈、且把選中的圓點寫成綠色——實際上 Figma 用的是匯出的 `icon / 24px` 向量,環與圓點**都是 gray-black**,不是品牌綠 |

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

### H 續:第二批細節修正

| # | 元件 | 落差 | 處置 |
|---|---|---|---|
| H9 | `Crowdedness` | **本輪差最多的一個**。Figma 是「說明文字 + **實心**色票」(白字、色底、8pt 圓角、12/4 padding);實作卻是白底 + 彩色外框 + 灰字,而且完全沒有前面的說明文字 | 依設計重建 |
| H10 | `Snackbar` | padding 應為 **左 16 / 上下 10**(關閉鈕自帶 12),原本四邊 16/8;關閉圖示用 SF Symbol 而非品牌 24pt close | 改正 |
| H11 | `List / Setting` | Figma 是白底 + **左右 24 / 上下 12** padding,原本完全沒有 padding(靠外層 List);箭頭用灰色 SF Symbol 而非品牌 14pt chevron | 改正 |
| H12 | `Collapse / Text` | 展開鈕在 Figma 是**整列滿版置中**、文案為「閱讀全文」、上下 8pt padding,並與內文**零間距**,容器左右 24pt;原本是靠左的小連結、文案「顯示更多」、有間距、無內縮 | 改正 |
| H13 | `Location Pin` | **結構完全不同**。Figma 是「地點名稱在**上**(green-800 Semibold Headline/4 + Elevation/4 文字陰影)+ 下方 **24pt 圓形圖釘**(實心色底、**2pt 白色外環**、Elevation/4、內含 Map 圖示)」;原本畫成一顆裝著數字的膠囊 | 依設計重建 |

`Banner` 已比對,**完全正確**(gray-800 底、左右 24 / 上下 4、白字 body/S 12/18、置中),未改動。

### 仍未做細節比對的元件

以下**只做過顏色比對**,尚未逐項核對圓角/間距/字重/陰影(**已於第五、六輪全部補完**):

`BottomSheet`、`List / weather`、`List / DownloadMap`、`Carousel Indicators`、
`Segmented Controls`、`Toggle`、`Stepper`、`Navigation Bar`、`Search Bar`、
`App Bar`、`Bottom Bar`

其中 `Segmented Controls`、`Toggle`、`Stepper`、`Navigation Bar`、`Search Bar`、
`App Bar` 六個是**刻意改用原生控制項**(見 `swiftui/README.md` 對照表),外觀由
系統繪製,本來就不會與 Figma 逐像素相同——這是已記錄的平台決策,不是落差。

---

## I. 第五輪:把「尚未逐項比對」的元件全部補完(2026-07-26)

前四輪把力氣花在已經看過的元件上,而 H 章結尾自己列出的那批
「**只做過顏色比對**」的元件一直沒回頭處理——實際畫面與原稿差距明顯,主因就在
這裡。這一輪針對那份清單逐一 `get_design_context` 取 Figma 精確 CSS,並且**重新
複查**了幾個前幾輪宣稱已修好的元件,結果發現其中一項當初改錯了方向(I1)。

### I1. `Cards / Scene` — 第三輪(G1)把它改成了錯的樣子 ⚠️

G1 當時的結論是「底部說明列在 Figma 是整條齊邊貼底」,並據此移除了圓角與內縮。
**這個結論是錯的。** 重新取 Figma 的實際 CSS:

```
Content: absolute; left:8 right:8 bottom:8;
         background: rgba(0,0,0,0.5); backdrop-blur: 6px;
         border-radius: 12px;
```

也就是說它**本來就是一塊四邊內縮 8pt、自帶 12pt 圓角的半透明浮動面板**,只是沒有
漸層而已。G1 只對了「沒有漸層」那半句,卻把內縮與圓角一起拿掉了。已改回。

同時修正:標題是 **Headline/3(20pt)** 而不是 G1 改成的 Headline/4(16pt);
收藏鈕是 48pt 觸控區(12pt padding);卡片本身白底、16pt 圓角。

### I2. `List / weather` — 根本不是一列,是一整欄

Figma `Property 1=Default`(node 877:8425)是 **96pt 寬、568pt 高的垂直天氣欄**:
天氣圖示 → 日期 + 星期 → 溫度 → 體感溫度 → 降雨機率 → 紫外線指數 + 等級 →
日出 → 日落 → 相對濕度 → 風速 → 風向,共 11 組資料,設計上是橫向並排成一週預報。

原本的 `DSWeatherRow` 是「日期 · 圖示 · 溫度」的**水平三欄列**,只有 3 個欄位。
已重建為 `DSWeatherColumn`,補齊全部欄位與 12pt/4pt 內距、8pt 圓角白底。

### I3. `OfflineMap` — 沒有卡片,是逐電信商的列

Figma 是「[電信商標誌 20×14] [電信商名稱 126pt] [狀態色票]」的列堆疊,收合時只顯示
第一列(帶 14pt chevron),展開時才出現其餘電信商;每一列**各自**有自己的訊號狀態
與顏色。原本做成白底、8pt padding、圓角的卡片,標題是一個總結色票,展開後用
SF Symbol 打勾/驚嘆號加「有訊號/無訊號」——卡片、總結色票、那種列格式在設計裡
都不存在。已依 Figma 重建,`DSCarrierCoverage` 也從 `hasSignal: Bool` 改為帶
各自的 `DSSignalCoverage`。

### I4. `Bottom Bar` 的 `Type=2 Buttons` 不是兩顆按鈕

Figma 這個 variant 是「**主要按鈕 + 一個 64pt 的分頁式捷徑**(24pt 圖示 + 12pt
Semibold 說明,例如「地圖」)」,不是次要按鈕 + 主要按鈕。已改為
`.buttonWithShortcut(...)`。順帶修正容器:白底 + Elevation/2 陰影 + **只有上方**
8pt 內距(下緣是 home indicator,safe area 已經處理),原本是 `.bar` 材質、上下
對稱 8pt、且完全沒有陰影。

### I5. `Bottom Sheet / Map_Info` — 順序整個不同,還缺了一整排操作鈕

Figma 順序:標題 → 醒目標籤列(今日開放/親子友善)→ 標籤 chips → 人潮狀況 →
更多資訊 → **收藏 / 追蹤園區動態 / 下載離線地圖 三顆按鈕** → 照片(含輪播指示點)
→ 購買票券。

原本:照片放最上面、標題旁邊掛一顆愛心圖示、沒有那三顆操作鈕、照片上沒有輪播
指示點。已依 Figma 重排並補齊。

### I6. 其餘逐項修正

| # | 元件 | 落差 | 處置 |
|---|---|---|---|
| I6a | `Carousel Indicators` | 點是 **4pt**、間距 **8pt**、外層有 4pt padding + 8pt 圓角;淺色背景版本外層還有一塊**白色 60% 底板**。原本是 6pt 點、4pt 間距、完全沒有底板 | 全部改正 |
| I6b | `Cards / Notification` | 白底 + **1pt gray-200 外框** + 12pt 圓角;時間在**標題那一列的右端**(gray-800),不是另起一行的 gray-400;未讀是 **6pt** 圓點壓在左緣外框上,不是排在內容流裡的 8pt 圓點 | 全部改正 |
| I6c | `Cards / Tickets` | 外框是 **green-700**(停用 gray-400)不是 gray-200;圓角**左 4 / 右 16** 不是四角 12;票根色條 **6pt** 且上下內縮,不是 8pt 滿高;景點名稱是 **green-800**;票種是黑色且行距 0;金額是 body/S gray-800 | 全部改正 |
| I6d | `Cards / Saved Items` | 四張 **70pt** 圖、**4pt** 間隙、每張只有**外側那一角**是 12pt 圓角;標題與數量之間**沒有間距** | 全部改正 |
| I6e | `Cards / Description` | 卡片內距 12pt、標題與內文間距 4pt、圖片固定 **240×180 / 12pt 圓角**。原本內距 8、間距 12、圖片滿版 160 高 8pt 圓角 | 全部改正 |
| I6f | `Payment Info` | 金額是**兩種字級基線對齊**:`NT$` 是 Headline/3 Semibold、數字是 Headline/1 Regular。原本整串塞在一個 Headline/1 裡。內距應為左右 24 / 上 12 / 下 16 | 全部改正 |
| I6g | `Progress Indicator` | 步驟文案在 Figma 是 **選擇票券 / 付款方式 / 付款資訊**,原本寫成「方案 / 付款方式 / 資訊確認」;每步固定 64pt 寬、連接線撐滿剩餘空間;容器缺少上下 12pt 內距 | 全部改正 |
| I6h | `Tab` | 作用中底線是 **green-800** 不是 green-900;每個分頁固定 **44pt 高**;Small 的字級與 Medium 同為 **14pt**(原本 12pt);分頁之間**沒有間距**(底線要連成一條) | 全部改正 |
| I6i | `Badge` | 計數徽章固定 **18pt** 高/最小寬,單一數字要是圓形;原本用上下 2pt padding,呈扁膠囊 | 改正 |
| I6j | `Label` | 在 Figma 是 **95% 不透明 + 背景模糊**(它壓在照片上);原本全不透明 | 加上 opacity |
| I6k | `Link` / `Link / Further Info` | 兩者文字都是 **Label/M(14pt Semibold)**,原本是 body/M(14pt Regular) | 改正 |
| I6l | `Chips / Small` | Figma 是**固定 32pt 高、只有左右內距**;原本沿用 Large 的上下 8pt,高度偏矮 | 改正 |
| I6m | `List / DownloadMap` / `List / Notification` | 分別缺少上下 **4pt** / **8pt** 內距 | 補上 |
| I6n | `User Location` | Figma 是「方向扇形 + **20pt** info-700 圓點 + **3pt 白色外環** + Elevation/3」;原本是 SF Symbol 箭頭套在半透明光暈裡 | 依設計重繪 |

### 驗證方式

`swift build`(DesignSystemKit / GalleryKit / ComponentGallery 全部通過),並在
iPhone 17 Pro 模擬器實機截圖逐區比對:Cards、Indicators、TabBar / PageIndicator /
UserLocation、WeatherColumn 四組畫面都已對照 Figma 截圖確認。

過程中另外抓到一個**只有跑起來才看得到**的問題:`DSOfflineMapCard` 在只有一家
電信商時把整列包在 `disabled` 的 `Button` 裡,SwiftUI 會把整列變淡——Figma 的單列
variant 是全彩的。已改為只有真的可展開時才包 `Button`。

### 這一輪之後仍待處理(不在本次範圍)——**已於第七、八輪處理完畢**

- **`docs/component-spec/` 有四份規格已與 Figma 不符**:`list-weather.md`(寫成
  水平列)、`bottom-bar.md`(把 `2 Buttons` 寫成兩顆按鈕)、`offline-map.md`
  (寫成卡片)、`progress-indicator.md`(步驟文案)。這次只改了 SwiftUI,規格文件
  與 **React 端要跟著同步**,否則兩個平台會再次分歧。
- `Segmented Controls`、`Toggle`、`Stepper`、`Navigation Bar`、`Search Bar`、
  `App Bar` 維持原生控制項(見 E 章與 `swiftui/README.md`)。其中 **Toggle 的
  Off 狀態**在 Figma 是 green-100 底 + 2pt green-800 外框 + green-800 滑鈕,和
  iOS 原生的灰底白鈕差距不小——這是已記錄的平台取捨,但值得設計端知道。

---

## J. 第六輪:表單控制項與 Accordion(2026-07-26)

第五輪把「結構做錯」的元件處理完之後,剩下唯一沒有用**精確 CSS**(而不是截圖
目測)核對過的,就是 G 章當年只改了單一顏色的表單控制項。這輪補完。

### J1. `Text Field` — S/M/L/XL 是**寬度**,不是字級 ⚠️

這是最容易誤讀的一項。Figma 的四個尺寸是 **88 / 120 / 180 / 327 的固定寬度**,
四者的輸入文字**一律是 Label/L(16pt)**。原本的 `DSTextFieldSize` 把這個軸
對應成三種字級(bodyS 12 / bodyM 14 / bodyL 16),等於把小尺寸欄位的文字縮成
12pt——設計裡沒有這回事。已改為對應寬度。

同一個元件另外四項:

| 項目 | Figma | 原本 |
|---|---|---|
| 欄位標籤 | body/M **14pt、黑色** | 12pt、gray-800 |
| 輸入框 | 固定 **40pt 高**、左右 8pt、上下 0 | 上下 8 / 左右 4,高度隨內容 |
| 外框 | **一律 gray-800**,只有粗細變化(Default/Typed 1pt → Typing 2pt);Error 是 **2pt** destruct-600 | gray-400 → 聚焦時跳成純黑;Error 只有聚焦時才 2pt |
| 錯誤訊息 | 前面有 **16pt exclamation 圖示** | 只有文字 |

### J2. `Radio button` — 設計稿用的是**匯出的向量圖示**,不是手繪的圈

Figma 每一列的控制項是 `icon / 24px, Type=Radio` 這個元件——而這個圖示**本來就
在我們的 icon set 裡**(`ds-24-radio` / `ds-24-radio-fill`)。第三輪(G6)改成
手繪兩個 `Circle`,線寬 1.5pt、未選用 gray-400,都是猜的。已改為直接用匯出資產。

其餘:列高固定 **48pt**、圖示與標籤間距 **8pt**(原本 12)、右側 4pt 內距、
每列下緣 1pt gray-200 分隔線;`expanded` 變體的輸入框應該是「24pt 空白縮排 +
180pt 寬、40pt 高、4pt 圓角、1pt gray-400」的輸入框,原本用系統的
`.roundedBorder`。

### J3. `Accordion`(兩個)— 展開箭頭應該是品牌的 14pt chevron

原本靠 `DisclosureGroup` 的系統箭頭,H8 當時只是把它 `.tint` 成墨色——但形狀、
大小、位置仍然是系統的 SF Symbol,而且 `DisclosureGroup` 還會自己加一層列內距。
已改為自訂 `DisclosureGroupStyle`,用 `DSIconView(.chevron)` 畫 14pt 箭頭、
標題列固定 48pt。

同時修正:`Accordion / CheckBox` 展開後的核取列在 Figma 是**緊貼標題列**堆疊
(每列自帶 16pt 內距),原本多加了 4pt 的 `padding(.top)`。

### 驗證方式

`swift build` 通過,並在 iPhone 17 Pro 模擬器截圖比對 Inputs(CheckBox /
Radio Default / Radio Expanded)、Text Field 四種狀態、Dialogs(兩個 Accordion)
三組畫面。

### 本輪確認**沒有**落差的元件

`CheckBox`(H5/H6 的 20pt 方框 / 4pt 圓角 / gray-800 外框 / green-800 填色 /
16pt 內距 / 8pt 間距 / 標籤 body/M gray-800 全部正確)、`Snackbar`、`Banner`。

---

## K. 第七輪:改以 Figma 為唯一依據,兩個平台一起對(2026-07-26)

前六輪只查 SwiftUI,而且部分結論是照 `docs/component-spec/` 的描述去對的。這輪
改變作法:**以 Figma 檔案本身為唯一依據**,React 與 SwiftUI 兩邊同時比對。
`README.md` 與 `docs/workflow.md` 已更新,明訂視覺數值一律以 Figma 為準,
spec 降為記錄 behavior / a11y 決策的文件。

### 先講結論:落後的是 SwiftUI,不是 React

把 React 的 CSS 逐一攤開對照 Figma 之後,發現 React 在絕大多數元件上**本來就是
對的**——Cards/Scene 的浮動說明面板、Cards/Tickets 的 6pt 票根與非對稱圓角、
Cards/SavedItems 的 70pt 拼貼、List/weather 的垂直天氣欄、Text Field 的
寬度軸與 40pt 高、Accordion 的 14pt chevron,React 全部都做對了。
前兩輪(I、J)其實是把 SwiftUI 補到 React 早就達到的水準。

這也反過來說明一件事:**兩個平台實作分歧的地方,就是至少有一邊錯了的地方**。
這輪就是用這個方法找出剩下的落差。

### K1. `Cards / Scene` 的漸層遮罩 — ❌ **這一項當時判斷錯誤,已於第十輪推翻**

> **這段結論是錯的,保留原文供追溯。實際上漸層遮罩存在。**
> 見下方 N1。

當時的(錯誤)結論:React 有一層
`linear-gradient(180deg, transparent 66.83%, black 100%)` 的 scrim,而重新取
Figma 的 Picture frame,裡面只有照片、浮動說明面板、狀態標籤三個子節點,
沒有漸層,所以把它從 React 移除了。

錯在**只看了空的元件本體**(374:3819)。那個節點沒有掛照片,漸層是照片節點
**fill stack 的一層**,沒有 fill 就不會出現在產生的 CSS 裡。

### K2. 兩邊對不上、用取色決勝負的三處

| # | 元件 | React | SwiftUI | Figma(取色/量測) | 處置 |
|---|---|---|---|---|---|
| K2a | `Progress Indicator` 連接線 | gray-200 實線 | gray-800 | 取樣得 `#8D8E89`,解 α 得 **gray-800 @ 62% 覆蓋**,即 0.6px 髮絲線(gray-200 解出 α=2.0,不可能) | **React 錯**,改為 0.6px gray-800 |
| K2b | `Cards / Notification` 未讀點 | destruct-600,left 6 / top 16 | destruct-700,offset(-3, 13) | Badge 色票取樣得 **`#B20000` = destruct-700**;30×18 徽章槽釘在 left:-1 / top:7,圓點置中 → **left 11 / top 13** | **兩邊都錯**,一起改正 |
| K2c | `Cards / Tickets` 分隔線 | green-700 | 系統 `Divider()` 灰 | 取樣 y=41 得 `#5C6647` = **green-700** | **SwiftUI 錯**,改為 green-700 |

### K3. `Radio button` 的圖示尺寸與顏色

第六輪(J2)已把 SwiftUI 改用匯出的向量資產,但沒有核對 React。實際取樣
Figma 的 `Type=Radio, Filled?=yes`(node 816:4626):

```
y=12 掃描:  ..#+..############..+#..
外環 1.5pt,外徑 20pt;內圓 12pt;顏色 #1D1F1B = gray-black
```

React 的 `Icon24` 畫的是 r=8(外徑 16)+ 內圓 r=4(8pt),顏色 gray-800——
**尺寸和顏色都不對**,已改為 r=9.25 / r=6 / gray-black。SwiftUI 那邊圖示雖然
是真資產,但沒有指定顏色,會繼承系統 label 色(深色模式還會翻白),已明確
pin 成 gray-black。

React 的 `RadioButton` 另外還在用 CSS 手繪的圓圈,已改為引用共用的 `Icon24`;
圖示與標籤間距 12 → **8**。

### K4. React 其餘兩處

| # | 元件 | 落差 | 處置 |
|---|---|---|---|
| K4a | `Button` Tertiary Pressing | **第四輪(F1)就記錄過「React 待修」,一直沒修**:Figma 有 green-50 底色,React 只改了文字顏色 | 補上底色 |
| K4b | `Snackbar` | 內距應為**左 16 / 上下 10 / 右 0**(關閉鈕自帶 12pt),React 用了對稱的 16/12,還多一個 8pt gap | 改正 |

### 驗證方式

`swift build` 與 `npm run typecheck` 皆通過。React 端在 Storybook 逐一截圖比對
(Cards/Scene、Radio、Progress Indicator、Snackbar),與 Figma 節點的算圖一致;
主控台除了一個既有的 story 警告(story 傳了 `checked` 但沒給 `onChange`,與本次
改動無關)之外沒有錯誤。

### 仍待處理

- `docs/component-spec/` 有多份規格的**視覺描述**與 Figma 不符
  (`list-weather`、`bottom-bar`、`offline-map`、`progress-indicator`、
  `text-field`、`radio-button`)。依照新的原則,這些文件不該再描述視覺數值——
  應該改寫成只記錄 behavior / a11y,或直接引用 Figma 節點 id。
- React `RadioButton` 的 `checked` 沒有搭配 `onChange`(既有問題,非本輪造成)。

---

## L. 第八輪:把歷輪「已記錄但沒修」的項目清乾淨(2026-07-26)

這輪不找新落差,只把前面七輪**寫進文件、但一直沒動手**的東西做完。

### L1. spec 的視覺描述與 Figma 不符(第五~七輪都記過)

依照新原則(視覺以 Figma 為準,spec 只記 behavior / a11y),把有問題的 spec
逐一改寫,並在檔頭加上該元件的 **Figma node id**,讓下一個人直接去看原稿:

| spec | 原本寫錯的地方 |
|---|---|
| `bottom-bar.md` | 把 `2 Buttons` 描述成「兩顆按鈕」。實際是**主要按鈕 + 一個分頁式捷徑**;已加註這是 Figma 的命名陷阱 |
| `text-field.md` | 把 S/M/L/XL 說成「只改密度」,token 表還列了三種字級。實際是**寬度軸**,四個尺寸的高度與字級完全相同;外框也不是 gray-400 而是 **gray-800** |
| `radio-button.md` | token 表寫「圓框/選中填色 = green-800、未選 = gray-400」。實際上控制項是匯出的 `icon / 24px` 向量,環與圓點**都是 gray-black**,完全沒有品牌綠 |
| `offline-map.md` | 描述成「可收合的狀態**卡片**」+ 單一總結色票 + gray-100 明細底。實際是**逐電信商的列堆疊**,每列各自有自己的訊號狀態與顏色,沒有卡片、沒有那些底色 |
| `progress-indicator.md` | token 表寫「未來步驟 = gray-200」。實際上**已完成與未完成不做區分**,都是 gray-800;連接線也是 gray-800 髮絲線 |
| `list-weather.md` | 寫成「row/column」語意模糊。實際是**垂直的一整欄**,已明確描述 11 組資料的上下順序 |
| `card-scene.md` | 描述與 a11y 段都提到「漸層遮罩」——Figma 裡**沒有**這層東西;說明列是四邊內縮的浮動面板 |
| `card-notification.md` | 未讀點寫 destruct-600,實際是 **destruct-700** |
| `card-tickets.md` | 分隔線寫 gray-400,實際是 **green-700**(與外框、票根同色) |
| `tab.md` | 「作用中文字/底線 green-800 / green-900」語意含混,已拆成:底線 **green-800**、文字 **green-900**、未選底線 gray-200 |

### L2. React `RadioButton` 的受控輸入警告

`checked` 有給、`onChange` 沒給,React 會在主控台警告這是一個永遠不會更新的
受控欄位。只要呈現固定狀態(文件、story)是合理用法,所以改成:沒有給
`onChange` 時自動帶上 `readOnly`,而不是強迫呼叫端塞一個空函式。已在瀏覽器
確認 `input.readOnly === true`。

### L3. 歷輪文件的自我矛盾

前面幾輪的結論被後面幾輪推翻,但舊段落沒有更新,讀起來會互相打架。已就地補上
更正註記:

- **F4**(Tab)當時寫「作用中底線 green-900」→ 底線是 green-800,文字才是 green-900
- **G6**(Radio)當時寫「選中填綠點」且是手繪 → 是匯出向量,而且是 gray-black
- **F1** 註記的「React 待修」→ 已於 K4a 補上
- **H** 章「尚未逐項核對」清單 → 已於第五、六輪補完
- **I** 章「仍待處理」→ 已於第七、八輪處理完畢

### 目前沒有已知未處理項目

歷輪記錄過的落差全部關閉。刻意的偏離(原生控制項、商標不重製、iOS System
元件不移植)見 E 章,那些是有記錄的決策,不是待辦。

---

## M. 第九輪:剩下沒用精確 CSS 驗過的元件(2026-07-26)

前面幾輪雖然覆蓋很廣,但仍有一批元件從來沒有用 `get_design_context` 取過
精確 CSS——只靠早期的 SVG 取色或截圖目測。這輪把其中影響最大的補完。

### M1. `Buttons` — Pressing 狀態**不該有陰影**(兩平台都錯)⚠️

第二輪(F1)的矩陣是從匯出的 SVG 抽色值做的,抽不到陰影,所以當時寫成
「Primary Pressing:green-900 + elevation-3」。這次取實際 CSS:

```
Primary / Large / Pressing  → bg-green-900,       (無 drop-shadow)
Primary / Large / Loading   → bg-green-800 + drop-shadow + gap-8 + 40pt spinner
Secondary / Large / Pressing→ bg-green-50 + border-green-900,(無 drop-shadow)
```

也就是**按下時陰影會消失**(按鈕下沉),只有靜止與 Loading 帶 elevation-3。
React 的 `:hover/[data-state=pressing]` 規則沒有取消 `box-shadow`,SwiftUI 的
`hasElevation` 在 pressed 時仍是 `true`——**兩邊都錯**,已一起修正。

### M2. `Location Pin` — Focused 改變的是**尺寸**,不是顏色(SwiftUI 錯)

Figma 的兩個狀態差別只有一項:圓形圖釘 **24pt → 48pt**。填色在兩個狀態下都
一樣。SwiftUI 卻做成「focused 時顏色加深(green-800→900 / info-600→700)、
尺寸不變」——軸完全搞錯了。

另外兩點也一併修正:

- **標籤與圖釘不同色**:`Type=Info` 是 info-600 的圖釘配 **info-700** 的標籤。
- 標籤與圖釘之間**沒有間距**(原本給了 4pt),容器固定 144pt 寬,
  圖示在圓內是**內縮**的(原本讓 24pt 圖示塞滿 24pt 圓)。

React 端這個元件**本來就完全正確**,不需改動。

### M3. `Tab` — 徽章是絕對定位,分頁是固定寬(SwiftUI 錯)

Figma 的徽章釘在 `left: calc(50% + 17.88px)`、`top: calc(50% - 6px)`,
不參與版面;分頁寬度固定 **75 / 93.75 / 187.5**。SwiftUI 把徽章放進 `HStack`
裡跟標題並排,又用 `maxWidth: .infinity`——有徽章的分頁會被撐開、標題也不再
置中。已改為 overlay + 固定寬度。React 端本來就是絕對定位,正確。

### 本輪確認**沒有**落差的元件

| 元件 | 平台 |
|---|---|
| `Tab` 的尺寸/字級/底線 | React ✅ |
| `Location Pin` | React ✅(24/48pt、標籤與圖釘的雙色都對) |
| `Collapse Text` | React ✅ / SwiftUI ✅(px-24、gap-0、py-8 滿版按鈕、14pt chevron、文案) |
| `Navigation Bar` / `CheckBox Navigation` | React ✅(56pt、green-50 指示器 56×32、徽章偏移) |

### 驗證方式

`swift build` 與 `npm run typecheck` 通過;SwiftUI 端在模擬器截圖確認
LocationPin 四種組合、TabBar 徽章位置、Button 陰影,與 Figma 算圖一致。

### 仍未用精確 CSS 驗過(影響較小)

`Tooltip`、`Banner`、`Accordion / Chips`、`Logo`/`Logos`、`Spinner`、
`Bottom Sheet` 的 Filter_Discover / Filter_MapSearch 兩個變體、
`iOS System` 四件(未移植)。以及 SwiftUI 刻意改用原生控制項的六個
(見 E 章),那些不逐像素對齊是已記錄的決策。

---

## N. 第十輪:推翻 K1,補回 `Cards / Scene` 的漸層遮罩(2026-07-26)

### N1. 我在第七輪刪錯了東西 ⚠️

第七輪(K1)判定「Figma 沒有漸層遮罩」,把 React 的 scrim 移除。**這是錯的。**

發現方式:準備開 PR 前比對 `main`,看到上面有一個更早的 commit
`1b18db1 Fix CardScene: photo darkening scrim, badge blur, save icon...`——
也就是先前有人**特地把這層遮罩加上去**,而我把它刪了。那個 commit 的訊息寫明
它比對的是 **`Filter_MapSearch` 裡的 Cards/Scene 實例(4685:53295)**,
跟我看的**元件本體(374:3819)**不是同一個節點。

實際去取 4685:53295,六個 Cards/Scene 實例**每一個**都有:

```html
<div class="absolute bg-gradient-to-b from-[66.827%] from-[rgba(0,0,0,0)] inset-0 to-black" />
```

算圖上也看得很清楚,照片下緣明顯壓暗。

**為什麼元件本體看不到**:漸層是照片節點 fill stack 裡的一層,不是獨立的子
節點。元件本體那個 `image` 節點沒有掛照片,沒有 fill 就不會產生對應的 CSS,
所以輸出裡只剩一個空的 `<div>`。**空的元件本體會漏掉 fill 層級的樣式。**

處置:
- React 的 scrim **加回來**。
- SwiftUI **補上**(第三輪 G1 移除之後,一直沒人加回去,所以 SwiftUI 從頭到尾
  都缺這層)。

### 這件事的教訓(比這個 bug 本身重要)

1. **「元件本體沒有」不等於「設計裡沒有」。** 空狀態的元件會漏掉 fill、
   effect 這類掛在節點屬性上的東西。要判斷「某個效果不存在」,必須去看**有實
   際內容的實例**,不能只看元件本體。
2. **刪東西前先看 git log。** 這層遮罩是先前特地加上的,commit 訊息裡就寫了
   它比對的節點。我如果在動手前查過,就不會刪。移除既有的、有人刻意加上的
   東西,要比新增更謹慎。

---

## O. 第十一輪:把剩餘未驗的元件補上(2026-07-26)

延續第十輪,繼續處理從未用 `get_design_context` 讀過的元件。

| # | 元件 | 落差 | 平台 |
|---|---|---|---|
| O1 | `Icon Buttons` Location/Pressing | 與 `Buttons` 同一條規則:**按下時 drop-shadow 消失**。兩邊都還留著 elevation-4 | React + SwiftUI |
| O2 | `Icon Buttons` OfflineMap 的 `0%` / `已下載` | 文字是 **Label/M(14pt Semibold)**,SwiftUI 用了 body/M(regular)。React 的基礎 class 本來就是 semibold,正確 | SwiftUI |
| O3 | `Tooltip` | 內文寬度固定 **180pt**,SwiftUI 沒有設,氣泡會被內容撐開。React 有 | SwiftUI |

### 本輪確認**沒有**落差的元件

| 元件 | 結果 |
|---|---|
| `Cards / Description` | 兩邊都對(p-12、gap-8/4、Headline/3、body/M、240×180 圖片 radius 12) |
| `Tooltip` | React ✅(黑底、radius 4、p-8、elevation-4、180pt 內文寬) |
| `Banner` | React ✅(327pt、py-4 px-24、gray-800、body/S 白字) |
| `Toggle` | React ✅(52×32、Off = green-100 底 + 2pt green-800 框 + green-800 滑鈕;On = green-800 底 + 白滑鈕位移 20) |

### 一個累積出來的規律

`Buttons` 與 `Icon Buttons` 的 Pressing **都會拿掉陰影**。第二輪那份矩陣是從
匯出的 SVG 抽色值建的,而 **SVG 抽不到陰影**——這個方法上的盲點一次造成了兩個
元件、兩個平台共四處錯誤。凡是當初只靠 SVG 取色定案的結論,都值得用實際 CSS
再確認一次。

### 仍未用精確 CSS 驗過

`List / Setting`、`List / DownloadMap`、`List / Notification`、
`Accordion / Chips`、`Segmented Controls`、`Stepper`、`Search Bar`、`App Bar`、
`Spinner / On White`、`Spinner / On Dark`、`Motion / Transaction`、
`Motion / Success`、`Bottom Sheet` 的 `Filter_Discover`、`Link`、
`Logo` / `Logos`(刻意不重製商標)、六組 icon set、
`iOS System` 四件(React 有實作、SwiftUI 刻意不移植)。

### 設計端可能想知道的一點

`Toggle` 的 Off 狀態在 Figma 是 **green-100 底 + 2pt green-800 外框 + green-800
滑鈕**,和 iOS 原生開關(灰底白鈕)差距很大。SwiftUI 目前用原生控制項,是
E 章記錄過的平台決策,所以沒有改;但如果品牌一致性優先於原生慣例,這是少數
真的看得出差別的地方,需要設計端拍板。

---

## P. 第十二輪:Toggle 改為品牌樣式,並繼續掃剩餘元件(2026-07-26)

### P1. `Toggle` 依設計端決定改為自繪(SwiftUI)

前一輪提出的取捨,設計端拍板**跟著 Figma**。SwiftUI 原本用系統開關 + 品牌
tint,現在依 Figma 自繪:

```
軌道 52x32 capsule
Off → green-100 底 + 2pt green-800 外框 + green-800 24pt 滑鈕
On  → green-800 底 + 白色 24pt 滑鈕
滑鈕內縮 4pt,在前緣與後緣之間移動
```

**行為仍然是原生的**:它還是一個 `Toggle`,只是換了 `ToggleStyle`,所以
VoiceOver 依舊報讀為「切換開關,開/關」而不是「按鈕」,`.disabled(_:)` 與
Dynamic Type 也照常運作。`DSNotificationSettingRow` 用的是同一個 Figma
`Toggles` 元件,所以一併套用同一個 style。

### P2. 本輪確認**沒有**落差的元件

| 元件 | 結果 |
|---|---|
| `List / Notification` | 兩邊都對(py-8、label body/L 16pt black、52x32 開關) |
| `List / Setting` | React ✅(px-24 py-12、body/L、14pt chevron) |
| `Segmented Controls` | React ✅(gray-50 軌道、green-800 指示器 + Elevation/1、選項 py-8 px-24、body/M) |
| `Toggle` | React ✅(本來就照 Figma 自繪) |

### P3. 還有四個同類的取捨等設計端決定

`Toggle` 這個決定同時也適用於 SwiftUI 其餘幾個**刻意改用原生控制項**的元件——
它們和 Figma 的差距是同一種性質(品牌樣式 vs 原生慣例),而且 React 那邊都已經
照 Figma 自繪了,所以目前是**跨平台不一致**:

| 元件 | Figma | SwiftUI 現況 | 看得出差別嗎 |
|---|---|---|---|
| `Segmented Controls` | gray-50 軌道 + **green-800** 實心指示器 + 白字 | 原生:灰軌道 + **白色**指示器 + 黑字 | 很明顯 |
| `Stepper` | 待驗 | 原生 `Stepper` | 中等 |
| `Search Bar` | 待驗 | `.searchable` | 中等 |
| `App Bar` | 待驗 | `.toolbar` | 較小 |

`Segmented Controls` 的落差最明顯(指示器整塊顏色相反)。要不要一起改成品牌
樣式,需要設計端一併拍板——`Toggle` 已經開了先例。

### 仍未用精確 CSS 驗過

`Accordion / Chips`、`Stepper`、`Search Bar`、`App Bar`、`Spinner / On White`、
`Spinner / On Dark`、`Motion / Transaction`、`Motion / Success`、
`Bottom Sheet` 的 `Filter_Discover`、`Link`、`Logo` / `Logos`(刻意不重製商標)、
六組 icon set、`iOS System` 四件。

---

## Q. 第十三輪:三個原生控制項改為自繪,並判斷另外兩個(2026-07-26)

### Q1. `Segmented Controls` 依設計端決定改為自繪(SwiftUI)

Figma:gray-50 軌道(radius 8)+ **green-800** 實心指示器(radius 8、Elevation/1、
內縮 2pt)+ **白字**;未選取是 gray-800 字。原生控制項剛好相反(白色指示器 +
深色字),所以整塊顏色是反的。已依 Figma 自繪。

選取行為仍是原生語意:透過 `accessibilityRepresentation` 投影一個真正的
`Picker`,VoiceOver 報讀為「選擇器 + 目前值」而不是兩顆獨立按鈕;指示器用
`matchedGeometryEffect` 滑動(與 `DSTabBar` 同一手法)。

### Q2. `Stepper` — 驗過之後判斷:**應該自繪**

Figma 是**一個帶外框的膠囊**,裡面依序是 [− 48pt][數值 48pt][+ 48pt]:

```
外框 radius 12 — Default/0: 1pt gray-200;Error: 2pt destruct-600;Disabled: 1pt gray-100
數值 SF Mono Semibold / Headline/4(16pt),Disabled 時 gray-200
錯誤訊息在下方:16pt 警告圖示 + destruct-700 12pt 文字,gap 4
```

原生 `Stepper` 把數值放在控制項**外面**,只給一組小的 −/+ ——這是**結構差異**,
不只是配色,所以自繪。無障礙契約維持原生:整個控制項投影一個真正的 `Stepper`,
VoiceOver 依舊當成可調整的值(上下滑動改變)。

順帶解決了 C1:Figma 的 `State=0` 不需要是一個具名狀態,它就是「數值等於範圍
下界、減號自動停用」的樣子,從範圍判斷自然得出。

### Q3. `Search Bar` — 驗過之後判斷:**應該自繪**

Figma 的搜尋列**不是**系統搜尋框,而是放在頁面內容裡的組合控制項:

```
48pt 白色欄位,1pt gray-200 外框,radius 12,Elevation/3,左內距 12、右 0
內含 20pt 放大鏡 + 查詢文字(Label/L 16pt,placeholder gray-400)+ 48pt 麥克風鈕
旁邊還有一個**獨立的** 48pt 篩選鈕(同樣白底、外框、radius 12、Elevation/3),gap 8
```

`.searchable` 表達不出來:它畫在導覽列裡的灰色膠囊,容不下麥克風鈕,也沒有
並排的兄弟控制項。原本的作法是叫呼叫端「把篩選放到 toolbar」——那等於把它挪到
畫面上完全不同的位置。已新增 `DSSearchBar` 作為 Figma 元件的實作;
`dsSearchable` 保留給真的想要**系統**搜尋行為(可滾動顯示、Cancel)的情境,
並在註解裡說明兩者何時用哪個。

### Q4. `App Bar` — 驗過之後判斷:**維持原生**

Figma 是 48pt 白色列 + **置中 16pt Regular** 標題;iOS 是 44pt + 17pt Semibold。
差距不大,而為了這點差距換掉導覽列,要放棄:跟真實導覽深度連動的返回鈕、
邊緣滑回手勢、大標題收合、toolbar 的安全區處理——**行為代價遠大於視覺收益**。

改為用便宜的方式縮小差距:標題釘成 inline(置中、精簡,與 Figma 一致),
toolbar 按鈕改用品牌自己的 24pt 圖示而非 SF Symbol。

另外修掉兩個與原生無關的純錯誤:`ProfileInfo` 的頭像應為 **48pt**(原本 32)、
姓名應為 **14pt**(原本 16),間距 16。

### Q5. 本輪確認**沒有**落差的元件

| 元件 | 結果 |
|---|---|
| `Link` | 兩邊都對(yellow-700、Label/M 14pt Semibold) |
| `Segmented Controls` | React ✅ |
| `Stepper` | React ✅(本來就照 Figma 自繪,含 `State=0`) |
| `Search Bar` | React ✅ |

### 仍未用精確 CSS 驗過(6 個)

`Accordion / Chips`、`Spinner / On White`、`Spinner / On Dark`、
`Motion / Transaction`、`Motion / Success`、`Bottom Sheet` 的 `Filter_Discover`。

其餘刻意不逐像素對的:`Logo` / `Logos`(不重製商標)、六組 icon set
(圖檔本身是從 Figma 抽的真實向量)、`iOS System` 四件。

---

## R. 第十四輪:最後 6 個元件驗完(2026-07-26)

### R1. `Accordion / Chips` 用的是 **Chips/Large**,不是 Small(SwiftUI)

Figma 展開後那排是 `Chips / Large`(103pt 寬、8/16 padding、14pt 標籤),
SwiftUI 卻傳 `.small`。React 的 chip 本來就是 py-8 px-16 / 14pt,正確。

### R2. `Spinner` 依 Figma 自繪,尺寸也錯了一半(兩平台)

Figma 是 **40pt 方框上八顆 8pt 圓點**繞著圓周淡出成一道尾巴。

- **React**:容器只有 **20pt**、圓點 16.6% —— **整個小了一半**。Buttons 的
  Loading 狀態在 44pt 按鈕裡放的是 40pt spinner,所以 40 才是原意。已改正,
  旋轉原點跟著換成 250%。
- **SwiftUI**:原本是 tint 過的原生 `ProgressView`(轉圈的缺口環),與八點尾巴
  是不同的東西。依 Figma 自繪,並**明確保留**原生指示器本來免費給的兩件事:
  無障礙報讀(`updatesFrequently` + 標籤),以及 **Reduce Motion**——開啟時
  不旋轉,改為停在一個靜態尾巴。
- 順帶修:`DSSpinner.onWhite` 用的是 gray-800,Figma 是 **green-800**。
- 另外 `DSButton` 的 Loading 還在用裸的 `ProgressView`,已換成 40pt 的
  `DSSpinner(tint: 前景色)`——Primary 上是 On Dark、其餘是 On White,剛好就是
  已解析出來的前景色。Loading 時取消垂直 padding,否則 40pt 會撐破 44pt。

### R3. `Bottom Sheet / Filter_Discover` — 少了一整個排序區塊(SwiftUI)

Figma 由兩個有標題的區塊組成,最後接 `Bottom Bar`:

```
排序依據 → Segmented Controls
篩選     → 1× Accordion/CheckBox + 9× Accordion/Chips(各 48pt)
Blank 32pt
Bottom Bar
```

原本的實作:**完全沒有排序區塊**、自己加了一個 Figma 沒有的 Headline/3 標題、
每個群組都用裸的 `DisclosureGroup` + checkbox,而不是重用設計裡真正實例化的
那兩個 Accordion 元件。已依 Figma 重建,並改用 `dsBottomBar` 收尾。

### R4. 本輪確認**沒有**落差的元件

| 元件 | 結果 |
|---|---|
| `Accordion / Chips` | React ✅ |
| `Motion / Success` | 兩邊都對。SwiftUI 帶著 Figma 的精確 wipe 幾何(mask 1→22→60,x=19 y=23 h=52,96×96 success-600 圓);React 用 stroke-dash 畫出同一個揭露效果,2.4s |
| `Motion / Transaction` | 兩邊都對。SwiftUI 的座標(`screen = CGRect(x: 26.84, y: 21.45, ...)` 等)直接來自十格 storyboard,是先前「從真實 Figma 圖稿重建」那次的產物 |

### 60 個元件的最終覆蓋狀況

| 類別 | 數量 | 狀態 |
|---|---|---|
| 已用精確 CSS 驗過 | **45** | 落差全部修正 |
| 刻意不逐像素對(有記錄) | 11 | `Logo`/`Logos`(不重製商標)、6 組 icon set(圖檔是從 Figma 抽的真實向量)、`iOS System` 四件 |
| 由原生控制項繪製(唯一保留者) | 1 | `App Bar`——見 Q4 的權衡 |
| Bottom Sheet 的三個 style | 3 | 皆已驗(Map_Info、Filter_MapSearch、Filter_Discover) |

**目前沒有已知未驗、也沒有已知未修的項目。**

### 這一系列稽核最該記住的三件事

1. **來源看錯,結論會很有信心地錯。** SVG 匯出抽不到陰影 → 兩個元件四處錯;
   空的元件本體抽不到 fill 層 → 誤刪了 Cards/Scene 的漸層。
2. **兩個平台不一致的地方,就是至少一邊錯了。** 這比「憑印象覺得哪裡怪」有效得多,
   而且大多數情況下 React 是對的那一邊。
3. **元件名稱會騙人。** `2 Buttons` 不是兩顆按鈕;`List / weather` 不是一列;
   Text Field 的 S/M/L/XL 不是字級。名稱只能當線索,不能當規格。

---

## S. 第十五輪:設計端指示的六項後續處理(2026-07-26)

第十四輪結尾我列出的未處理項目,設計端逐項給了指示,全部照辦:

### S1. React 圖示改用 Figma 真實向量 ⚠️ 最大的一項

React 的 48 個 glyph 全是**手寫的 `<path d="M…">` 近似值**。已證實其中
`radio` 是錯的(16pt 環 + 8pt 內圓 / gray-800,Figma 是 20pt 環 + 12pt 內圓 /
gray-black),其餘 47 個用同樣方式畫,從未核對。

SwiftUI 早就有真實圖稿:`swiftui/Tools/extract.mjs` 把 frame 層級的 Figma 匯出
切成 per-glyph SVG,再打包成 imageset。新增 `react/scripts/generate-icons.mjs`
讀**同一批檔案**產生 `glyphs.generated.tsx`,兩個平台從此畫的是同一份向量。

- 墨色(`#1D1F1B` / `#494C44`)→ `currentColor`,呼叫端可以 tint;
  白色挖空與語意色(黃/綠/紅)維持固定,對應 SwiftUI 的 `DSIcon.defaultTint`。
- `icons.css` 給預設墨色:一般 gray-black、weather 組 gray-800(Figma 如此)。
- **順帶修好 IconButton 的 tint**:它的 CSS 註解宣稱圖示用 `currentColor`,
  但實際的 path 寫死 gray-800,所以 Primary 的白色 tint **從來沒生效過**。

視覺確認時看到好幾個 glyph 明顯改變,證實舊的手繪版本確實有偏差:
`back` 原本是**實心三角形**、現在是 chevron;`member` / `heart` 的線框版
現在才真的和實心版不同。

> **驗證時抓到的 bug**:把來源 `<svg>` 剝掉時連 `fill="none"` 也一起沒了,
> 於是只有 `stroke` 的 path 退回 SVG 預設的黑色填充,`radio` 變成一坨黑球。
> 產生的元件已在根節點補上 `fill="none"`。

### S2. `swiftui/README.md` 的原生控制項對照表(過時 6 列)

表格已重寫成兩塊:**仍為原生**與**改為依 Figma 自繪**,並說明每一個改動的理由
與保留的原生語意。`RadioButton` 那列從第三輪起就不再是 `Picker(.inline)`,
也一併更正。

### S3. 移除 React 的 iOS System 四件

`Keyboard`、`KeyboardNumbers`、`HomeIndicator`、`StatusBar` 已刪除。連帶清掉
`BottomSheet` 與 `BottomBar` 裡的 `HomeIndicator` 用法、孤兒 CSS,以及
foundations 文件裡的引用。`docs/figma-mapping.md` 的四列改為「未實作」並補上
理由。**兩個平台現在一致**——先前只有 SwiftUI 沒移植,React 還留著模擬元件。

### S4. 60 份 spec 全部標上 Figma 節點

每一份檔頭都加上該元件的 node id 與「視覺以 Figma 為準,本文件只記 behavior /
a11y」的聲明(節點是從 `figma-mapping.md` 程式化對出來的,不是手寫)。
iOS System 四份另外標明兩個平台都不實作。

### S5. 移除 Icon Buttons 的 Loading 狀態(兩平台)

設計端確認 `State=Loading` / `Loading...` 只是為了跑 Figma 原型,不是產品狀態。
React 的 `"Loading"` state 與 `progress` prop、SwiftUI 的
`.downloading(progress:)` case 都已刪除,story 與 showcase 一併清掉。
這也關閉了長期掛著的 C3。

### S6. Buttons 只保留 Figma 真的有的 19 種組合

先前兩個平台的 props 完全正交,可以做出設計裡不存在的 5 種樣式。

- **React**:`ButtonVariant` 改成聯集型別,Small 沒有 Loading、Tertiary/Small
  只有 Default——寫錯**編譯不過**。(這個型別立刻抓到 all-variants story 在跑
  完整 24 格笛卡兒積。)
- **SwiftUI**:拆成兩個 initializer,帶 `isLoading` 的那個把 size 釘死在
  `.large`,所以「Small + Loading」無法表達。Pressing / Disabled 來自
  environment 而非參數,不在此約束範圍。

這關閉了 C5。

---

## S. 第十五輪:Badge 收斂 + 逐份查證 spec 的數值(2026-07-28)

### S1. `Badge` 依 Figma 只保留 4 種組合

與 Buttons 同一類:`Attribute × For` 當成兩個自由軸會得到 6 種,Figma 只畫了 4 種。
`Large/Accordion` 與 `Maximum/Accordion` 沒有設計依據。React 改用 props union、
SwiftUI 改用單一 `Variant` enum,兩邊都變成**無法表達**,而不只是文件上註明。

順帶記錄一件設計本身的形狀:`Small` 在不同 context 意義不同——Notification 上是
沒有數字的圓點,Accordion 上是有數字的膠囊。這是原稿如此,不是實作簡化。

### S2. 47 份只加了標頭的 spec,逐份核對數值 → **16 份是錯的**

前一輪把「以 Figma 為準」的標頭加到全部 60 份,但只有 13 份實際查證過數值。
這輪把剩下 47 份的 Token Mapping 逐一對照**已驗證的實作**,約三分之一有實質錯誤:

| spec | 錯在哪 |
|---|---|
| `accordion-chips` | 把 `gray-100` 寫成 chip 的**填色**(其實是未選取的**外框**),還說選取填 `green-800`(根本沒用到)。而且這排用的是 **Chips/Large** 不是 Small |
| `chips-large` / `chips-small` | 選取態外框寫 `green-900`,實際是 **`green-100`** |
| `crowdedness` | 寫「白底 + 灰字」,實際是**實心色票 + 白字**——這正是第四輪 H9 修掉的錯誤,spec 一直沒跟上 |
| `location-pin` | 寫「Focused 換成 info 色」,實際 focus 改的是**尺寸**(24→48pt);標籤寫白色,實際是 green-800 / info-700。而且 Info 的**標籤與圖釘是不同 token** |
| `user-location` | 圓點與外環寫反了——實際是 **info-700 圓點 + 3pt 白環** |
| `segmented-controls` | 指示器寫白色、選取文字寫 green-800——**整組相反**。這份描述的其實是 iOS 原生控制項,不是 Figma |
| `search-bar` | 底色寫 `gray-50`、圓角寫 `radius.m`,實際是**白底 + `radius.s`** |
| `app-bar` | 底色寫 `gray-50`,實際是**白色** |
| `card-tickets` | 圓角寫單一 `radius.m`,實際是**左 xxs / 右 m 的非對稱**;金額寫 green-700,實際是 **gray-800** |
| `stepper` | 外框寫 `gray-800`,實際依狀態是 gray-200 / destruct-600 / gray-100 |
| `spinner-on-white` | 寫「不是共用色 token 的深色」,實際就是 **`green-800`** |
| `toggle` / `list-notification` | 只寫了白色滑鈕,漏掉 **Off 是 green-800 滑鈕 + 2pt green-800 外框** |
| `check-box` | 漏掉勾選後標籤轉 **green-800** |
| `payment-info` | 把貨幣符號與數字都寫成 semibold,實際是 **H3 semibold + H1 regular** |

### 一個模式

錯得最有代表性的是 `segmented-controls` 和 `crowdedness`:兩份寫的都是**實作曾經
長的樣子**(原生控制項、白底彩框),而不是 Figma。spec 是照著當時的程式碼回填的,
所以程式碼改對之後,spec 反而變成錯的那一方——這正是「spec 不能當視覺依據」的
具體證據。

剩下 31 份對照後與實作一致,未改動。

---

## E. 補充說明:刻意的偏離(非落差)

以下項目與 Figma 不同,但都是有記錄的平台決策,不列為落差:

- **6 個圖示元件 → 1 個 `DSIcon`**:SwiftUI 端合併成單一 enum,但**圖檔本身
  是從 Figma 直接抽出的真實向量**(見 `swiftui/Tools/`),不是 SF Symbol 替代。
- **4 個 iOS System 元件未移植**:StatusBar / Keyboard / KeyboardNumbers /
  HomeIndicator 在真機上由 OS 繪製。
- **`CheckBox/Navigation` 已從 SwiftUI 移除**:`TabView` 只讀取 `.tabItem` 的
  image + text,自訂樣式會被丟棄。React 端保留(其 `NavigationBar` 有用到)。
- **多個元件改用原生控制項**:見 `swiftui/README.md` 的對照表。**例外:`Toggle` 已於第十二輪依設計端決定改為依 Figma 自繪**(見 P1)。

---

## T. 第十六輪:Token 層與 Style Guide 排版(前十五輪從未查過的一層)

前十五輪查的都是**元件**。這一輪改查 Figma `Style` section(node `2308:36025`)
底下的 Style Guide 本身——也就是 token 的定義來源,以及 Storybook 上重現它的
`Style` 區塊排版。這一層過去只有「值對不對」被間接驗證過(元件 CSS 的字級、
色碼),**定義本身、以及跨平台換算規則從來沒有直接對過 Figma**。

先講結論:**色票 22 個、字級 11 級、Elevation 5 級、Radius 6 級、Spacing 11 級,
數值全部正確**。錯的是三件「值以外」的事。

### T1. `Headline/1` 的 2% 字距,兩邊都沒有實作

Figma Typography 表格有一欄 `Spacing`,H1 是 **2%**,其餘全部 0%。
`design-tokens.json` 的註解**寫到了**這件事,但整條 pipeline 從來沒有輸出過
letter-spacing——React 沒有變數,SwiftUI 的 `DSTypeStyle` 連這個欄位都沒有。
等於「記錄了、但沒做」。

修正方式刻意保持相對值而非絕對點數:

- token 新增 `letterSpacing: 0.02`(em),只有非 0 的層級會輸出 CSS 變數
  `--letter-spacing-h1`
- SwiftUI `DSTypeStyle` 新增 `letterSpacing`,modifier 用
  `.tracking(size * letterSpacing)`——`size` 是 `@ScaledMetric` 之後的值,
  所以字距會跟著 Dynamic Type 一起縮放,而不是在大字級下變得過窄
- React 兩個用到 H1 的地方(`PaymentInfo` 金額、`BottomBar` 價格)補上
  `letter-spacing: var(--letter-spacing-h1)`

### T2. SwiftUI 的陰影模糊半徑,五級用了兩套換算

Figma 的 drop-shadow radius 就是 CSS 的 blur-radius,兩者同一個數字。
但 CSS 的 blur-radius 定義是 **2σ**,SwiftUI `.shadow(radius:)` 收的是 **σ**,
所以轉 Swift 必須除以 2。

原本 `design-tokens.json` 裡:

| | Figma blur | 舊 Swift radius | 換算 |
|---|---|---|---|
| Elevation/1 | 2 | 1 | ÷2 ✅ |
| Elevation/2 | 4 / 8 | 4 / 8 | ×1 ❌ |
| Elevation/3 | 1 / 12 | 1 / 12 | ×1 ❌ |
| Elevation/4 | 20 | 20 | ×1 ❌ |
| Elevation/5 | 32 / 4 | 32 / 4 | ×1 ❌ |

只有 level1 換算對了,其餘四級的陰影在 iOS 上**擴散程度是設計稿的兩倍**。
之所以一直沒被抓到,是因為前十五輪比對的是「有沒有陰影 / 是哪一級」,
沒有比對過模糊程度。

修法不是逐條改數字,而是把 JSON 欄位從 `radius`(已換算)改成
`blur`(Figma 原值),換算規則收斂成 `build-tokens.mjs` 裡的一行
`blur / 2`——JSON 從此就是 Figma 的鏡像,平台換算只有一處、且寫明理由。

### T3. `Radius/rounded` 是 10000,不是 9999

Figma 變數的字面值是 `10000`。9999 是實作端自己填的慣用值。視覺上沒有差別,
但既然 Figma 是唯一依據,就沒有理由讓它保留一個不存在於設計檔的數字。
(SwiftUI 端維持不輸出這個常數,改用 `Capsule()`——這是有記錄的平台決策。)

### T4. Storybook `Style` 區塊的排版與 Figma 不符

`Style` 五頁是上一輪新建的,值都對,但**排版是自己想的**,不是照 Style Guide。
逐頁對過 Figma 之後:

| 頁面 | Figma | 修正前 |
|---|---|---|
| (全部) | 每個 frame 都有 H1 標題 | `Typography`、`Elevation` 沒有標題 |
| (全部) | 標題 H1 **Semibold** | 寫成 `fontWeight: 400` |
| `Color` | 群組標籤 96px **靠右**、Headline/2 | 16px、靠左 |
| `Color` | 色票裡的階數 Headline/2(24) | 16px |
| `Elevation` | 60×60 方塊、Headline/3(20) | 72×72、16px |
| `Radius` | 邊框 **black**、另帶 Elevation/1 陰影 | gray-400、無陰影 |
| `Radius` | 數字 Headline/3、`Rounded` Headline/4 靠右 | 全部 16px 置中 |
| `Spacing` | 白底、radius `xs`、Elevation/1 陰影 | gray-400 外框、無陰影 |
| `Typography` | 表格有 `Spacing`(字距)欄 | 沒有這一欄 |

順帶清掉 `Elevation` 頁一段死碼:`UNMAPPED` 是空陣列,卻仍然渲染出
「Not mapped to any Elevation level」標題和一張空表。

五頁共用的樣式抽到 `react/src/style/styleGuide.ts`,避免下次再各自漂移。

### T5. 查證後**不是**落差的兩項

- **`Type Scale/body/L` 變數的值是 14**,但 Typography 說明表寫 Body L = **16**
  (M=14、S=12)。這是 Figma 檔案內部變數命名與說明文件對不上,不是程式錯誤;
  實作採用說明表(也是各元件實際渲染的字級),維持不動。
- **`DSBottomSheet` 沒有 elevation**,React 端有 `elevation-3`。SwiftUI 用原生
  `.sheet` + `.presentationDetents`,面板陰影由系統繪製,不該再疊一層。

### 驗證

- `npm run typecheck` 通過;`swift build` 通過
- Storybook 實際量測 DOM(非目視):Radius 六格邊框 `rgb(29,31,27)`、
  陰影 `rgb(219,222,213) 0 1px 2px`、字級 20/20/20/20/20/16;
  Color 22 個色票、標籤 96px 靠右 24px/600;Elevation 五級 box-shadow
  與 Figma 字面值逐字相同;Typography 十一列的 size / line-height / weight
  全中,H1 `letter-spacing` 實測 `0.8px`(40 × 2%)

---

## U. 第十七輪:設計端四項指示 — 逐項回 Figma 查證的結果

設計端在對話中交代四件事,並說「已經在 Figma 改好了」。逐項去查,**Figma 只有兩項
真的改了**,另兩項與檔案現況不符。四項都照指示做完,但落差必須留紀錄,否則下一輪
稽核會把它們當成錯誤「改回去」。

### U1. NavigationBar(TabView)Default → green-800、Enabled → green-900

**Figma 現況:未改。** `Navigation Bar`(490:22853)與 `CheckBox / Navigation`
(355:60400)的標籤都還是 gray-800(未選)/ black(選取)。

實作上還撞到一個更硬的限制:**iOS 26 的浮動式 tab bar 不吃 `UITabBarAppearance`**。
先用 `stackedLayoutAppearance.normal` 設 green-800,再退回舊的
`unselectedItemTintColor`,兩者都無效。iPhone 17 / iOS 26.5 實機採樣:

| Tab | 實測顏色 |
|---|---|
| 活動(未選) | `#191919`(系統預設) |
| 通知(未選) | `#191919` |
| 會員(未選) | `#191919` |
| 地圖(選取) | `#2A321B`(`.tint()` 有效,經 tab bar 混色後偏深) |

原生 `TabView` 只開放選取色。要兩色就只能自繪——與 `Toggle`、`Segmented Controls`、
`Stepper`、`Search Bar` 同一個決定。`DSAppTabView` 因此改為依 Figma 自繪:56pt 高、
24pt 圖示 + 4pt + Label/S、選取時 green-50 的 56×32 膠囊指示器、徽章掛在圖示右上。
圖示同時從 SF Symbols 換成 Figma 抽出的真實向量。

**代價**:失去 iOS 26 的玻璃 tab bar 與捲動收合。**保留**:透過
`accessibilityRepresentation` 仍以真正的 tab bar 語意曝露給 VoiceOver。

改完實測:green-800 2083 px(三個未選)、green-900 517 px(一個選取),同落在
tab bar 的 y 帶,比例約 4:1。

### U2. Placeholder 一律改 Gray-600

**Figma 現況:部分已改。** `Gray Scale/Gray-600 = #717569` 這個變數是新增的,
`Search Bar` 的 Default placeholder(490:4169)與 `Text Field` 的
`Input / M` Default(12190:16603)都已經套上;但 `Text Field` 的
**S / L / XL 以及全部 Error 狀態**仍是 gray-800。依指示全部統一成 gray-600。

順帶發現 **SwiftUI 的 `DSTextField` 根本沒有 placeholder**(`TextField("", …)`),
Figma 的 Default 狀態是有的,一併補上。SwiftUI 只認 styled `prompt` 才能換色,
把字串當 title 傳會沿用系統的 placeholder 顏色。

### U3. CardScene 移除底部漸層

**Figma 現況:已改,而且不只移除漸層。** `Filter_MapSearch` 的 Cards/Scene 實例
(9528:34104)已經不再輸出任何 `linear-gradient`;文字區改成
`rgba(0,0,0,0.5)` + `backdrop-blur(6px)`、radius 12、左右下內縮 8pt 的浮動面板。
React 端的面板早就是這樣,只要拿掉 scrim;SwiftUI 端拿掉 `LinearGradient` overlay。

這正好推翻第 K/G 輪的結論。當時的教訓是「元件本體沒有 ≠ 設計裡沒有」——這次相反:
實例裡真的沒有了。**兩邊都要看,而且要看當下的版本。**

### U4. `Type Scale/body/L` = 16?

**變數本身仍是 14。** 但這不是錯誤,原因終於查清楚了:**Figma 的變數名稱比樣式名稱
整體低一階**。

| 樣式 | 綁定的變數 | 實際值 |
|---|---|---|
| `body/L` | `Type Scale/Label/L` + `Line Height/H4` | **16 / 24** ✅ |
| `body/M` | `Type Scale/body/L` + `Line Height/body/L` | **14 / 20** ✅ |
| `body/S` | `Type Scale/body/M` + `Line Height/body/M` | **12 / 18** ✅ |

也就是說 `Type Scale/body/L = 14` 餵的是**樣式 `body/M`**。三個樣式解析出來的值
(16 / 14 / 12)與 Typography 說明表完全一致,也與我們的 token 一致——**程式碼本來
就是對的,不需要改**。第 T5 輪記的那個「檔案內部不一致」到此有了完整解釋。

### 驗證

- `npm run typecheck`、`swift build`、iOS `xcodebuild` 皆通過
- 模擬器實機採樣(非目視):tab bar 兩色如上表
- Storybook 量測 DOM:CardScene 全頁 **0 個** gradient 元素、`__scrim` 不存在、
  內容面板 `rgba(0,0,0,0.5)` / `blur(6px)` / radius 12;SearchBar placeholder
  實測 `rgb(113,117,105)` = `#717569`

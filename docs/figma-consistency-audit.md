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

### K1. `Cards / Scene` 的漸層遮罩:Figma 裡根本沒有 ⚠️

React 有一層 `linear-gradient(180deg, transparent 66.83%, black 100%)` 的
scrim。重新取 Figma 的 Picture frame,裡面**只有**三個子節點:照片、浮動說明
面板、狀態標籤——沒有任何漸層。已從 React 移除。

(第三輪 G1 曾說「多加了一層漸層遮罩」,那句是對的;但同一輪又把內縮與圓角
一起拿掉,那半句是錯的,已於第五輪 I1 修回。)

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

## E. 補充說明:刻意的偏離(非落差)

以下項目與 Figma 不同,但都是有記錄的平台決策,不列為落差:

- **6 個圖示元件 → 1 個 `DSIcon`**:SwiftUI 端合併成單一 enum,但**圖檔本身
  是從 Figma 直接抽出的真實向量**(見 `swiftui/Tools/`),不是 SF Symbol 替代。
- **4 個 iOS System 元件未移植**:StatusBar / Keyboard / KeyboardNumbers /
  HomeIndicator 在真機上由 OS 繪製。
- **`CheckBox/Navigation` 已從 SwiftUI 移除**:`TabView` 只讀取 `.tabItem` 的
  image + text,自訂樣式會被丟棄。React 端保留(其 `NavigationBar` 有用到)。
- **多個元件改用原生控制項**:見 `swiftui/README.md` 的對照表。

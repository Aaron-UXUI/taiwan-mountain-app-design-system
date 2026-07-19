# 台灣山林 App — 完整元件清單（手動 code mapping 用）

來源：Figma 檔案 `nXFkT45U8mDzUK5rUfL0eK`，Component 頁面（node-id 12256:1743），透過完整讀取該頁面下所有 section/frame 得到，總共 **60 個獨立元件（component / component set）**，比對之前抽樣搜尋抓到的 11 個，這次是完整版。

沒有正式 Code Connect（方案限制），所以用這張表手動維護「Figma 元件 ↔ 程式碼元件」的對應關係。工程師開發時可以查這張表，找到 Figma 元件名稱對應的程式碼位置。每寫好一個元件，回來填上「對應程式碼元件」跟「檔案路徑」兩欄即可。

## Clickable / 互動元件

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| CheckBox | State=Off/On | 7813:28478 | `CheckBox` | `src/components/clickable/CheckBox/CheckBox.tsx` |
| Chips / Small | Active=No/Yes | 10125:9787 | | |
| Chips / Salient | Type=General/Special/Warning | 12554:9489 | | |
| Toggles | Active=Yes/No | 10291:14552 | | |
| Chips / Large | state=no/yes | 812:5259 | | |
| Radio button | click=no/Yes × Style=Default/expanded | 816:4968 | | |
| Location Pin | State=Default/Focused × Type=Default/Info | 11129:12159 | | |
| Segmented Controls | Click=Left/Right | 598:6408 | | |
| Stepper | State=0/Default/Error/Disabled | 12190:23425 | | |
| Text Field | State=Default/Typing/Typed/Error | 12190:16599 | | |
| Buttons | Type=Primary/Secondary/Tertiary × Size=Large/Small × State=Default/Disabled/Pressing/Loading | 425:5337 | `Button` | `src/components/clickable/Button/Button.tsx` |
| Icon Buttons | State × For=Location/Save/OfflineMap × Type | 7297:15056 | | |
| User Location | 單一元件 | 12846:34701 | | |
| Link / Further Info | 單一元件 | 11167:23076 | | |
| Link | 單一元件 | 12469:18515 | | |

## Icons / 圖示

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| icon / 24px | map, search, notify, member, heart, radio, gps, setting, more, filter, back, close, minus, plus 等 21 種 | 486:5205 | | |
| icon / 20px | search, microphone, check, info, credit-card, close-eye, open-eye | 490:21891 | | |
| icon / 14px | chevron, secured | 507:4429 | | |
| icon / 24px / weather | cloud-sun, sunny, rain, lightning-rain, windy, typhoon, cloud-snow | 1743:13737 | | |
| icon / 16px | exclamation, arrow-up-right, non/notified, heart no/yes | 10787:61593 | | |
| icon / 24px / Map | tree, camera, walk, info | 11129:12166 | | |
| Logos | 金流／登入品牌圖示（信用卡、mastercard、JCB、Line Pay、Google Pay、Apple Pay、Apple、Google、Facebook、中華電信、台灣大哥大、遠傳） | 8503:22571 | | |
| Logo | App Logo，Large/Small | 12649:28641 | | |

## Content Container / 內容容器

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| Cards / Scene | 單一元件 | 374:3819 | | |
| Cards / Description | 單一元件 | 11441:11209 | | |
| Cards / Tickets | state=default/disable | 1373:16817 | | |
| List / weather | 單一元件 | 778:9646 | | |
| List / Setting | 單一元件 | 493:1903 | | |
| Cards / Notification | 單一元件 | 459:1657 | | |
| Cards / Saved Items | 單一元件 | 473:4929 | | |
| List / DownloadMap | 單一元件 | 13452:15899 | | |
| List / Notification | 單一元件 | 13452:15906 | | |

## Progressive Disclosure / 漸進式揭露

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| Collapse / Text | Expanded?=No/Yes | 502:1918 | | |
| Accordion / Chips | expanded × selected | 1242:16464 | | |
| Bottom Sheets | Style=Filter_Discover/Map_Info/Filter_MapSearch | 495:540 | | |
| Tooltip | 單一元件 | 8558:23555 | | |
| Accordion / CheckBox | Expanded × Selected | 7813:29373 | | |
| Tab | Active?=Yes/No × Size=Small/Medium/Large | 13518:14481 | | |

## Motion / 動效（storyboard 序列）

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| Motion / Transaction | 10 格 storyboard | 8512:7478 | | |
| Motion / Success | 3 格 storyboard | 4188:21162 | | |
| Spinner / On White | 8 格 storyboard | 12469:18532 | `SpinnerOnWhite` | `src/components/motion/SpinnerOnWhite/SpinnerOnWhite.tsx` |
| Spinner / On Dark | 8 格 storyboard | 12469:18955 | `SpinnerOnDark` | `src/components/motion/SpinnerOnDark/SpinnerOnDark.tsx` |

## Navigation / 導覽

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| Navigation Bar | state=activity/map/notify/member | 490:22853 | | |
| Search Bar | State=Default/Focused/Typing/Typed | 376:456 | | |
| App Bar | Type=nav/ProfileInfo | 495:426 | | |
| Bottom Bar | Type=Button/2 Buttons/Navigation/Place Order | 1480:37613 | | |
| CheckBox / Navigation | 單一元件 | 355:60400 | | |

## iOS System / 系統元件

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| Keyboard | 單一元件 | 1631:21178 | | |
| Keyboard - Numbers | 單一元件 | 6272:63852 | | |
| Home Indicator | 單一元件 | 367:21084 | | |
| Status bar / Default | 單一元件 | 309:5865 | | |

## Indicators / 指示器

| Figma 元件 | 變體 | node id | 對應程式碼元件 | 檔案路徑 |
|---|---|---|---|---|
| Progress Indicator | 進度=Choice/Method/Info | 1274:20052 | | |
| Badge | Attribute=Small/Large/Maximum × For=Accordion/Notification | 8233:6131 | | |
| Label | State=Open/Partial/Close/family | 9037:15126 | | |
| Payment Info | State=Selected/Unselected | 12561:16649 | | |
| Carousel Indicators | Background=White/Dark | 7297:14580 | | |
| Banner | Type=Default | 15301:14557 | | |
| Crowdedness | State=Comfortable/Partial Crowded/Crowded | 15975:7322 | | |
| Snackbar | 單一元件 | 16014:7927 | | |
| OfflineMap | Signal Missing=Some/Most × Expanded?=No/Yes | 16343:7890 | | |

## 沒有列進來的東西

- **utility / screen-header**：在每個 section 裡重複出現的 instance，看起來是這個 Component 頁面自己拿來標示每一排範例用的文件標題，不是產品 UI 元件，所以沒放進表裡。
- **Source**（Icons 區塊裡標註 icons.getbootstrap.com 的說明文字）：純文件註記，不是元件。
- Progressive Disclosure 區塊裡另一個具體內容的「Bottom Sheets」實例（帶有真實 Accordion/Segmented Controls 內容）：那是範例組合展示，不是元件定義本身，元件定義已經在上表列過一次。

## 怎麼用

1. 每寫好一個對應的程式碼元件，回來填上「對應程式碼元件」跟「檔案路徑」兩欄。
2. 存進 repo（例如 `docs/figma-mapping.md`），跟 tokens 一起管理版本。
3. node id 可以直接餵給 Figma 的 `get_design_context`（或任何支援 Figma Dev Mode 的工具）去產生該元件的參考程式碼／截圖，適合當作實作起點。
4. 之後如果團隊升級到 Organization/Enterprise 方案、有 Full 或 Dev seat，這張表可以直接轉成正式的 Code Connect CLI 映射。

# 台灣山林 App — Figma 盤點結果說明

這幾個檔案是從 `nXFkT45U8mDzUK5rUfL0eK`（【設計】台灣山林 App）盤點出來的素材：
- `design-tokens.json` / `design-tokens.css`：spacing、radius、color 三組現在都是完整、可直接使用的數值。
- `components-inventory.md`：已發布元件清單，作為手動 code mapping 表的起點（仍是抽樣，非保證完整）。

## 這次更新了什麼

你用 Figma 外掛匯出的 `Mode 1.tokens.json`（W3C Design Tokens 格式）補上了 color 的實際色碼。比對之後發現一件好消息：
之前用關鍵字搜尋抽樣抓到的 Green／Yellow／Gray 色階，剛好就是這個 collection 實際擁有的全部項目（例如 Primary Color 真的只有 Green-50/100/700/800/900 五階，不是中間缺號），所以色彩這部分現在等於是**完整**的，只是多補上一個之前沒抓到的 `Destruct-700`。

## 還剩什麼要注意

- **如果 Color collection 有多個 mode**（例如 Light / Dark 兩套），這次上傳的只是「Mode 1」。如果專案有用到其他 mode，記得也匯出那份 json 給我，我可以幫你併進同一個檔案，用 CSS 的 `[data-theme="dark"]` 或類似方式區分。
- **元件清單**（`components-inventory.md`）已經更新成完整版——直接讀了 Figma 裡「Component」頁面（node-id 12256:1743）底下所有 section，共 60 個元件，取代了原本的 11 個抽樣結果。

## 下一步

- `design-tokens.css` 可以直接 commit 進 repo 開始用。
- `design-tokens.json` 適合餵給 Style Dictionary，之後要加 iOS/Android 平台輸出也是從這份展開。
- `components-inventory.md` 每寫好一個對應元件就回來填欄位，長期取代正式 Code Connect 的角色。

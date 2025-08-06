# 🍽️ 使用說明

## 快速開始

### 本地開發
```bash
# 進入專案目錄
cd angular-launch

# 安裝依賴
npm install

# 啟動開發伺服器
ng serve

# 開啟瀏覽器
open http://localhost:4200
```

### 部署到生產環境
```bash
# 使用部署腳本
./deploy.sh

# 或手動建置
ng build --prod
```

## 功能使用

### 🎲 隨機抽獎
1. 點擊左側選單的「隨機選店」
2. 展開「選擇參與抽獎的店家」面板
3. 勾選想要參與的餐廳（預設全選）
4. 點擊「🎲 開始抽獎」按鈕
5. 觀看輪盤動畫
6. 查看抽獎結果
7. 點擊「查看地圖」前往餐廳

### 📋 店家清單
- 查看所有餐廳的詳細資訊
- 包含餐廳圖片和地圖連結
- 支援分頁瀏覽

### 📝 簡易清單
- 快速瀏覽所有餐廳名稱
- 一鍵前往 Google 地圖

## 自訂設定

### 新增餐廳
1. 編輯 `src/assets/store/store-list.ts`
2. 新增餐廳資料
3. 編輯 `src/assets/store/images.ts`
4. 新增對應圖片URL

### 修改樣式
- 主題色彩：`src/styles.css`
- 抽獎輪盤：`src/app/layouts/container/selected/selected.component.css`
- 整體佈局：`src/app/app.component.css`

## 常見問題

### Q: 圖片載入失敗怎麼辦？
A: 系統會自動使用預設圖片，請檢查圖片URL是否正確。

### Q: 如何修改抽獎動畫速度？
A: 在 `selected.component.ts` 中修改 `spinSpeed` 和 `maxSpins` 參數。

### Q: 如何部署到 GitHub Pages？
A: 使用提供的 GitHub Actions 工作流程，或手動將 `dist/` 內容推送到 `gh-pages` 分支。

### Q: 手機版本顯示有問題？
A: 檢查 CSS 媒體查詢設定，確保響應式設計正常運作。

## 技術支援

如有問題請在 GitHub Issues 中回報，或聯繫開發團隊。
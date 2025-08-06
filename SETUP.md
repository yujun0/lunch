# 🚀 快速設定指南

## 部署到 GitHub Pages

### 1. 更新倉庫設定
在 `.github/workflows/deploy.yml` 中，將 `lunch` 改成你的實際倉庫名稱：

```yaml
- name: 🔨 Build
  run: npx ng build --base-href="/你的倉庫名稱/"
```

### 2. 推送到 GitHub
```bash
git add .
git commit -m "🚀 Deploy lunch selector app"
git push origin main
```

### 3. 啟用 GitHub Pages
1. 前往你的 GitHub 倉庫
2. 點擊 Settings
3. 滾動到 Pages 區域
4. Source 選擇 "Deploy from a branch"
5. Branch 選擇 "gh-pages"
6. 點擊 Save

### 4. 等待部署完成
- GitHub Actions 會自動建置和部署
- 通常需要 2-5 分鐘
- 完成後可在 `https://你的用戶名.github.io/你的倉庫名/` 訪問

## 本地開發

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
ng serve
```

### 建置生產版本
```bash
ng build
```

## 自訂餐廳資料

編輯 `src/assets/store/store-list.ts` 來新增你的餐廳：

```typescript
{
  id: 13,
  name: '你的餐廳名稱',
  imageURL: '13',
  url: '餐廳圖片網址',
  google: 'Google地圖分享連結',
}
```

同時在 `src/assets/store/images.ts` 中新增：

```typescript
"13": "餐廳圖片網址"
```

## 故障排除

### 建置失敗
- 檢查 Node.js 版本 (建議 16+)
- 執行 `npm install` 重新安裝依賴
- 檢查 TypeScript 錯誤

### GitHub Pages 無法訪問
- 確認 GitHub Pages 已啟用
- 檢查 base-href 設定是否正確
- 等待 GitHub Actions 完成部署

### 圖片無法載入
- 檢查圖片 URL 是否有效
- 確認圖片支援 CORS
- 考慮使用 GitHub 或其他圖床服務

## 需要幫助？

在 GitHub Issues 中提出問題，我們會盡快回覆！
# 🚀 GitHub Pages 部署指南

## 🎯 問題解決：為什麼顯示 README 而不是應用程式？

GitHub Pages 預設顯示 README.md，但我們需要部署 Angular 應用程式。以下是兩種解決方案：

## 方法一：手動部署（推薦，最簡單）

### 1. 執行部署腳本
```bash
./deploy-manual.sh
```

這個腳本會：
- 自動建置你的 Angular 應用程式
- 創建 gh-pages 分支
- 將建置檔案推送到 gh-pages 分支

### 2. 設定 GitHub Pages
1. 前往你的 GitHub 倉庫
2. 點擊 **Settings**
3. 滾動到 **Pages** 區域
4. **Source** 選擇 "Deploy from a branch"
5. **Branch** 選擇 "gh-pages"
6. **Folder** 選擇 "/ (root)"
7. 點擊 **Save**

### 3. 等待部署
- 通常需要 2-5 分鐘
- 完成後可在 `https://你的用戶名.github.io/你的倉庫名/` 訪問

## 方法二：GitHub Actions 自動部署

### 1. 設定 GitHub Pages
1. 前往你的 GitHub 倉庫
2. 點擊 **Settings**
3. 滾動到 **Pages** 區域
4. **Source** 選擇 "GitHub Actions"

### 2. 推送程式碼
```bash
git add .
git commit -m "🚀 Setup GitHub Pages deployment"
git push origin main
```

### 3. 檢查 Actions
- 前往 **Actions** 標籤
- 查看部署狀態
- 等待綠色勾勾出現

### 4. 如果 Actions 失敗
常見問題和解決方案：
- **權限問題**：確保在 Settings > Actions > General 中啟用了 "Read and write permissions"
- **Pages 設定**：確保 Pages 來源設定為 "GitHub Actions"
- **分支問題**：確保推送到 main 或 master 分支

## 🔧 故障排除

### 問題：還是顯示 README
**解決方案：**
1. 確認 GitHub Pages 設定正確
2. 檢查是否選擇了正確的分支（gh-pages 或 GitHub Actions）
3. 等待幾分鐘讓 GitHub 更新

### 問題：404 錯誤
**解決方案：**
1. 檢查倉庫名稱是否正確
2. 確認 base-href 設定正確
3. 重新執行部署腳本

### 問題：CSS/JS 檔案載入失敗
**解決方案：**
1. 確認 base-href 包含正確的倉庫名稱
2. 檢查檔案路徑是否正確

## 📝 手動檢查清單

- [ ] 執行 `./deploy-manual.sh` 或推送到 main 分支
- [ ] GitHub Pages 設定為正確的來源
- [ ] 等待 2-5 分鐘讓部署完成
- [ ] 訪問 `https://你的用戶名.github.io/你的倉庫名/`

## 🆘 還是不行？

如果還是顯示 README，請：

1. **檢查 GitHub Pages 設定**：
   - Settings > Pages
   - 確認來源設定正確

2. **手動建置測試**：
   ```bash
   npx ng build --configuration production
   # 檢查 dist/kendo-angular-launch/ 是否有 index.html
   ```

3. **檢查分支**：
   ```bash
   git branch -a
   # 應該看到 gh-pages 分支
   ```

4. **強制重新部署**：
   ```bash
   ./deploy-manual.sh
   ```

## 🎉 成功後

你的午餐選擇應用程式將在以下網址可用：
`https://你的用戶名.github.io/你的倉庫名/`

記得把這個網址分享給朋友們！
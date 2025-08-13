# 🔧 故障排除指南

## GitHub Actions 部署問題

### 問題：Actions 失敗，顯示 "deprecated version" 錯誤
**解決方案：**
我們已經更新了 GitHub Actions 配置，使用最新版本的 actions。

### 問題：Actions 失敗，顯示權限錯誤
**解決方案：**
1. 前往 GitHub 倉庫
2. Settings > Actions > General
3. 在 "Workflow permissions" 區域選擇 "Read and write permissions"
4. 點擊 Save

### 問題：Actions 失敗，顯示 "Missing environment" 錯誤
**解決方案：**
這是 GitHub Pages 的新要求，我們已經在 GitHub Actions 配置中加入了 `environment` 設定。如果還是失敗：
1. 確保 GitHub Pages 已啟用
2. 在 Settings > Environments 中確認有 `github-pages` 環境
3. 或使用簡化版的部署配置 `deploy-simple.yml`

### 問題：GitHub Pages 無法訪問
**解決方案：**
1. 確保 GitHub Pages 已啟用：
   - Settings > Pages
   - Source 選擇正確的來源（GitHub Actions 或 gh-pages 分支）
2. 檢查倉庫是否為公開（私有倉庫需要 GitHub Pro）
3. 等待 2-5 分鐘讓 GitHub 處理部署

## 手動部署問題

### 問題：`ng` 命令找不到
**解決方案：**
```bash
# 使用 npx 代替
npx ng build

# 或全域安裝 Angular CLI
npm install -g @angular/cli
```

### 問題：建置失敗
**解決方案：**
1. 確保依賴已安裝：
   ```bash
   npm install
   ```
2. 清除快取：
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### 問題：部署腳本權限錯誤
**解決方案：**
```bash
chmod +x deploy-manual.sh
./deploy-manual.sh
```

## 應用程式功能問題

### 問題：店家管理功能無法使用
**解決方案：**
1. 檢查瀏覽器是否支援 localStorage
2. 清除瀏覽器快取和 localStorage：
   ```javascript
   // 在瀏覽器控制台執行
   localStorage.clear();
   location.reload();
   ```

### 問題：選店動畫不運作
**解決方案：**
1. 確保至少選擇了一家店家
2. 檢查瀏覽器控制台是否有 JavaScript 錯誤
3. 重新整理頁面

### 問題：圖片或樣式載入失敗
**解決方案：**
1. 檢查網路連線
2. 確保 base-href 設定正確
3. 清除瀏覽器快取

## 開發環境問題

### 問題：`npm install` 失敗
**解決方案：**
1. 更新 Node.js 到最新 LTS 版本
2. 清除 npm 快取：
   ```bash
   npm cache clean --force
   ```
3. 刪除 node_modules 重新安裝：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 問題：開發伺服器無法啟動
**解決方案：**
1. 檢查端口是否被佔用：
   ```bash
   lsof -ti:4200
   kill -9 <PID>
   ```
2. 使用不同端口：
   ```bash
   ng serve --port 4201
   ```

## 聯繫支援

如果以上解決方案都無法解決問題，請：

1. **檢查 GitHub Issues**：查看是否有類似問題
2. **創建新 Issue**：提供詳細的錯誤訊息和重現步驟
3. **包含環境資訊**：
   - 作業系統版本
   - Node.js 版本 (`node --version`)
   - npm 版本 (`npm --version`)
   - 瀏覽器版本

## 常用命令

```bash
# 檢查版本
node --version
npm --version
ng version

# 清除快取
npm cache clean --force
ng cache clean

# 重新安裝依賴
rm -rf node_modules package-lock.json
npm install

# 建置和部署
npm run build
./deploy-manual.sh

# 本地開發
npm start
# 或
ng serve
```
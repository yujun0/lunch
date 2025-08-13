# 🔧 部署問題快速修復

## 問題：GitHub Actions 顯示 "Missing environment" 錯誤

### 解決方案 1：使用修復後的主要配置

我已經修復了 `.github/workflows/deploy.yml`，現在包含了必要的 `environment` 設定。

推送這次更新後應該就能正常部署：

```bash
git add .
git commit -m "🔧 修復 GitHub Actions environment 問題"
git push origin main
```

### 解決方案 2：使用簡化版部署（備用方案）

如果主要配置還是有問題，可以：

1. **停用主要配置**：
   ```bash
   mv .github/workflows/deploy.yml .github/workflows/deploy.yml.backup
   ```

2. **啟用簡化版**：
   ```bash
   mv .github/workflows/deploy-simple.yml .github/workflows/deploy.yml
   ```

3. **推送更改**：
   ```bash
   git add .
   git commit -m "🔧 使用簡化版部署配置"
   git push origin main
   ```

### 解決方案 3：手動部署

如果 GitHub Actions 還是有問題，使用手動部署：

```bash
./deploy-manual.sh
```

## 檢查清單

- [ ] GitHub Pages 已啟用（Settings > Pages）
- [ ] Pages 來源設定為 "GitHub Actions"
- [ ] Workflow permissions 設定為 "Read and write permissions"
- [ ] 倉庫是公開的（或有 GitHub Pro）

## 常見錯誤

### 錯誤：`HttpError: Missing environment`
**原因**：GitHub Pages v4 需要明確的 environment 設定
**解決**：使用修復後的配置或簡化版配置

### 錯誤：`Permission denied`
**原因**：Workflow 權限不足
**解決**：Settings > Actions > General > Workflow permissions > Read and write permissions

### 錯誤：`Resource not accessible by integration`
**原因**：GitHub Pages 未啟用或設定錯誤
**解決**：Settings > Pages > Source: GitHub Actions

## 測試部署

部署成功後，你的網站將在以下網址可用：
`https://你的用戶名.github.io/你的倉庫名/`

通常需要 2-5 分鐘才能看到更新。
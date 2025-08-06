#!/bin/bash

# 午餐吃什麼 - 部署腳本

echo "🍽️ 開始部署午餐選擇應用程式..."

# 安裝依賴
echo "📦 安裝依賴..."
npm install

# 建置專案
echo "🔨 建置專案..."
ng build --prod

# 檢查建置結果
if [ $? -eq 0 ]; then
    echo "✅ 建置成功！"
    echo "📁 建置檔案位於 dist/ 目錄"
    echo "🚀 可以將 dist/ 目錄內容部署到任何靜態網站託管服務"
    echo ""
    echo "部署選項："
    echo "1. GitHub Pages: 將 dist/ 內容推送到 gh-pages 分支"
    echo "2. Netlify: 將 dist/ 目錄拖拽到 Netlify"
    echo "3. Vercel: 連接 GitHub 倉庫自動部署"
    echo ""
    echo "🎉 部署完成！享受你的午餐選擇應用程式吧！"
else
    echo "❌ 建置失敗，請檢查錯誤訊息"
    exit 1
fi
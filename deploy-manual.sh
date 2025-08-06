#!/bin/bash

# 手動部署到 GitHub Pages 的腳本

echo "🍽️ 開始手動部署午餐選擇應用程式..."

# 獲取倉庫名稱
REPO_NAME=$(basename `git rev-parse --show-toplevel`)
echo "📁 倉庫名稱: $REPO_NAME"

# 建置專案
echo "🔨 建置專案..."
npx ng build --configuration production --base-href="/$REPO_NAME/"

if [ $? -ne 0 ]; then
    echo "❌ 建置失敗"
    exit 1
fi

# 檢查是否有 gh-pages 分支
echo "🌿 檢查 gh-pages 分支..."
git show-ref --verify --quiet refs/heads/gh-pages
if [ $? -ne 0 ]; then
    echo "📝 創建 gh-pages 分支..."
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout main
fi

# 切換到 gh-pages 分支
echo "🔄 切換到 gh-pages 分支..."
git checkout gh-pages

# 清理舊檔案（保留 .git）
echo "🧹 清理舊檔案..."
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# 複製新建置的檔案
echo "📋 複製建置檔案..."
cp -r dist/kendo-angular-launch/* .

# 提交並推送
echo "📤 提交並推送..."
git add .
git commit -m "🚀 Deploy $(date)"
git push origin gh-pages

# 切換回主分支
git checkout main

echo "✅ 部署完成！"
echo "🌐 你的網站將在幾分鐘後可在以下網址訪問："
echo "   https://$(git config user.name | tr '[:upper:]' '[:lower:]').github.io/$REPO_NAME/"
echo ""
echo "📝 請確保在 GitHub 倉庫設定中啟用 GitHub Pages："
echo "   Settings > Pages > Source: Deploy from a branch > Branch: gh-pages"
#!/bin/bash

# 手動部署到 GitHub Pages 的腳本

echo "🍽️ 開始手動部署午餐選擇應用程式..."

# 檢查是否在 git 倉庫中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ 錯誤：不在 git 倉庫中"
    exit 1
fi

# 獲取倉庫名稱
REPO_NAME=$(basename `git rev-parse --show-toplevel`)
echo "📁 倉庫名稱: $REPO_NAME"

# 確保在主分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "⚠️  警告：不在 main/master 分支，當前分支：$CURRENT_BRANCH"
    read -p "是否繼續？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 檢查是否有未提交的變更
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  警告：有未提交的變更"
    read -p "是否先提交變更？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "🚀 準備部署"
    fi
fi

# 建置專案
echo "🔨 建置專案..."
if command -v npx &> /dev/null; then
    npx ng build --base-href="/$REPO_NAME/"
else
    echo "❌ 找不到 npx，請確保已安裝 Node.js"
    exit 1
fi

if [ $? -ne 0 ]; then
    echo "❌ 建置失敗"
    exit 1
fi

# 檢查建置輸出
if [ ! -d "dist/kendo-angular-launch" ]; then
    echo "❌ 建置輸出目錄不存在"
    exit 1
fi

# 儲存當前分支
ORIGINAL_BRANCH=$CURRENT_BRANCH

# 檢查是否有 gh-pages 分支
echo "🌿 檢查 gh-pages 分支..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📝 gh-pages 分支已存在"
else
    echo "📝 創建 gh-pages 分支..."
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout $ORIGINAL_BRANCH
fi

# 切換到 gh-pages 分支
echo "🔄 切換到 gh-pages 分支..."
git checkout gh-pages

# 清理舊檔案（保留 .git 和 .gitignore）
echo "🧹 清理舊檔案..."
find . -maxdepth 1 ! -name '.git*' ! -name '.' -exec rm -rf {} \; 2>/dev/null || true

# 複製新建置的檔案
echo "📋 複製建置檔案..."
cp -r dist/kendo-angular-launch/* .

# 創建 .nojekyll 檔案（GitHub Pages 需要）
touch .nojekyll

# 提交並推送
echo "📤 提交並推送..."
git add .
git commit -m "🚀 Deploy $(date '+%Y-%m-%d %H:%M:%S')"

if git push origin gh-pages; then
    echo "✅ 推送成功！"
else
    echo "❌ 推送失敗，請檢查網路連線和權限"
    git checkout $ORIGINAL_BRANCH
    exit 1
fi

# 切換回原分支
git checkout $ORIGINAL_BRANCH

echo ""
echo "🎉 部署完成！"
echo "🌐 你的網站將在 2-5 分鐘後可在以下網址訪問："
echo "   https://$(git config user.name | tr '[:upper:]' '[:lower:]').github.io/$REPO_NAME/"
echo ""
echo "📝 請確保在 GitHub 倉庫設定中啟用 GitHub Pages："
echo "   Settings > Pages > Source: Deploy from a branch > Branch: gh-pages"
echo ""
echo "🔍 如果網站無法訪問，請檢查："
echo "   1. GitHub Pages 設定是否正確"
echo "   2. 倉庫是否為公開（或有 GitHub Pro）"
echo "   3. 等待幾分鐘讓 GitHub 處理部署"
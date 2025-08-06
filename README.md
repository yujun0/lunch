# 🍽️ 午餐吃什麼 - 隨機選店應用程式

一個幫助你決定午餐要吃什麼的有趣應用程式！使用炫酷的輪盤動畫來隨機選擇餐廳，讓選擇困難症患者不再煩惱！

## 🎯 線上體驗

**[🚀 立即體驗](https://yujun0.github.io/lunch/)**

> 📝 **設定提醒**：請參考 [SETUP.md](SETUP.md) 來設定你的 GitHub Pages 部署

## ✨ 最新改進 (2025年版本)

### 🎯 全新功能特色
- **🎲 炫酷輪盤抽獎** - 全新設計的動畫輪盤，帶來真實的抽獎體驗
- **📱 完美響應式** - 針對手機和桌面完全優化的使用體驗
- **🎨 現代化設計** - 漸層背景、圓角設計、流暢動畫效果
- **⚡ 智能動畫** - 逐漸減速的輪盤效果，增加緊張感和期待感
- **🏪 靈活店家管理** - 可自由選擇參與抽獎的餐廳
- **🗺️ 一鍵導航** - 直接連結 Google 地圖，立即前往用餐

### 🔧 技術改進
- **重構程式碼結構** - 更清晰的組件架構和類型安全
- **優化動畫性能** - 流暢的CSS動畫和JavaScript控制
- **改善錯誤處理** - 圖片載入失敗的優雅降級
- **增強可維護性** - 模組化設計，易於擴展和修改

## 🚀 快速開始

### 環境需求
- Node.js 14+
- Angular CLI 13+

### 安裝與運行
```bash
# 克隆專案
git clone https://github.com/yujun0/lunch.git
cd lunch

# 安裝依賴
npm install

# 啟動開發伺服器
ng serve

# 開啟瀏覽器前往
http://localhost:4200
```

### 建置部署
```bash
# 建置生產版本
ng build --prod

# 建置檔案位於 dist/ 目錄
```

## 📱 使用指南

### 🎯 隨機抽獎模式
1. **選擇參與店家** - 展開店家清單，勾選想要參與抽獎的餐廳
2. **開始抽獎** - 點擊「🎲 開始抽獎」按鈕
3. **觀看輪盤** - 享受炫酷的輪盤轉動動畫，感受抽獎的刺激
4. **查看結果** - 輪盤停止後顯示中獎餐廳
5. **前往用餐** - 點擊「查看地圖」直接導航到餐廳

### 📋 其他功能
- **店家清單** - 查看所有餐廳的詳細資訊和圖片
- **簡易清單** - 快速瀏覽所有餐廳名稱和地圖連結
- **關於頁面** - 了解應用程式的更多資訊

## 🏪 自訂餐廳資料

### 新增餐廳
編輯 `src/assets/store/store-list.ts`：
```typescript
{
  id: 13,
  name: '新餐廳名稱',
  imageURL: '13',
  url: '餐廳圖片網址',
  google: 'Google地圖分享連結',
}
```

編輯 `src/assets/store/images.ts`：
```typescript
"13": "餐廳圖片網址"
```

### 圖片建議
- 建議使用 16:9 或 1:1 比例的圖片
- 圖片大小建議在 500KB 以下
- 支援 JPG、PNG、WebP 格式

## 🛠️ 技術架構

### 前端技術棧
- **Angular 13** - 現代化前端框架
- **TypeScript** - 類型安全的JavaScript
- **Kendo UI for Angular** - 專業UI組件庫
- **Bootstrap 5** - 響應式CSS框架
- **CSS3 動畫** - 流暢的視覺效果

### 專案結構
```
src/
├── app/
│   ├── layouts/
│   │   ├── container/
│   │   │   ├── selected/     # 隨機抽獎組件
│   │   │   ├── storelist/    # 店家清單組件
│   │   │   ├── simplelist/   # 簡易清單組件
│   │   │   └── about/        # 關於頁面組件
│   │   └── footer/           # 頁尾組件
│   └── app.component.*       # 主應用程式組件
├── assets/
│   └── store/
│       ├── store-list.ts     # 餐廳資料
│       ├── images.ts         # 圖片對應表
│       └── images/           # 本地圖片資源
└── styles.css                # 全域樣式
```

## 📦 部署選項

### GitHub Pages
```bash
ng build --prod --base-href="/your-repo-name/"
# 將 dist/ 內容推送到 gh-pages 分支
```

### Netlify
```bash
ng build --prod
# 將 dist/ 目錄拖拽到 Netlify 部署
```

### Vercel
```bash
ng build --prod
# 連接 GitHub 倉庫自動部署
```

## 🎨 自訂樣式

### 主要樣式檔案
- `src/app/layouts/container/selected/selected.component.css` - 抽獎輪盤樣式
- `src/styles.css` - 全域樣式和主題
- `src/app/app.component.css` - 應用程式佈局樣式

### 自訂主題色彩
在 `src/styles.css` 中修改 CSS 變數：
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(45deg, #ff6b6b, #feca57);
}
```

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 開發流程
1. Fork 這個專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 報告問題
請在 GitHub Issues 中詳細描述：
- 問題重現步驟
- 預期行為
- 實際行為
- 瀏覽器和版本資訊

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

感謝所有為這個專案做出貢獻的開發者和使用者！

---

**讓選擇午餐變得有趣！** 🎉

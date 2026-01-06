# 🍽️ 午餐吃什麼 - 隨機選店應用程式

一個幫助你決定午餐要吃什麼的有趣應用程式！使用炫酷的輪盤動畫來隨機選擇餐廳，讓選擇困難症患者不再煩惱！

## 🎯 線上體驗

**[🚀 立即體驗](https://yujun0.github.io/lunch/)**

> 📝 **設定提醒**：請參考 [SETUP.md](SETUP.md) 來設定你的 GitHub Pages 部署

## ✨ 最新改進 (2025年版本)

### 🎯 全新功能特色
- **🎯 智能選店動畫** - 從慢到快的選店動畫，最後定格在選中的店家
- **📱 完美響應式** - 針對手機和桌面完全優化的使用體驗
- **🎨 現代化設計** - 漸層背景、圓角設計、流暢動畫效果
- **⚡ 智能動畫** - 逐漸減速的輪盤效果，增加緊張感和期待感
- **🏪 靈活店家管理** - 可自由選擇參與選店的餐廳
- **🗺️ 一鍵導航** - 直接連結 Google 地圖，立即前往用餐

### 🔧 技術改進
- **重構程式碼結構** - 更清晰的組件架構和類型安全
- **優化動畫性能** - 流暢的CSS動畫和JavaScript控制
- **移除圖片依賴** - 使用文字和 emoji 設計，更好維護
- **智能視覺配對** - 根據店家類型自動配對 emoji 和漸層色彩
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

### 🎯 隨機選店模式
1. **選擇參與店家** - 展開店家清單，勾選想要參與選店的餐廳
2. **開始選店** - 點擊「🍽️ 開始選店」按鈕
3. **觀看動畫** - 享受從慢到快的選店動畫，最後定格在選中的店家
4. **查看結果** - 動畫停止後顯示選中的餐廳
5. **前往用餐** - 點擊「查看地圖」直接導航到餐廳

### 📋 其他功能
- **店家清單** - 查看所有餐廳的詳細資訊，支援分頁瀏覽
- **簡易清單** - 快速瀏覽所有餐廳名稱和地圖連結
- **🛠️ 店家管理** - 網頁版管理介面，輕鬆新增、編輯、刪除店家
- **關於頁面** - 了解應用程式的更多資訊

## 🏪 自訂餐廳資料

### 🛠️ 網頁管理介面（推薦）
現在你可以直接在網頁上管理店家，不需要修改程式碼！

1. **點擊「店家管理」** - 進入管理介面
2. **新增店家** - 填寫表單，即時預覽效果
3. **編輯店家** - 修改現有店家資訊
4. **刪除店家** - 移除不存在的店家
5. **資料備份** - 匯出/匯入 JSON 檔案

### 手動編輯（進階用戶）
編輯 `src/assets/store/store-list.ts`：
```typescript
{
  id: 13,
  name: '新餐廳名稱',
  type: 'noodle', // 店家類型：noodle, rice, local, soup, korean, bento, vietnamese, buffet
  google: 'Google地圖分享連結',
}
```

### 店家類型與視覺效果
系統會根據 `type` 自動配對相應的 emoji 和漂亮的漸層背景：
- `noodle` 🍜 - 粉紅漸層
- `rice` 🍚 - 藍綠漸層  
- `local` 🏮 - 橙色漸層
- `soup` 🍲 - 紫色漸層
- `korean` 🥢 - 紅粉漸層
- `bento` 🍱 - 藍色漸層
- `vietnamese` 🥢 - 綠色漸層
- `buffet` 🍽️ - 黃粉漸層

### 優點
- **零維護成本** - 不需要管理圖片檔案
- **載入速度快** - 純文字和 CSS，秒開
- **自動美化** - 系統自動配色，永遠好看
- **易於擴展** - 新增餐廳只需要填寫基本資訊

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
│   │   │   ├── selected/     # 隨機選店組件
│   │   │   ├── storelist/    # 店家清單組件
│   │   │   ├── simplelist/   # 簡易清單組件
│   │   │   └── about/        # 關於頁面組件
│   │   └── footer/           # 頁尾組件
│   └── app.component.*       # 主應用程式組件
├── assets/
│   └── store/
│       ├── store-list.ts     # 餐廳資料
│       └── store-visual.ts   # 視覺配置（emoji + 漸層色彩）
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
- `src/app/layouts/container/selected/selected.component.css` - 選店動畫樣式
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

**讓選擇午餐變得有趣！** 🎉

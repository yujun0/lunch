// 店家視覺呈現配置

export interface StoreVisual {
  emoji: string;
  gradient: string;
  textColor: string;
}

// 根據店家類型自動配對 emoji 和顏色
export const storeVisualMap: { [key: string]: StoreVisual } = {
  noodle: {
    emoji: '🍜',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    textColor: '#fff'
  },
  rice: {
    emoji: '🍚',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    textColor: '#fff'
  },
  local: {
    emoji: '🏮',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    textColor: '#fff'
  },
  soup: {
    emoji: '🍲',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#fff'
  },
  korean: {
    emoji: '🥢',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#fff'
  },
  bento: {
    emoji: '🍱',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: '#fff'
  },
  vietnamese: {
    emoji: '🥢',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    textColor: '#fff'
  },
  buffet: {
    emoji: '🍽️',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    textColor: '#fff'
  },
  default: {
    emoji: '🍴',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#fff'
  }
};

// 預定義的漂亮漸層色彩（如果不想用類型分類）
export const gradientColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  'linear-gradient(135deg, #48cae4 0%, #023e8a 100%)',
  'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
  'linear-gradient(135deg, #06ffa5 0%, #0077b6 100%)'
];

// 獲取店家的視覺配置
export function getStoreVisual(storeType: string, storeId: number): StoreVisual {
  // 優先使用類型配對
  if (storeVisualMap[storeType]) {
    return storeVisualMap[storeType];
  }
  
  // 如果沒有對應類型，使用 ID 來選擇漂亮的漸層色
  const colorIndex = (storeId - 1) % gradientColors.length;
  return {
    emoji: '🍴',
    gradient: gradientColors[colorIndex],
    textColor: '#fff'
  };
}

// 獲取店名第一個字
export function getStoreInitial(storeName: string): string {
  return storeName.charAt(0);
}
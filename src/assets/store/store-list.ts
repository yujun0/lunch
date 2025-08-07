export interface Store {
  id: number;
  name: string;
  type: string; // 店家類型，用來自動配對 emoji
  google: string;
  isSelected?: boolean;
}

export const storeList: Store[] = [
  {
    id: 1,
    name: '劉小籠麵食館',
    type: 'noodle',
    google: 'https://goo.gl/maps/7FKdbuRMJncmtMtT8',
  },
  {
    id: 2,
    name: '二代福林福州乾拌麵',
    type: 'noodle',
    google: 'https://goo.gl/maps/3c1Ayr73X2tra6kc7',
  },
  {
    id: 3,
    name: '老哥（雞肉飯·乾拌麵）',
    type: 'rice',
    google: 'https://goo.gl/maps/GEkgRpQRdxg98JvQ8',
  },
  {
    id: 4,
    name: '巢飯麵食館',
    type: 'rice',
    google: 'https://goo.gl/maps/xZQShd55SK8ktvY68',
  },
  {
    id: 5,
    name: '劉記客家小吃',
    type: 'local',
    google: 'https://goo.gl/maps/Gt7LgkkGGBMYfGhS7',
  },
  {
    id: 6,
    name: '港都旗魚米粉湯',
    type: 'soup',
    google: 'https://goo.gl/maps/MgGd8mYj2pRMsT6L6',
  },
  {
    id: 7,
    name: '韓明屋',
    type: 'korean',
    google: 'https://goo.gl/maps/a6dVXmGVWmR2oZf48',
  },
  {
    id: 8,
    name: '味家魯肉飯',
    type: 'rice',
    google: 'https://goo.gl/maps/4dcg1ZpDvDuPtTAh7',
  },
  {
    id: 9,
    name: '鳳姐快餐便當',
    type: 'bento',
    google: 'https://goo.gl/maps/dzBYRgGCyTQSYxAa9',
  },
  {
    id: 10,
    name: '越南河粉',
    type: 'vietnamese',
    google: 'https://goo.gl/maps/B65xwsZVKpqky5TQA',
  },
  {
    id: 11,
    name: '飯點台式自助餐',
    type: 'buffet',
    google: 'https://goo.gl/maps/gBPn4EzFDD8fm2G26',
  },
  {
    id: 12,
    name: '寶玉牛肉麵&自助餐',
    type: 'noodle',
    google: 'https://goo.gl/maps/ZCiW8LbUC9bW8bBq7',
  }
];

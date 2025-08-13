export interface Store {
  id: number;
  name: string;
  type: string; // 店家類型，用來自動配對 emoji
  google: string;
  isSelected?: boolean;
}

export const storeList: Store[] = [
  {
    "id": 1,
    "name": "二代福林福州乾拌麵",
    "type": "noodle",
    "google": "https://goo.gl/maps/3c1Ayr73X2tra6kc7"
  },
  {
    "id": 2,
    "name": "巢飯麵食館",
    "type": "rice",
    "google": "https://goo.gl/maps/xZQShd55SK8ktvY68"
  },
  {
    "id": 3,
    "name": "劉記客家小吃",
    "type": "noodle",
    "google": "https://goo.gl/maps/Gt7LgkkGGBMYfGhS7"
  },
  {
    "id": 4,
    "name": "港都旗魚米粉湯",
    "type": "soup",
    "google": "https://goo.gl/maps/MgGd8mYj2pRMsT6L6"
  },
  {
    "id": 5,
    "name": "韓明屋",
    "type": "korean",
    "google": "https://goo.gl/maps/a6dVXmGVWmR2oZf48"
  },
  {
    "id": 6,
    "name": "味家魯肉飯",
    "type": "rice",
    "google": "https://goo.gl/maps/4dcg1ZpDvDuPtTAh7"
  },
  {
    "id": 7,
    "name": "鳳姐快餐便當",
    "type": "bento",
    "google": "https://goo.gl/maps/dzBYRgGCyTQSYxAa9"
  },
  {
    "id": 8,
    "name": "雞肉本家",
    "type": "rice",
    "google": "https://maps.app.goo.gl/byWUYsHZLejegFyW8"
  },
  {
    "id": 9,
    "name": "森小館",
    "type": "rice",
    "google": "https://maps.app.goo.gl/D6pF3m4KYAWRq7sq9"
  },
  {
    "id": 10,
    "name": "飯丸屋",
    "type": "local",
    "google": "https://maps.app.goo.gl/ECTBMZUimCo1CVsu6"
  },
  {
    "id": 11,
    "name": "文創飲食亭",
    "type": "local",
    "google": "https://maps.app.goo.gl/36TfPSM7mC7PDonN6"
  },
  {
    "id": 12,
    "name": "八方雲集",
    "type": "noodle",
    "google": "https://maps.app.goo.gl/MVswZvVrBrG4DFmT7"
  },
  {
    "id": 13,
    "name": "給力盒子",
    "type": "rice",
    "google": "https://maps.app.goo.gl/7TTKFxfd5xgGeZnh8"
  },
  {
    "id": 14,
    "name": "凱琳蛋餅",
    "type": "local",
    "google": "https://maps.app.goo.gl/sDLCtY3czv1Q8Fod7"
  },
  {
    "id": 15,
    "name": "沃可奧",
    "type": "rice",
    "google": "https://maps.app.goo.gl/3J8YKyoFjXGvmZw1A"
  },
  {
    "id": 16,
    "name": "安好食",
    "type": "noodle",
    "google": "https://maps.app.goo.gl/irvUqJiSmenS5QkPA"
  },
  {
    "id": 17,
    "name": "湯餅鋪",
    "type": "rice",
    "google": "https://maps.app.goo.gl/kMxe7b5Avf3Xjekb6"
  },
  {
    "id": 18,
    "name": "楊國福麻辣燙",
    "type": "local",
    "google": "https://maps.app.goo.gl/Z2tsd8HCmAaw7V4a7"
  },
  {
    "id": 19,
    "name": "poke+",
    "type": "local",
    "google": "https://maps.app.goo.gl/WCPEXGLxcrNbdqwt5"
  },
  {
    "id": 20,
    "name": "SCOTT 奶酪炸雞",
    "type": "local",
    "google": "https://maps.app.goo.gl/vppdAURGuce6zvJb9"
  }
];

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/assets/store/store-list';
import { getStoreVisual, getStoreInitial, StoreVisual } from 'src/assets/store/store-visual';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {
  title = '店家管理';
  stores: Store[] = [];
  
  // 表單相關
  showAddForm = false;
  editingStore: Store | null = null;
  
  // 訂閱
  private storeSubscription: Subscription = new Subscription();
  
  // 新增/編輯表單資料
  formData: Partial<Store> = {
    name: '',
    type: 'noodle',
    google: ''
  };
  
  // 店家類型選項
  storeTypes = [
    { value: 'noodle', label: '🍜 麵食類', description: '各式麵條、拉麵、湯麵' },
    { value: 'rice', label: '🍚 飯食類', description: '炒飯、燴飯、蓋飯' },
    { value: 'local', label: '🏮 在地小吃', description: '傳統小吃、夜市美食' },
    { value: 'soup', label: '🍲 湯品類', description: '湯品、火鍋、燉品' },
    { value: 'korean', label: '🥢 韓式料理', description: '韓式烤肉、泡菜、石鍋' },
    { value: 'bento', label: '🍱 便當類', description: '便當、快餐、外帶' },
    { value: 'vietnamese', label: '🥢 越南料理', description: '河粉、春捲、越式料理' },
    { value: 'buffet', label: '🍽️ 自助餐', description: '自助餐、吃到飽' }
  ];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeSubscription = this.storeService.stores$.subscribe(stores => {
      this.stores = stores;
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  // 獲取店家視覺配置
  getStoreVisual(store: Store): StoreVisual {
    return getStoreVisual(store.type, store.id);
  }

  // 獲取店名第一個字
  getStoreInitial(store: Store): string {
    return getStoreInitial(store.name);
  }

  // 顯示新增表單
  showAddStoreForm(): void {
    this.showAddForm = true;
    this.editingStore = null;
    this.resetForm();
  }

  // 顯示編輯表單
  editStore(store: Store): void {
    this.editingStore = store;
    this.showAddForm = true;
    this.formData = { ...store };
  }

  // 重置表單
  resetForm(): void {
    this.formData = {
      name: '',
      type: 'noodle',
      google: ''
    };
  }

  // 取消編輯
  cancelEdit(): void {
    this.showAddForm = false;
    this.editingStore = null;
    this.resetForm();
  }

  // 儲存店家（新增或編輯）
  saveStore(): void {
    if (!this.formData.name?.trim()) {
      alert('請輸入店家名稱');
      return;
    }

    if (!this.formData.google?.trim()) {
      alert('請輸入 Google 地圖連結');
      return;
    }

    if (this.editingStore) {
      // 編輯現有店家
      const updatedStore: Store = {
        ...this.editingStore,
        name: this.formData.name!.trim(),
        type: this.formData.type!,
        google: this.formData.google!.trim()
      };
      this.storeService.updateStore(updatedStore);
    } else {
      // 新增店家
      const newStore = {
        name: this.formData.name!.trim(),
        type: this.formData.type!,
        google: this.formData.google!.trim()
      };
      this.storeService.addStore(newStore);
    }

    this.cancelEdit();
  }

  // 刪除店家
  deleteStore(store: Store): void {
    const confirmDelete = confirm(`確定要刪除「${store.name}」嗎？`);
    if (confirmDelete) {
      this.storeService.deleteStore(store.id);
    }
  }

  // 重置為預設資料
  resetToDefault(): void {
    const confirmReset = confirm('確定要重置為預設店家資料嗎？這將清除所有自訂修改。');
    if (confirmReset) {
      this.storeService.resetToDefault();
    }
  }

  // 匯出資料
  exportData(): void {
    const dataStr = JSON.stringify(this.stores, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stores-data.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  // 匯入資料
  importData(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedStores = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedStores)) {
            this.storeService.updateStores(importedStores);
            alert('資料匯入成功！');
          } else {
            alert('檔案格式錯誤');
          }
        } catch (error) {
          alert('檔案讀取失敗');
        }
      };
      reader.readAsText(file);
    }
  }

  // 前往Google地圖
  goToGoogleMaps(googleUrl: string): void {
    if (googleUrl) {
      window.open(googleUrl, '_blank');
    }
  }

  // 獲取店家類型標籤
  getStoreTypeLabel(type: string): string {
    const storeType = this.storeTypes.find(t => t.value === type);
    return storeType ? storeType.label.substring(2) : '美食';
  }

  // 獲取預覽視覺效果
  getPreviewVisual(): StoreVisual {
    if (!this.formData.name || !this.formData.type) {
      return { emoji: '🍴', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#fff' };
    }
    return getStoreVisual(this.formData.type, 0);
  }

  // 獲取預覽第一個字
  getPreviewInitial(): string {
    if (!this.formData.name) return '';
    return this.formData.name.charAt(0);
  }

  // 獲取特定類型的店家數量
  getStoreCountByType(type: string): number {
    return this.stores.filter(s => s.type === type).length;
  }
}
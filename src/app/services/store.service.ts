import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { storeList, Store } from 'src/assets/store/store-list';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storesSubject = new BehaviorSubject<Store[]>([]);
  public stores$ = this.storesSubject.asObservable();

  constructor() {
    this.loadStores();
    // 監聽 localStorage 變化
    window.addEventListener('storesUpdated', (event: any) => {
      this.storesSubject.next(event.detail);
    });
  }

  // 載入店家資料
  private loadStores(): void {
    const savedStores = localStorage.getItem('customStores');
    if (savedStores) {
      try {
        const stores = JSON.parse(savedStores);
        this.storesSubject.next(stores);
      } catch (error) {
        console.error('Failed to parse saved stores:', error);
        this.storesSubject.next([...storeList]);
      }
    } else {
      this.storesSubject.next([...storeList]);
    }
  }

  // 獲取當前店家列表
  getStores(): Store[] {
    return this.storesSubject.value;
  }

  // 更新店家列表
  updateStores(stores: Store[]): void {
    localStorage.setItem('customStores', JSON.stringify(stores));
    this.storesSubject.next(stores);
    window.dispatchEvent(new CustomEvent('storesUpdated', { detail: stores }));
  }

  // 新增店家
  addStore(store: Omit<Store, 'id'>): void {
    const stores = this.getStores();
    const newId = Math.max(...stores.map(s => s.id), 0) + 1;
    const newStore: Store = { ...store, id: newId };
    stores.push(newStore);
    this.updateStores(stores);
  }

  // 更新店家
  updateStore(updatedStore: Store): void {
    const stores = this.getStores();
    const index = stores.findIndex(s => s.id === updatedStore.id);
    if (index !== -1) {
      stores[index] = updatedStore;
      this.updateStores(stores);
    }
  }

  // 刪除店家
  deleteStore(storeId: number): void {
    const stores = this.getStores().filter(s => s.id !== storeId);
    this.updateStores(stores);
  }

  // 重置為預設資料
  resetToDefault(): void {
    localStorage.removeItem('customStores');
    this.storesSubject.next([...storeList]);
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/assets/store/store-list';
import { getStoreVisual, getStoreInitial, StoreVisual } from 'src/assets/store/store-visual';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simplelist',
  templateUrl: './simplelist.component.html',
  styleUrls: ['./simplelist.component.css']
})
export class SimplelistComponent implements OnInit, OnDestroy {
  title = '店家簡易清單';
  storeList: Store[] = [];
  
  private storeSubscription: Subscription = new Subscription();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeSubscription = this.storeService.stores$.subscribe(stores => {
      this.storeList = stores;
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

  // 前往Google地圖
  goToGoogleMaps(googleUrl: string): void {
    if (googleUrl) {
      window.open(googleUrl, '_blank');
    }
  }
}
import { Store } from './../../../../assets/store/store-list';
import { getStoreVisual, getStoreInitial, StoreVisual } from 'src/assets/store/store-visual';
import { StoreService } from 'src/app/services/store.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-storelist',
  templateUrl: './storelist.component.html',
  styleUrls: ['./storelist.component.css'],
})
export class StorelistComponent implements OnInit, OnDestroy {

  title = '店家清單';
  gridView!: GridDataResult;
  skip = 0;
  storeList: Store[] = [];
  pageSize = 9; // Changed to 9 for 3x3 grid
  Math = Math; // Make Math available in template

  private storeSubscription: Subscription = new Subscription();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeSubscription = this.storeService.stores$.subscribe(stores => {
      this.storeList = stores;
      this.loadstoreList();
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadstoreList();
  }

  onPageChange(newSkip: number): void {
    this.skip = newSkip;
    this.loadstoreList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private loadstoreList(): void {
    this.gridView = {
      data: this.storeList.slice(this.skip, this.skip + this.pageSize),
      total: this.storeList.length,
    };
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

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Store } from 'src/assets/store/store-list';
import { getStoreVisual, getStoreInitial, StoreVisual } from 'src/assets/store/store-visual';
import { StoreService } from 'src/app/services/store.service';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css'],
})
export class SelectedComponent implements OnInit, OnDestroy {
  title = '隨機選店';

  // 店家資料
  checklist: Store[] = [];
  checkedList: Store[] = [];
  selectedStore: Store | null = null;

  // 動畫狀態
  isSpinning = false;
  showResult = false;
  currentDisplayIndex = 0;

  // 輪盤動畫
  spinInterval: any;
  resultTimeout: any;

  // UI 狀態
  opened = false;

  // 訂閱
  private storeSubscription: Subscription = new Subscription();

  @ViewChildren(ExpansionPanelComponent)
  panels!: QueryList<ExpansionPanelComponent>;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    // 訂閱店家資料變化
    this.storeSubscription = this.storeService.stores$.subscribe(stores => {
      this.checklist = stores.map(store => ({ ...store, isSelected: true }));
      this.updateCheckedList();
    });
  }

  ngOnDestroy(): void {
    this.clearIntervals();
    this.storeSubscription.unsubscribe();
  }

  private clearIntervals(): void {
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
    }
    if (this.resultTimeout) {
      clearTimeout(this.resultTimeout);
    }
  }

  // 全選店家
  selectAllStores(): void {
    this.checklist.forEach(store => store.isSelected = true);
    this.updateCheckedList();
  }

  // 取消全選
  deselectAllStores(): void {
    this.checklist.forEach(store => store.isSelected = false);
    this.updateCheckedList();
  }

  // 更新已選擇的店家列表
  updateCheckedList(): void {
    this.checkedList = this.checklist.filter(store => store.isSelected);
  }

  // 當checkbox狀態改變時
  onStoreSelectionChange(): void {
    this.updateCheckedList();
  }

  // 開始隨機選店
  startRandomSelection(): void {
    if (this.checkedList.length === 0) {
      alert('請至少選擇一家店家！');
      return;
    }

    this.clearIntervals();
    this.isSpinning = true;
    this.showResult = false;
    this.selectedStore = null;
    this.collapsePanel();

    // 快速隨機選店動畫：一開始就很快，後面超快
    let spinSpeed = 100; // 初始速度就很快
    let spinCount = 0;
    const totalSpins = 30 + Math.floor(Math.random() * 25); // 總切換次數
    const superFastPoint = Math.floor(totalSpins * 0.3); // 30% 時進入超快模式
    const slowDownPoint = Math.floor(totalSpins * 0.9); // 90% 時開始減速

    const updateSpeed = () => {
      if (spinCount < superFastPoint) {
        // 初期：快速切換
        spinSpeed = 100 - (spinCount * 2);
      } else if (spinCount < slowDownPoint) {
        // 中期：超快切換（看不清楚）
        spinSpeed = 15 + Math.random() * 15;
      } else {
        // 後期：快速減速到定格
        const remaining = totalSpins - spinCount;
        spinSpeed = 30 + (remaining * 40);
      }
    };

    const runAnimation = () => {
      this.currentDisplayIndex = (this.currentDisplayIndex + 1) % this.checkedList.length;
      spinCount++;

      if (spinCount >= totalSpins) {
        this.stopSpinning();
        return;
      }

      updateSpeed();
      this.spinInterval = setTimeout(runAnimation, spinSpeed);
    };

    // 開始動畫
    runAnimation();
  }

  private stopSpinning(): void {
    this.clearIntervals();

    // 最終隨機選擇（完全隨機，不依賴當前顯示）
    const finalIndex = Math.floor(Math.random() * this.checkedList.length);
    this.currentDisplayIndex = finalIndex;
    this.selectedStore = this.checkedList[finalIndex];

    // 短暫停留，讓用戶看清楚選中的店家
    this.resultTimeout = setTimeout(() => {
      this.isSpinning = false;
      this.showResult = true;
      this.openDialog();
    }, 300);
  }

  // 獲取當前顯示的店家
  getCurrentStore(): Store | null {
    if (this.checkedList.length === 0) return null;
    return this.checkedList[this.currentDisplayIndex];
  }

  // 獲取店家視覺配置
  getStoreVisual(store: Store): StoreVisual {
    return getStoreVisual(store.type, store.id);
  }

  // 獲取店名第一個字
  getStoreInitial(store: Store): string {
    return getStoreInitial(store.name);
  }

  // 摺疊面板
  private collapsePanel(): void {
    this.panels.forEach(panel => {
      if (panel.expanded) {
        panel.toggle();
      }
    });
  }

  // 對話框控制
  openDialog(): void {
    this.opened = true;
  }

  closeDialog(): void {
    this.opened = false;
  }

  // 重新開始
  resetSelection(): void {
    this.isSpinning = false;
    this.showResult = false;
    this.selectedStore = null;
    this.currentDisplayIndex = 0;
    this.clearIntervals();
  }

  // 前往Google地圖
  goToGoogleMaps(): void {
    if (this.selectedStore?.google) {
      window.open(this.selectedStore.google, '_blank');
    }
  }
}

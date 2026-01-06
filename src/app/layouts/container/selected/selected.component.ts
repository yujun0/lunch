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
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css'],
})
export class SelectedComponent implements OnInit, OnDestroy {
  title = '今天吃什麼？';

  // 店家資料
  checklist: Store[] = [];
  checkedList: Store[] = [];
  selectedStore: Store | null = null;

  // 動畫狀態
  isSpinning = false;
  showResult = false;
  currentDisplayIndex = 0;

  // Slot machine animation
  displayStore: Store | null = null;

  // 輪盤動畫
  spinFrameId: number | null = null;
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
      if (this.checkedList.length > 0) {
        this.displayStore = this.checkedList[0];
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    this.storeSubscription.unsubscribe();
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
    if (!this.isSpinning && !this.showResult && this.checkedList.length > 0) {
      this.displayStore = this.checkedList[0];
    }
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

    this.stopAnimation();
    this.isSpinning = true;
    this.showResult = false;
    this.selectedStore = null;
    this.collapsePanel();

    // 使用 requestAnimationFrame 實現順暢動畫
    const totalDuration = 2500; // 總動畫時間 2.5 秒
    const startTime = performance.now();
    let lastUpdateTime = 0;

    const runAnimation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / totalDuration;

      if (progress >= 1) {
        this.finishSelection();
        return;
      }

      // 計算當前應該的更新間隔 - 模擬老虎機效果 (快 -> 更快 -> 慢)
      let updateInterval;
      if (progress < 0.1) {
        updateInterval = 80;
      } else if (progress < 0.6) {
        updateInterval = 40; // 極速
      } else {
        // 結束時逐漸減速
        const slowProgress = (progress - 0.6) / 0.4; // 0 to 1
        updateInterval = 40 + (slowProgress * 200);
      }

      // 只有在達到更新間隔時才切換
      if (currentTime - lastUpdateTime >= updateInterval) {
        this.currentDisplayIndex = (this.currentDisplayIndex + 1) % this.checkedList.length;
        this.displayStore = this.checkedList[this.currentDisplayIndex];
        lastUpdateTime = currentTime;
      }

      this.spinFrameId = requestAnimationFrame(runAnimation);
    };

    // 開始動畫
    this.spinFrameId = requestAnimationFrame(runAnimation);
  }

  private stopAnimation(): void {
    if (this.spinFrameId !== null) {
      cancelAnimationFrame(this.spinFrameId);
      this.spinFrameId = null;
    }
    if (this.resultTimeout) {
      clearTimeout(this.resultTimeout);
      this.resultTimeout = null;
    }
  }

  private finishSelection(): void {
    this.stopAnimation();

    // 最終隨機選擇（完全隨機，不依賴當前顯示）
    const finalIndex = Math.floor(Math.random() * this.checkedList.length);
    this.currentDisplayIndex = finalIndex;
    this.selectedStore = this.checkedList[finalIndex];
    this.displayStore = this.selectedStore;

    // 短暫停留，讓用戶看清楚選中的店家，然後慶祝
    this.resultTimeout = setTimeout(() => {
      this.isSpinning = false;
      this.showResult = true;
      this.triggerConfetti();
      this.openDialog();
    }, 400);
  }

  triggerConfetti(): void {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  // 獲取當前顯示的店家
  getCurrentStore(): Store | null {
    return this.displayStore;
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
    this.stopAnimation();
    if (this.checkedList.length > 0) {
      this.displayStore = this.checkedList[0];
    }
  }

  // 前往Google地圖
  goToGoogleMaps(): void {
    if (this.selectedStore?.google) {
      window.open(this.selectedStore.google, '_blank');
    }
  }
}

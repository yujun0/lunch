import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { storeList } from 'src/assets/store/store-list';
import { images } from 'src/assets/store/images';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';

interface Store {
  id: number;
  name: string;
  imageURL: string;
  url: string;
  google: string;
  isSelected?: boolean;
}

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

  @ViewChildren(ExpansionPanelComponent)
  panels!: QueryList<ExpansionPanelComponent>;

  constructor() {
    this.initializeStores();
  }

  ngOnInit(): void {
    this.selectAllStores();
    this.updateCheckedList();
  }

  ngOnDestroy(): void {
    this.clearIntervals();
  }

  private initializeStores(): void {
    this.checklist = storeList.map(store => ({
      ...store,
      isSelected: true
    }));
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

    // 快速輪播動畫
    let spinSpeed = 50; // 初始速度
    let spinCount = 0;
    const maxSpins = 50 + Math.floor(Math.random() * 30); // 隨機轉動次數

    this.spinInterval = setInterval(() => {
      this.currentDisplayIndex = (this.currentDisplayIndex + 1) % this.checkedList.length;
      spinCount++;

      // 逐漸減速
      if (spinCount > maxSpins * 0.7) {
        spinSpeed += 10;
        clearInterval(this.spinInterval);
        this.spinInterval = setInterval(() => {
          this.currentDisplayIndex = (this.currentDisplayIndex + 1) % this.checkedList.length;
          spinCount++;

          if (spinCount >= maxSpins) {
            this.stopSpinning();
          }
        }, spinSpeed);
      }
    }, spinSpeed);
  }

  private stopSpinning(): void {
    this.clearIntervals();

    // 最終選擇
    const finalIndex = Math.floor(Math.random() * this.checkedList.length);
    this.currentDisplayIndex = finalIndex;
    this.selectedStore = this.checkedList[finalIndex];

    this.resultTimeout = setTimeout(() => {
      this.isSpinning = false;
      this.showResult = true;
      this.openDialog();
    }, 500);
  }

  // 獲取當前顯示的店家
  getCurrentStore(): Store | null {
    if (this.checkedList.length === 0) return null;
    return this.checkedList[this.currentDisplayIndex];
  }

  // 獲取店家圖片URL
  getStoreImageUrl(store: Store): string {
    const imageMap: any = images;
    return imageMap[store.imageURL] || store.url;
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

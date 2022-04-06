import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { storeList } from 'src/assets/store/store-list';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { images } from 'src/assets/store/images';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css'],
})
export class SelectedComponent implements OnDestroy, AfterViewInit, OnInit {

  // checkbox
  title = '隨機選店';
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  store: any;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  nameList: any[] = [];
  // 輪播圖
  @ViewChild('sv') private scrollView: any;
  paused = true;
  width = '95%';
  height = '400px';
  interval: any;
  animate: boolean = false;
  // 獲取URL
  gridView!: GridDataResult;
  storeList: any[] = storeList;
  // 圖片List
  imageList: any[];
  isShow: boolean = false;
  number: number = 0;
  addParameter: boolean = false;
  // Expended
  @ViewChildren(ExpansionPanelComponent)
  panels!: QueryList<ExpansionPanelComponent>;
  // dialog
  opened = false;

  constructor(config: NgbCarouselConfig) {
    this.masterSelected = false;
    this.checklist = storeList;
    this.imageList = storeList;
    this.getCheckedList();
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  // 初始
  public async ngOnInit(): Promise<void> {
    try {
      this.loadstoreList();
      this.allSelected();
      this.getCheckedList();
    } catch (e) {
      console.error(SelectedComponent.name + ' ngOnInit failed:', e);
    }
  }

  public ngAfterViewInit() {}

  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  // 獲取店家圖片list
  getImageList() {
    this.imageList = [];
    const image: any = images;
    for (var i = 0; i < this.checkedList.length; i++) {
      this.nameList.push(image[this.checkedList[i].imageURL]);
    }
  }

  // 全選
  allSelected() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = true;
    }
    this.getCheckedList();
  }

  // 取消全選
  cancelSelected() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = false;
    }
    this.getCheckedList();
  }

  // 獲取Checked的checkedList
  getCheckedList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected) {
        this.checkedList.push(this.checklist[i]);
      }
    }
  }

  // 隨機選店
  async randomSelect() {
    let num = Math.floor(Math.random() * this.checkedList.length);
    this.number = num;
    this.paused = true;
    this.imageList = [];
    const image: any = images;

    for (var i = 0; i < this.checkedList.length; i++) {
      this.imageList.push(this.checkedList[i].url);
    }

    this.interval = setInterval(() => {
      if (this.paused) {
        this.scrollView.next();
      }
    },10);

    await this.delay(2000);
    this.paused = false;
    this.store = this.checkedList[num].name;

    await this.delay(10);
    this.test();
    await this.delay(10);
    this.test();
    this.open();
  }

  // Check All Checkbox
  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedList();
  }

  // 載入storeList
  loadstoreList(): void {
    this.gridView = {
      data: this.storeList,
      total: this.storeList.length,
    };
  }

  // 獲取圖片url
  flagURL(dataItem: any): string {
    const code: string = dataItem.imageURL;
    const image: any = images;
    return image[code];
  }

  // show
  async show() {
    this.isShow = true;
    this.addParameter = true;
  }

  // delay method
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // test
  test() {
    this.delay(2000);
    this.isShow = this.addParameter == true ? false : true;
    this.addParameter = this.addParameter == true ? false : true;
  }

  // expansion
  public expansionPanel(): void {
    this.panels.forEach((panel) => {
      if (panel.expanded) {
        panel.toggle();
      }
    });
  }

  // 彈跳窗
  close() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  // 隨機陣列
  shuffleArray(inputArray:any[]){
    inputArray.sort(() => Math.random() - 0.5);
  }
}

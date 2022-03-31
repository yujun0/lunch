import { SelectedComponent } from './../selected/selected.component';
import { storeList } from './../../../../assets/store/store-list';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Component, OnInit } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { images } from 'src/assets/store/images';
@Component({
  selector: 'app-storelist',
  templateUrl: './storelist.component.html',
  styleUrls: ['./storelist.component.css'],
})
export class StorelistComponent implements OnInit {

  title = '店家清單';
  gridView!: GridDataResult;
  skip = 0;
  storeList: any[] = storeList;
  pageSize = 10;
  photoURL: any[] = [];

  // 初始
  public async ngOnInit(): Promise<void> {
    try {
      this.loadstoreList();
    } catch (e) {
      console.error(SelectedComponent.name + ' ngOnInit failed:', e);
    }
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadstoreList();
  }

  private loadstoreList(): void {
    this.gridView = {
      data: this.storeList.slice(this.skip, this.skip + this.pageSize),
      total: this.storeList.length,
    };
  }

  // 獲取圖片url
  flagURL(dataItem: any): string {
    const code: string = dataItem.imageURL;
    const image: any = images;
    return image[code];
  }

}

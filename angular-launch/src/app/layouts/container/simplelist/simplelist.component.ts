import { Component, OnInit } from '@angular/core';
import { storeList } from 'src/assets/store/store-list';

@Component({
  selector: 'app-simplelist',
  templateUrl: './simplelist.component.html',
  styleUrls: ['./simplelist.component.css']
})
export class SimplelistComponent implements OnInit {
  title = '店家簡易清單';
  storeList = storeList;

  constructor() { }

  ngOnInit(): void {
  }

  // 前往Google地圖
  goToGoogleMaps(googleUrl: string): void {
    if (googleUrl) {
      window.open(googleUrl, '_blank');
    }
  }
}
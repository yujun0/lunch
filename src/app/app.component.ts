import { Component, ViewEncapsulation } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selected: any;
  title = 'angular-launch';
  ngOnInit(): void {
    // this.selected = 'storelist';
    // this.selected = 'simplelist';
    this.selected = 'random';
    // this.selected = 'test';
  }

  items: Array<any> = [
    { text: '隨機選店', icon: 'k-i-button', selected: true, id: 'random' },
    { text: '店家清單', icon: 'k-i-set-column-position', id: 'storelist' },
    { text: '店家簡易清單', icon: 'k-i-list-unordered', id: 'simplelist' },
    { text: '店家管理', icon: 'k-i-edit', id: 'manage' },
    { text: '關於本網站', icon: 'k-i-globe-outline', id: 'about' },
  ];

  onSelect(ev: any): void {
    this.selected = ev.item.id;
  }
}

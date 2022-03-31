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
  title = 'launch';

  ngOnInit(): void {
    this.selected = 'storelist';
  }

  items: Array<DrawerItem> = [
    { text: '店家清單', icon: 'k-i-file-txt', selected: true, id: 'storelist' },
    { text: '隨機選店', icon: 'k-i-button', id: 'random' },
    { text: '關於本網站', icon: 'k-i-globe-outline', id: 'about' }
  ];

  onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.id;
  }

}

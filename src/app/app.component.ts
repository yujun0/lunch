import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selected = 'random';
  title = 'angular-launch';

  items: Array<any> = [
    { text: '隨機選店', icon: 'k-i-question', id: 'random' },
    { text: '店家清單', icon: 'k-i-list-unordered', id: 'storelist' },
    { text: '簡易清單', icon: 'k-i-menu', id: 'simplelist' },
    { text: '店家管理', icon: 'k-i-edit', id: 'manage' },
    { text: '關於', icon: 'k-i-info-circle', id: 'about' },
  ];

  onSelect(id: string): void {
    this.selected = id;
    window.scrollTo(0, 0);
  }
}

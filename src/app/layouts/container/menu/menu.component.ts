import { Component, ViewEncapsulation, Input } from '@angular/core';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  @Input()
  selectedItem!: string;

  constructor() {}
  
}

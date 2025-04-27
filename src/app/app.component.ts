import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemSelectorComponent} from './components/item-selector/item-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemSelectorComponent],
  template: '<app-item-selector></app-item-selector>'
})
export class AppComponent {
  title = 'item-selector-rentman';
}

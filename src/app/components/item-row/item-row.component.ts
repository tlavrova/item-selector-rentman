import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from '../../services/item.service';

@Component({
  selector: 'app-item-row',
  standalone: true,
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})
export class ItemRowComponent {
  @Input({required: true}) item!: Item;
  @Output() itemToggled = new EventEmitter<Item>();

  onItemClick(event: MouseEvent) {
    event.stopPropagation();
    this.itemToggled.emit(this.item);
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onCheckboxChange() {
    this.itemToggled.emit(this.item);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../services/item.service';
import { ItemRowComponent } from '../item-row/item-row.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemRowComponent, NgForOf],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() items: Item[] = [];
  @Output() itemToggled = new EventEmitter<Item>();

  onItemToggled(item: Item) {
    this.itemToggled.emit(item);
  }
} 
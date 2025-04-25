import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Folder, Item } from '../../services/item.service';
import { ItemListComponent } from '../item-list/item-list.component';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-folder-item',
  standalone: true,
  imports: [NgIf, NgForOf, ItemListComponent],
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css']
})
export class FolderItemComponent {
  @Input() folder!: Folder;
  @Input() expandedFolders!: Set<number>;
  
  @Output() folderToggled = new EventEmitter<Folder>();
  @Output() folderExpansionToggled = new EventEmitter<{folder: Folder, event: MouseEvent}>();
  @Output() itemToggled = new EventEmitter<Item>();

  isFolderExpanded(folder: Folder): boolean {
    return this.expandedFolders.has(folder.id);
  }
} 
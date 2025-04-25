import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService, Folder, Item } from '../../services/item.service';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ItemSelectorComponent implements OnInit {
  folders: Folder[] = [];
  items: Item[] = [];
  selectedItemIds: number[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(({ folders, items }) => {
      this.folders = folders;
      this.items = items;
      this.initializeItemsInFolders();
    });
  }

  private initializeItemsInFolders() {
    const folderMap = new Map<number, Folder>();
    const processFolders = (folders: Folder[]) => {
      folders.forEach(folder => {
        folderMap.set(folder.id, folder);
        folder.items = this.items.filter(item => item.folder_id === folder.id);
        if (folder.children) {
          processFolders(folder.children);
        }
      });
    };
    processFolders(this.folders);
  }

  toggleFolder(folder: Folder) {
    const allItems = this.getAllItemsInFolder(folder);
    const allSelected = allItems.every(item => item.selected);
    
    allItems.forEach(item => {
      item.selected = !allSelected;
    });
    
    this.updateSelectedItemIds();
    this.updateParentFolderStates();
  }

  toggleItem(item: Item) {
    item.selected = !item.selected;
    this.updateSelectedItemIds();
    this.updateParentFolderStates();
  }

  private getAllItemsInFolder(folder: Folder): Item[] {
    let items: Item[] = [...(folder.items || [])];
    if (folder.children) {
      folder.children.forEach(child => {
        items = items.concat(this.getAllItemsInFolder(child));
      });
    }
    return items;
  }

  private updateSelectedItemIds() {
    this.selectedItemIds = this.items
      .filter(item => item.selected)
      .map(item => item.id);
  }

  private updateParentFolderStates() {
    const updateFolderState = (folder: Folder) => {
      const allItems = this.getAllItemsInFolder(folder);
      const selectedCount = allItems.filter(item => item.selected).length;
      
      if (selectedCount === 0) {
        folder.selected = false;
        folder.indeterminate = false;
      } else if (selectedCount === allItems.length) {
        folder.selected = true;
        folder.indeterminate = false;
      } else {
        folder.selected = false;
        folder.indeterminate = true;
      }

      if (folder.children) {
        folder.children.forEach(child => updateFolderState(child));
      }
    };

    this.folders.forEach(folder => updateFolderState(folder));
  }

  clearSelection() {
    this.items.forEach(item => item.selected = false);
    this.selectedItemIds = [];
    this.updateParentFolderStates();
  }
} 
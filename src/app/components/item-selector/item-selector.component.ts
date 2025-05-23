import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Folder, Item, ItemService} from '../../services/item.service';
import {SelectionInfoComponent} from '../selection-info/selection-info.component';
import {FolderItemComponent} from '../folder-item/folder-item.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.css'],
  standalone: true,
  imports: [CommonModule, SelectionInfoComponent, FolderItemComponent]
})
export class ItemSelectorComponent implements OnInit {
  folders: Folder[] = [];
  items: Item[] = [];
  selectedItemIds: number[] = [];
  expandedFolders: Set<number> = new Set();

  private destroyRef = inject(DestroyRef);

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemService.getItems$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({folders, items}) => {
      this.folders = folders;
      this.items = items;
      this.initializeItemsInFolders();
      this.expandAllFolders();
    });
  }

  toggleFolderExpansion(folder: Folder, event: MouseEvent) {
    event.stopPropagation();
    if (this.expandedFolders.has(folder.id)) {
      this.expandedFolders.delete(folder.id);
    } else {
      this.expandedFolders.add(folder.id);
    }
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

  clearSelection() {
    this.items.forEach(item => item.selected = false);
    this.selectedItemIds = [];
    this.updateParentFolderStates();
  }

  onItemToggled(item: Item) {
    this.toggleItem(item);
  }

  private expandAllFolders() {
    const expandFolder = (folder: Folder) => {
      this.expandedFolders.add(folder.id);
      if (folder.children) {
        folder.children.forEach(child => expandFolder(child));
      }
    };
    this.folders.forEach(folder => expandFolder(folder));
  }

  private initializeItemsInFolders() {
    const folderMap = new Map<number, Folder>();
    const processFolders = (folders: Folder[]) => {
      folders.forEach(folder => {
        folderMap.set(folder.id, folder);
        folder.items = this.items.filter(item => item.folder_id === folder.id)
          .sort((a, b) => a.title.localeCompare(b.title));
        if (folder.children) {
          processFolders(folder.children);
        }
      });
    };
    processFolders(this.folders);
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
}

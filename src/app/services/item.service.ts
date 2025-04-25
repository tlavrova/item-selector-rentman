import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Folder {
  id: number;
  title: string;
  parent_id: number | null;
  children?: Folder[];
  items?: Item[];
  selected?: boolean;
  indeterminate?: boolean;
}

export interface Item {
  id: number;
  title: string;
  folder_id: number;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = '/response.json';

  constructor(private http: HttpClient) {}

  getItems(): Observable<{ folders: Folder[], items: Item[] }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const folders = this.processFolders(response.folders);
        const items = this.processItems(response.items);
        return { folders, items };
      })
    );
  }

  private processFolders(foldersData: any): Folder[] {
    const folders: Folder[] = foldersData.data.map(([id, title, parent_id]: [number, string, number | null]) => ({
      id,
      title,
      parent_id,
      children: [],
      items: [],
      selected: false,
      indeterminate: false
    }));

    // Build folder hierarchy
    const rootFolders: Folder[] = [];
    const folderMap = new Map<number, Folder>();

    folders.forEach(folder => {
      folderMap.set(folder.id, folder);
    });

    folders.forEach(folder => {
      if (folder.parent_id === null) {
        rootFolders.push(folder);
      } else {
        const parent = folderMap.get(folder.parent_id);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(folder);
        }
      }
    });

    // Sort folders alphabetically
    const sortFolders = (folders: Folder[]) => {
      folders.sort((a, b) => a.title.localeCompare(b.title));
      folders.forEach(folder => {
        if (folder.children) {
          sortFolders(folder.children);
        }
      });
    };

    sortFolders(rootFolders);
    return rootFolders;
  }

  private processItems(itemsData: any): Item[] {
    return itemsData.data.map(([id, title, folder_id]: [number, string, number]) => ({
      id,
      title,
      folder_id,
      selected: false
    }));
  }
} 
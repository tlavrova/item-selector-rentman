import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-selection-info',
  standalone: true,
  templateUrl: './selection-info.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./selection-info.component.css']
})
export class SelectionInfoComponent {
  @Input({required: true}) selectedItemIds: number[] = [];
  @Output() clearSelection = new EventEmitter<void>();

  onClearSelection() {
    this.clearSelection.emit();
  }
}

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './status-filter.component.html',
  styleUrl: './status-filter.component.css'
})
export class StatusFilterComponent {
  @Input() label: string = 'Filter by Status';
  @Input() statusOptions: string[] = ['pending', 'completed'];
  @Input() selectedStatus: string = 'all';

  @Output() statusChange = new EventEmitter<string>();

  onStatusChange() {
    this.statusChange.emit(this.selectedStatus);
  }
}

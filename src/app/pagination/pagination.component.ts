import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 0;
  @Input() maxVisiblePages: number = 3;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getVisiblePages(): number[] {
    const visiblePages = [];
    const halfRange = Math.floor(this.maxVisiblePages / 2);

    let startPage = Math.max(2, this.currentPage - halfRange);
    let endPage = Math.min(this.totalPages - 1, this.currentPage + halfRange);

    if (this.currentPage <= halfRange + 1) {
      endPage = Math.min(this.maxVisiblePages, this.totalPages - 1);
    }

    if (this.currentPage >= this.totalPages - halfRange) {
      startPage = Math.max(this.totalPages - this.maxVisiblePages + 1, 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  shouldShowLeftEllipsis(): boolean {
    return this.currentPage > this.maxVisiblePages / 2 + 1 && this.totalPages > this.maxVisiblePages + 2;
  }

  shouldShowRightEllipsis(): boolean {
    return this.currentPage < this.totalPages - (this.maxVisiblePages / 2) && this.totalPages > this.maxVisiblePages + 2;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.pageSizeChange.emit(this.itemsPerPage);
  }
}

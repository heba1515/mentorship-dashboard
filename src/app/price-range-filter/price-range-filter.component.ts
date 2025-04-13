import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-range-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './price-range-filter.component.html',
  styleUrl: './price-range-filter.component.css'
})
export class PriceRangeFilterComponent {
  @Input() label: string = 'Price Range';
  @Input() min: number | null = null;
  @Input() max: number | null = null;

  @Output() rangeChange = new EventEmitter<{min: number | null, max: number | null}>();
  @Output() resetFilter = new EventEmitter<void>();

  get hasValue(): boolean {
    return this.min !== null || this.max !== null;
  }

  onChange() {
    this.rangeChange.emit({
      min: this.min,
      max: this.max
    });
  }

  reset() {
    this.min = null;
    this.max = null;
    this.resetFilter.emit();
  }
}

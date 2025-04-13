import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transaction } from '../interfaces/transaction';
import { TransactionsService } from '../services/transactions.service';
import { MentorsService } from '../services/mentors.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { StatusFilterComponent } from '../status-filter/status-filter.component';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule, SpinnerComponent, PaginationComponent, StatusFilterComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: transaction[] = [];
  filteredTransactions: any[] = [];
  paginatedTransactions: any[] = [];
  mentorsMap: { [key: string]: string } = {};
  isLoading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 7;

  paymentStatusFilter: string = 'all';
  availableStatuses = ['paid', 'unpaid'];

  constructor(private transactionsService: TransactionsService, private mentorsService: MentorsService) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.isLoading = true;
    this.transactionsService.getTransactions().subscribe(
      (data) => {
        this.transactions = data;
        this.applyFilters();
        this.fetchMentors();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(selectedStatus: string) {
    this.paymentStatusFilter = selectedStatus;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTransactions = this.paymentStatusFilter === 'all'
      ? [...this.transactions]
      : this.transactions.filter(t => t.paymentStatus === this.paymentStatusFilter);

    this.currentPage = 1;
    this.updatePaginatedTransactions();
  }

  updatePaginatedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedTransactions();
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.currentPage = 1;
    this.updatePaginatedTransactions();
  }

  fetchMentors() {
    this.mentorsService.getMentors().subscribe(
      (mentors) => {
        mentors.forEach((mentor) => {
          this.mentorsMap[mentor._id] = mentor.name;
        });
      },
      (error) => {
        console.error('Error fetching mentors:', error);
      }
    );
  }

  getMentorName(mentorId: string): string {
    return this.mentorsMap[mentorId] || 'Unknown Mentor';
  }

}

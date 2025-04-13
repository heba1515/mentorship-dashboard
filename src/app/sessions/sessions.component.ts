import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { session } from '../interfaces/session';
import { SessionsService } from '../services/sessions.service';
import { MentorsService } from '../services/mentors.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { StatusFilterComponent } from '../status-filter/status-filter.component';

@Component({
  selector: 'app-sessions',
  imports: [CommonModule, FormsModule, SpinnerComponent, PaginationComponent, StatusFilterComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent {
  sessions: session[] = [];
  filteredSessions: any[] = [];
  paginatedSessions: any[] = [];
  mentorsMap: { [key: string]: string } = {};
  isLoading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 7;

  statusFilter: string = 'all';
  availableStatuses = ['pending', 'completed'];

  constructor(private sessionsService: SessionsService, private mentorsService: MentorsService) {}

  ngOnInit() {
    this.fetchSessions();
  }

  fetchSessions() {
    this.isLoading = true;
    this.sessionsService.getSessions().subscribe(
      (data) => {
        this.sessions = data;
        this.applyFilters();
        this.fetchMentors();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredSessions = this.statusFilter === 'all'
      ? [...this.sessions]
      : this.sessions.filter(s => s.status === this.statusFilter);

    this.currentPage = 1;
    this.updatePaginatedSessions();
  }

  updatePaginatedSessions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSessions = this.filteredSessions.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedSessions();
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.currentPage = 1;
    this.updatePaginatedSessions();
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

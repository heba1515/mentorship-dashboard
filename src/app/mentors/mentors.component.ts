import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mentor } from '../interfaces/mentor';
import { MentorsService } from '../services/mentors.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MessagesService } from '../services/messages.service';
import { message } from '../interfaces/message';
import { PaginationComponent } from '../pagination/pagination.component';
import { StatusFilterComponent } from '../status-filter/status-filter.component';

@Component({
  selector: 'app-mentors',
  imports: [CommonModule, FormsModule, SpinnerComponent, PaginationComponent, StatusFilterComponent],
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.css'
})

export class MentorsComponent {
  mentors: mentor[] = [];
  filteredMentors: any[] = [];
  paginatedMentors: any[] = [];
  isLoading: boolean = false;
  activeChatMentorId: string | null = null;
  messageContent: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;

  statusFilter: string = 'all';
  availableStatuses = ['active', 'inactive'];

  constructor(private mentorsService: MentorsService, private messageService: MessagesService) {}

  ngOnInit() {
    this.fetchMentors();
  }


  fetchMentors() {
    this.isLoading = true;
    this.mentorsService.getMentors().subscribe(
      (data) => {
        this.mentors = data;
        this.applyFilters();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching mentors:', error);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(selectedStatus: string) {
    this.statusFilter = selectedStatus;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredMentors = this.statusFilter === 'all'
      ? [...this.mentors]
      : this.mentors.filter(m => m.status === this.statusFilter);

    this.currentPage = 1;
    this.updatePaginatedMentors();
  }

  updatePaginatedMentors() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMentors = this.filteredMentors.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedMentors();
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.currentPage = 1;
    this.updatePaginatedMentors();
  }

  toggleMentorStatus(mentor: mentor) {
    const newStatus = mentor.status === 'active' ? 'inactive' : 'active';
    const originalStatus = mentor.status;

    mentor.status = newStatus;

    this.mentorsService.activateMentor(mentor._id).subscribe({
      error: (err) => {
        console.error('Error updating mentor status:', err);
        mentor.status = originalStatus;
      }
    });
  }


  toggleChat(mentorId: string) {
    this.activeChatMentorId = this.activeChatMentorId === mentorId ? null : mentorId;
  }

  sendMessage(mentor: mentor) {
    const trimmed = this.messageContent.trim();
    if (!trimmed) return;

    const message: message = {
      sender: 'Admin',
      sender_role: 'admin',
      receiver: mentor._id,
      content: trimmed,
    };

    // this.messageService.sendMessage(message).subscribe({
    //   next: (response) => {
    //     if (response.status === 'success') {
    //       console.log('Message sent:', response.data);
    //       this.messageContent = '';
    //       this.activeChatMentorId = null;
    //     } else {
    //       console.warn('Unexpected status:', response.status);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error sending message:', err);
    //   },
    // });
  }

}

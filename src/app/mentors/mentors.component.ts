import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mentor } from '../interfaces/mentor';
import { MentorsService } from '../services/mentors.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MessagesService } from '../services/messages.service';
import { message } from '../interfaces/message';

@Component({
  selector: 'app-mentors',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.css'
})

export class MentorsComponent {
  mentors: mentor[] = [];
  isLoading: boolean = false;
  activeChatMentorId: string | null = null;
  messageContent: string = '';

  constructor(private mentorsService: MentorsService, private messageService: MessagesService) {}

  ngOnInit() {
    this.fetchMentors();
  }


  fetchMentors() {
    this.isLoading = true;
    this.mentorsService.getMentors().subscribe(
      (data) => {
        this.mentors = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching mentors:', error);
        this.isLoading = false;
      }
    );
  }

  toggleMentorStatus(mentor: mentor) {
    const newStatus = mentor.status === 'active' ? 'inactive' : 'active';
    const originalStatus = mentor.status;

    mentor.status = newStatus;

    const update$ = newStatus === 'active'
      ? this.mentorsService.activateMentor(mentor._id)
      : this.mentorsService.deactivateMentor(mentor._id);

    update$.subscribe({
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
      sender_Role: 'admin',
      room: mentor._id,
      content: trimmed,
    };

    this.messageService.sendMessage(message).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log('Message sent:', response.data);
          this.messageContent = '';
          this.activeChatMentorId = null;
        } else {
          console.warn('Unexpected status:', response.status);
        }
      },
      error: (err) => {
        console.error('Error sending message:', err);
      },
    });
  }

}

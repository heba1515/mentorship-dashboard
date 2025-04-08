import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { session } from '../interfaces/session';
import { SessionsService } from '../services/sessions.service';
import { MentorsService } from '../services/mentors.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-sessions',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent {
  sessions: session[] = [];
  mentorsMap: { [key: string]: string } = {};
  isLoading: boolean = false;

  constructor(private sessionsService: SessionsService, private mentorsService: MentorsService) {}

  ngOnInit() {
    this.fetchSessions();
  }

  fetchSessions() {
    this.isLoading = true;
    this.sessionsService.getSessions().subscribe(
      (data) => {
        this.sessions = data;
        this.fetchMentors();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
        this.isLoading = false;
      }
    );
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mentor } from '../interfaces/mentor';
import { user } from '../interfaces/user';
import { session } from '../interfaces/session';
import { AuthService } from '../services/auth.service';
import { MentorsService } from '../services/mentors.service';
import { UsersService } from '../services/users.service';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  adminDetails: any;
  mentors: mentor[] = [];
  users: user[] = [];
  sessions: session[] = [];
  mentorsMap: { [key: string]: string } = {};

  stats = [
    { label: 'Mentors', value: 0, progress: 0, icon: 'fas fa-user-friends', color: '#FFBC34' },
    { label: 'Learners', value: 0, progress: 0, icon: 'fas fa-users', color: '#118577' },
    { label: 'Sessions', value: 0, progress: 0, icon: 'fa-solid fa-camera', color: '#dc3545' }
  ]

  constructor(
    private authService: AuthService,
    private mentorsService: MentorsService,
    private userService: UsersService,
    private sessionService: SessionsService
  ) { }

  ngOnInit() {
    this.adminDetails = this.authService.getAdminDetails();

    this.fetchMentors();
    this.fetchUsers();
    this.fetchSessions();
  }

  fetchMentors() {
    this.mentorsService.getMentors().subscribe(
      (data) => {
        this.mentors = data;
        this.stats[0].value = data.length;
        this.stats[0].progress = this.calculateProgress(data.length, 200);

        data.forEach((mentor) => {
          this.mentorsMap[mentor._id] = mentor.name;
        });
      },
      (error) => {
        console.error('Error fetching mentors:', error);
      }
    );
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.stats[1].value = data.length;
        this.stats[1].progress = this.calculateProgress(data.length, 500);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchSessions() {
    this.sessionService.getSessions().subscribe(
      (data) => {
        this.sessions = data;
        this.stats[2].value = data.length;
        this.stats[2].progress = this.calculateProgress(data.length, 300);
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  getMentorName(mentorId: string): string {
    return this.mentorsMap[mentorId] || 'Unknown Mentor';
  }

  private calculateProgress(current: number, target: number): number {
    return Math.min((current / target) * 100, 100);
  }

}

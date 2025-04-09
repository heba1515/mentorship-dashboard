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
import { SpinnerComponent } from '../spinner/spinner.component';
import { admin } from '../interfaces/admin';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  adminDetails: any;
  admins: admin[] = [];
  mentors: mentor[] = [];
  users: user[] = [];
  sessions: session[] = [];
  mentorsMap: { [key: string]: string } = {};
  isLoading: boolean = false;

  stats = [
    { label: 'Admins', value: 0, progress: 0, icon: 'fa-solid fa-user-tie', color: '#FFBC34' },
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

    this.fetchAdmins();
    this.fetchMentors();
    this.fetchUsers();
    this.fetchSessions();
  }

  fetchAdmins(){
    this.isLoading = true;
    this.userService.getAdmins().subscribe(
      (data) => {
        this.admins = data;
        this.stats[0].value = data.length;
        this.stats[0].progress = this.calculateProgress(data.length, 200);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching mentors:', error);
        this.isLoading = false;
      }
    );
  }

  fetchMentors() {
    this.isLoading = true;
    this.mentorsService.getMentors().subscribe(
      (data) => {
        this.mentors = data;
        this.stats[1].value = data.length;
        this.stats[1].progress = this.calculateProgress(data.length, 200);
        this.isLoading = false;

        data.forEach((mentor) => {
          this.mentorsMap[mentor._id] = mentor.name;
        });
      },
      (error) => {
        console.error('Error fetching mentors:', error);
        this.isLoading = false;
      }
    );
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.stats[2].value = data.length;
        this.stats[2].progress = this.calculateProgress(data.length, 500);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  fetchSessions() {
    this.isLoading = true;
    this.sessionService.getSessions().subscribe(
      (data) => {
        this.sessions = data;
        this.stats[3].value = data.length;
        this.stats[3].progress = this.calculateProgress(data.length, 300);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
        this.isLoading = false;
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

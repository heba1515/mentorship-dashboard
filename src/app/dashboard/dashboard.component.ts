import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mentor } from '../interfaces/mentor';
import { user } from '../interfaces/user';
import { session } from '../interfaces/session';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  statusFilter: string = '';
  currentPage: number = 1;

  stats = [
    { label: 'Mentors', value: 168, progress: 40, icon: 'fas fa-user-friends', color: '#FFBC34' },
    { label: 'Learners', value: 487, progress: 60, icon: 'fas fa-users', color: '#118577' },
    { label: 'Sessions', value: 485, progress: 30, icon: 'fa-solid fa-camera', color: '#dc3545' }
  ]

  mentors: mentor[] = [
    {
      id: 1,
      mentor: {
        name: 'James Amen',
        image: 'profile-img.png',
        title: 'Frontend Developer'
      },
      date: '2019-11-09',
      email: 'james.amen@example.com',
      phone: 1234567890,
      status: 'active',
      earnd: 200.00
    },
    {
      id: 2,
      mentor: {
        name: 'Sophia Lee',
        image: 'profile-img.png',
        title: 'Data Scientist'
      },
      date: '2019-11-10',
      email: 'sophia.lee@example.com',
      phone: 1234567891,
      status: 'pending',
      earnd: 180.00
    },
    {
      id: 3,
      mentor: {
        name: 'Mohamed Salim',
        image: 'profile-img.png',
        title: 'Backend Developer'
      },
      date: '2019-11-11',
      email: 'mohamed.salim@example.com',
      phone: 1234567892,
      status: 'active',
      earnd: 250.00
    },
    {
      id: 4,
      mentor: {
        name: 'Elena Gilbert',
        image: 'profile-img.png',
        title: 'UI/UX Designer'
      },
      date: '2019-11-12',
      email: 'elena.gilbert@example.com',
      phone: 1234567893,
      status: 'pending',
      earnd: 210.00
    },
    {
      id: 5,
      mentor: {
        name: 'Ali Khan',
        image: 'profile-img.png',
        title: 'DevOps Engineer'
      },
      date: '2019-11-13',
      email: 'ali.khan@example.com',
      phone: 1234567894,
      status: 'active',
      earnd: 300.00
    },
  ]

  filteredMentors() {
    let filtered = this.mentors;

    if (this.statusFilter) {
      filtered = filtered.filter(mentors => mentors.status === this.statusFilter);
    }

    return filtered;
  }

  users: user[] = [
    {
      id: 1,
      user: {
        name: 'James Amen',
        image: 'profile-img.png',
        title: 'Frontend Developer'
      },
      date: '2019-11-09',
      email: 'james.amen@example.com',
      phone: 1234567890,
      status: 'active',
    },
    {
      id: 2,
      user: {
        name: 'Sophia Lee',
        image: 'profile-img.png',
        title: 'Data Scientist'
      },
      date: '2019-11-10',
      email: 'sophia.lee@example.com',
      phone: 1234567891,
      status: 'pending',
    },
    {
      id: 3,
      user: {
        name: 'Mohamed Salim',
        image: 'profile-img.png',
        title: 'Backend Developer'
      },
      date: '2019-11-11',
      email: 'mohamed.salim@example.com',
      phone: 1234567892,
      status: 'active',
    },
    {
      id: 4,
      user: {
        name: 'Elena Gilbert',
        image: 'profile-img.png',
        title: 'UI/UX Designer'
      },
      date: '2019-11-12',
      email: 'elena.gilbert@example.com',
      phone: 1234567893,
      status: 'pending',
    },
    {
      id: 5,
      user: {
        name: 'Ali Khan',
        image: 'profile-img.png',
        title: 'DevOps Engineer'
      },
      date: '2019-11-13',
      email: 'ali.khan@example.com',
      phone: 1234567894,
      status: 'active',
    },
  ]

  filteredUsers() {
    let filtered = this.users;

    if (this.statusFilter) {
      filtered = filtered.filter(users => users.status === this.statusFilter);
    }

    return filtered;
  }


  sessions: session[] = [
    {
      id: 1,
      Title: 'Frontend Developer',
      Price: 200.00,
      MentorName: 'James Amen',
      Date: '2019-11-09',
      status: 'active',
      Duration: 30
    },
    {
      id: 2,
      Title: 'Data Scientist',
      Price: 180.00,
      MentorName: 'Sophia Lee',
      Date: '2019-11-10',
      status: 'pending',
      Duration: 30
    },
    {
      id: 3,
      Title: 'Backend Developer',
      Price: 250.00,
      MentorName: 'Mohamed Salim',
      Date: '2019-11-11',
      status: 'active',
      Duration: 30
    },
    {
      id: 4,
      Title: 'UI/UX Designer',
      Price: 210.00,
      MentorName: 'Elena Gilbert',
      Date: '2019-11-12',
      status: 'pending',
      Duration: 30
    },
    {
      id: 5,
      Title: 'DevOps Engineer',
      Price: 300.00,
      MentorName: 'Ali Khan',
      Date: '2019-11-13',
      status: 'active',
      Duration: 30
    },
    {
      id: 6,
      Title: 'Cybersecurity Expert',
      Price: 270.00,
      MentorName: 'Lily Evans',
      Date: '2019-11-14',
      status: 'pending',
      Duration: 30
    },
  ]


  filteredSessions() {
    let filtered = this.sessions;

    if (this.statusFilter) {
      filtered = filtered.filter(sessions => sessions.status === this.statusFilter);
    }

    return filtered;
  }

}

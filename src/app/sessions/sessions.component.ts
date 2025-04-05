import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { session } from '../interfaces/session';

@Component({
  selector: 'app-sessions',
  imports: [CommonModule, FormsModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent {
  statusFilter: string = '';

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
    {
      id: 7,
      Title: 'AI Specialist',
      Price: 320.00,
      MentorName: 'John Smith',
      Date: '2019-11-15',
      status: 'active',
      Duration: 30
    },
    {
      id: 8,
      Title: 'Machine Learning Engineer',
      Price: 240.00,
      MentorName: 'Maria Garcia',
      Date: '2019-11-16',
      status: 'pending',
      Duration: 30
    },
    {
      id: 9,
      Title: 'Cloud Architect',
      Price: 310.00,
      MentorName: 'Chen Wei',
      Date: '2019-11-17',
      status: 'active',
      Duration: 30
    },
    {
      id: 10,
      Title: 'Full Stack Developer',
      Price: 230.00,
      MentorName: 'Fatima Zahra',
      Date: '2019-11-18',
      status: 'pending',
      Duration: 30
    },
    {
      id: 11,
      Title: 'Project Manager',
      Price: 260.00,
      MentorName: 'David Brown',
      Date: '2019-11-19',
      status: 'active',
      Duration: 30
    },
    {
      id: 12,
      Title: 'Scrum Master',
      Price: 280.00,
      MentorName: 'Nora Williams',
      Date: '2019-11-20',
      status: 'pending',
      Duration: 30
    },
    {
      id: 13,
      Title: 'Mobile App Developer',
      Price: 290.00,
      MentorName: 'Omar Eltayeb',
      Date: '2019-11-21',
      status: 'active',
      Duration: 30
    },
    {
      id: 14,
      Title: 'Software Engineer',
      Price: 220.00,
      MentorName: 'Emily Watson',
      Date: '2019-11-22',
      status: 'pending',
      Duration: 30
    },
    {
      id: 15,
      Title: 'Game Developer',
      Price: 330.00,
      MentorName: 'Ahmed Nabil',
      Date: '2019-11-23',
      status: 'active',
      Duration: 30
    }
  ]

  filteredSessions() {
    let filtered = this.sessions;

    if (this.statusFilter) {
      filtered = filtered.filter(sessions => sessions.status === this.statusFilter);
    }

    return filtered;
  }

}

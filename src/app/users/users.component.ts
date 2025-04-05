import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../interfaces/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  statusFilter: string = '';

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
    {
      id: 6,
      user: {
        name: 'Lily Evans',
        image: 'profile-img.png',
        title: 'Cybersecurity Expert'
      },
      date: '2019-11-14',
      email: 'lily.evans@example.com',
      phone: 1234567895,
      status: 'pending',
    },
    {
      id: 7,
      user: {
        name: 'John Smith',
        image: 'profile-img.png',
        title: 'AI Specialist'
      },
      date: '2019-11-15',
      email: 'john.smith@example.com',
      phone: 1234567896,
      status: 'active',
    },
    {
      id: 8,
      user: {
        name: 'Maria Garcia',
        image: 'profile-img.png',
        title: 'Machine Learning Engineer'
      },
      date: '2019-11-16',
      email: 'maria.garcia@example.com',
      phone: 1234567897,
      status: 'pending',
    },
    {
      id: 9,
      user: {
        name: 'Chen Wei',
        image: 'profile-img.png',
        title: 'Cloud Architect'
      },
      date: '2019-11-17',
      email: 'chen.wei@example.com',
      phone: 1234567898,
      status: 'active',
    },
    {
      id: 10,
      user: {
        name: 'Fatima Zahra',
        image: 'profile-img.png',
        title: 'Full Stack Developer'
      },
      date: '2019-11-18',
      email: 'fatima.zahra@example.com',
      phone: 1234567899,
      status: 'pending',
    },
    {
      id: 11,
      user: {
        name: 'David Brown',
        image: 'profile-img.png',
        title: 'Project Manager'
      },
      date: '2019-11-19',
      email: 'david.brown@example.com',
      phone: 1234567800,
      status: 'active',
    },
    {
      id: 12,
      user: {
        name: 'Nora Williams',
        image: 'profile-img.png',
        title: 'Scrum Master'
      },
      date: '2019-11-20',
      email: 'nora.williams@example.com',
      phone: 1234567801,
      status: 'pending',
    },
    {
      id: 13,
      user: {
        name: 'Omar Eltayeb',
        image: 'profile-img.png',
        title: 'Mobile App Developer'
      },
      date: '2019-11-21',
      email: 'omar.eltayeb@example.com',
      phone: 1234567802,
      status: 'active',
    },
    {
      id: 14,
      user: {
        name: 'Emily Watson',
        image: 'profile-img.png',
        title: 'Software Engineer'
      },
      date: '2019-11-22',
      email: 'emily.watson@example.com',
      phone: 1234567803,
      status: 'pending',
    },
    {
      id: 15,
      user: {
        name: 'Ahmed Nabil',
        image: 'profile-img.png',
        title: 'Game Developer'
      },
      date: '2019-11-23',
      email: 'ahmed.nabil@example.com',
      phone: 1234567804,
      status: 'active',
    }
  ]

  filteredUsers() {
    let filtered = this.users;

    if (this.statusFilter) {
      filtered = filtered.filter(users => users.status === this.statusFilter);
    }

    return filtered;
  }

}

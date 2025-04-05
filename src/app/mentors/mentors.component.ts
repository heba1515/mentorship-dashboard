import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mentor } from '../interfaces/mentor';

@Component({
  selector: 'app-mentors',
  imports: [CommonModule, FormsModule],
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.css'
})

export class MentorsComponent {


  statusFilter: string = '';

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
    {
      id: 6,
      mentor: {
        name: 'Lily Evans',
        image: 'profile-img.png',
        title: 'Cybersecurity Expert'
      },
      date: '2019-11-14',
      email: 'lily.evans@example.com',
      phone: 1234567895,
      status: 'pending',
      earnd: 270.00
    },
    {
      id: 7,
      mentor: {
        name: 'John Smith',
        image: 'profile-img.png',
        title: 'AI Specialist'
      },
      date: '2019-11-15',
      email: 'john.smith@example.com',
      phone: 1234567896,
      status: 'active',
      earnd: 320.00
    },
    {
      id: 8,
      mentor: {
        name: 'Maria Garcia',
        image: 'profile-img.png',
        title: 'Machine Learning Engineer'
      },
      date: '2019-11-16',
      email: 'maria.garcia@example.com',
      phone: 1234567897,
      status: 'pending',
      earnd: 240.00
    },
    {
      id: 9,
      mentor: {
        name: 'Chen Wei',
        image: 'profile-img.png',
        title: 'Cloud Architect'
      },
      date: '2019-11-17',
      email: 'chen.wei@example.com',
      phone: 1234567898,
      status: 'active',
      earnd: 310.00
    },
    {
      id: 10,
      mentor: {
        name: 'Fatima Zahra',
        image: 'profile-img.png',
        title: 'Full Stack Developer'
      },
      date: '2019-11-18',
      email: 'fatima.zahra@example.com',
      phone: 1234567899,
      status: 'pending',
      earnd: 230.00
    },
    {
      id: 11,
      mentor: {
        name: 'David Brown',
        image: 'profile-img.png',
        title: 'Project Manager'
      },
      date: '2019-11-19',
      email: 'david.brown@example.com',
      phone: 1234567800,
      status: 'active',
      earnd: 260.00
    },
    {
      id: 12,
      mentor: {
        name: 'Nora Williams',
        image: 'profile-img.png',
        title: 'Scrum Master'
      },
      date: '2019-11-20',
      email: 'nora.williams@example.com',
      phone: 1234567801,
      status: 'pending',
      earnd: 280.00
    },
    {
      id: 13,
      mentor: {
        name: 'Omar Eltayeb',
        image: 'profile-img.png',
        title: 'Mobile App Developer'
      },
      date: '2019-11-21',
      email: 'omar.eltayeb@example.com',
      phone: 1234567802,
      status: 'active',
      earnd: 290.00
    },
    {
      id: 14,
      mentor: {
        name: 'Emily Watson',
        image: 'profile-img.png',
        title: 'Software Engineer'
      },
      date: '2019-11-22',
      email: 'emily.watson@example.com',
      phone: 1234567803,
      status: 'pending',
      earnd: 220.00
    },
    {
      id: 15,
      mentor: {
        name: 'Ahmed Nabil',
        image: 'profile-img.png',
        title: 'Game Developer'
      },
      date: '2019-11-23',
      email: 'ahmed.nabil@example.com',
      phone: 1234567804,
      status: 'active',
      earnd: 330.00
    }
  ];






  filteredMentors() {
    let filtered = this.mentors;

    if (this.statusFilter) {
      filtered = filtered.filter(mentors => mentors.status === this.statusFilter);
    }

    return filtered;
  }


}

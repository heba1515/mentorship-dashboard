import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Booking {
  id: number;
  mentor: {
    name: string;
    image: string;
    title: string;
  };
  course: string;
  mentee: {
    name: string;
    image: string;
    level: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  statusFilter: string = '';
  currentPage: number = 1;

  mentors = [
    { name: 'James Amen', title: 'Frontend Developer', rating: 4, image: 'profile-img.png' },
    { name: 'Jessica Fogarty', title: 'Data Analysis', rating: 4, image: 'profile-img.png' },
    { name: 'Jose Anderson', title: 'Backend Developer', rating: 4, image: 'profile-img.png' },
    { name: 'Sofia Brient', title: 'Flutter Developer', rating: 4, image: 'profile-img.png' },
    { name: 'Marvin Campbell', title: 'UX/UI Designer', rating: 4, image: 'profile-img.png' }
  ];

  learners = [
    { name: 'Jonathan Doe', phone: '8286329170', lastVisit: '20 Oct 2019', image: 'profile-img.png' },
    { name: 'Julie Pennington', phone: '2077299974', lastVisit: '22 Oct 2019', image: 'profile-img.png' },
    { name: 'Tyrone Roberts', phone: '2607247769', lastVisit: '21 Oct 2019', image: 'profile-img.png' },
    { name: 'Allen Davis', phone: '5043686874', lastVisit: '21 Sep 2019', image: 'profile-img.png' },
    { name: 'Patricia Manzi', phone: '9548207887', lastVisit: '18 Sep 2019', image: 'profile-img.png' }
  ];

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }


  bookings: Booking[] = [
    {
      id: 1,
      mentor: {
        name: 'James Amen',
        image: 'profile-img.png',
        title: 'Mathematics'
      },
      course: 'Maths',
      mentee: {
        name: 'Jonathan Doe',
        image: 'profile-img.png',
        level: 'Intermediate'
      },
      date: new Date('2019-11-09'),
      startTime: '11:00 AM',
      endTime: '11:15 AM',
      status: 'completed',
      amount: 200.00
    },
    {
      id: 2,
      mentor: {
        name: 'Jessica Fogarty',
        image: 'profile-img.png',
        title: 'Business Mathematics'
      },
      course: 'Business Maths',
      mentee: {
        name: 'Julie Pennington',
        image: 'profile-img.png',
        level: 'Advanced'
      },
      date: new Date('2019-11-05'),
      startTime: '11:00 AM',
      endTime: '11:35 AM',
      status: 'completed',
      amount: 300.00
    },
    {
      id: 3,
      mentor: {
        name: 'Jose Anderson',
        image: 'profile-img.png',
        title: 'Algebra'
      },
      course: 'Algebra',
      mentee: {
        name: 'Tyrone Roberts',
        image: 'profile-img.png',
        level: 'Beginner'
      },
      date: new Date('2019-11-11'),
      startTime: '12:00 PM',
      endTime: '12:15 PM',
      status: 'upcoming',
      amount: 150.00
    },
    {
      id: 4,
      mentor: {
        name: 'Sofia Brient',
        image: 'profile-img.png',
        title: 'Integrated Mathematics'
      },
      course: 'Integrated Sum',
      mentee: {
        name: 'Allen Davis',
        image: 'profile-img.png',
        level: 'Intermediate'
      },
      date: new Date('2019-11-07'),
      startTime: '1:00 PM',
      endTime: '1:20 PM',
      status: 'completed',
      amount: 150.00
    },
    {
      id: 5,
      mentor: {
        name: 'Marvin Campbell',
        image: 'profile-img.png',
        title: 'Flow Charts'
      },
      course: 'Flow chart',
      mentee: {
        name: 'Patricia Manzi',
        image: 'profile-img.png',
        level: 'Advanced'
      },
      date: new Date('2019-11-15'),
      startTime: '2:00 PM',
      endTime: '2:30 PM',
      status: 'upcoming',
      amount: 200.00
    }
  ];

  filteredBookings() {
    let filtered = this.bookings;

    if (this.statusFilter) {
      filtered = filtered.filter(booking => booking.status === this.statusFilter);
    }

    return filtered;
  }
  
}

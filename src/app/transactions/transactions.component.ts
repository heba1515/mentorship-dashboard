import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transaction } from '../interfaces/transaction';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  statusFilter: string = '';

  transactions: transaction[] = [
    {
      id: 'IN0001',
      userId:1,
      userImage: 'profile-img.png',
      userName: 'James Amen',
      totalAmount: 200.00,
      status: 'paid',
    },
    {
      id: 'IN0002',
      userId:2,
      userImage: 'profile-img.png',
      userName: 'Sophia Lee',
      totalAmount: 180.00,
      status: 'paid',
    },
    {
      id: 'IN0003',
      userId:3,
      userImage: 'profile-img.png',
      userName: 'Mohamed Salim',
      totalAmount: 250.00,
      status: 'paid',
    },
    {
      id: 'IN0004',
      userId:4,
      userImage: 'profile-img.png',
      userName: 'Elena Gilbert',
      totalAmount: 210.00,
      status: 'paid',
    },
    {
      id: 'IN0005',
      userId:5,
      userImage: 'profile-img.png',
      userName: 'John Doe',
      totalAmount: 300.00,
      status: 'paid',
    },
    {
      id: 'IN0006',
      userId:6,
      userImage: 'profile-img.png',
      userName: 'Jane Smith',
      totalAmount: 150.00,
      status: 'paid',
    },
    {
      id: 'IN0007',
      userId:7,
      userImage: 'profile-img.png',
      userName: 'Michael Johnson',
      totalAmount: 400.00,
      status: 'paid',
    },
    {
      id: 'IN0008',
      userId:8,
      userImage: 'profile-img.png',
      userName: 'Emily Davis',
      totalAmount: 350.00,
      status: 'paid',
    },
    {
      id: 'IN0009',
      userId:9,
      userImage: 'profile-img.png',
      userName: 'David Brown',
      totalAmount: 500.00,
      status: 'paid',
    },
    {
      id: 'IN0010',
      userId:10,
      userImage: 'profile-img.png',
      userName: 'Sarah Wilson',
      totalAmount: 450.00,
      status: 'paid',
    },
  ]

}

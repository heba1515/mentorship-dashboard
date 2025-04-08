import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transaction } from '../interfaces/transaction';
import { TransactionsService } from '../services/transactions.service';
import { MentorsService } from '../services/mentors.service';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: transaction[] = [];
  mentorsMap: { [key: string]: string } = {};

  constructor(private transactionsService: TransactionsService, private mentorsService: MentorsService) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.transactionsService.getTransactions().subscribe(
      (data) => {
        this.transactions = data;
        this.fetchMentors();
      },
      (error) => {
        console.error('Error fetching transactions:', error);
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

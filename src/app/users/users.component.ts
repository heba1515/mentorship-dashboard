import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { message } from '../interfaces/message';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: user[] = [];
  isLoading: boolean = false;
  activeChatUserId: string | null = null;
  messageContent: string = '';

  constructor(private usersService: UsersService, private messageService: MessagesService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  toggleChat(userId: string) {
    this.activeChatUserId = this.activeChatUserId === userId ? null : userId;
  }

  sendMessage(user: user) {
    const trimmed = this.messageContent.trim();
    if (!trimmed) return;

    const message: message = {
      sender: 'Admin',
      sender_Role: 'admin',
      room: user._id,
      content: trimmed,
    };

    this.messageService.sendMessage(message).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log('Message sent:', response.data);
          this.messageContent = '';
          this.activeChatUserId = null;
        } else {
          console.warn('Unexpected status:', response.status);
        }
      },
      error: (err) => {
        console.error('Error sending message:', err);
      },
    });
  }

}

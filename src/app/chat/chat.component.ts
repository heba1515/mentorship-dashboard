import { Component } from '@angular/core';
import { user } from '../interfaces/user';
import { message } from '../interfaces/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  currentUser!: user;
  users: user[] = [];
  selectedUser!: user;
  messages: message[] = [];
  newMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getAdminDetails();

    this.usersService.getUsers().subscribe(users => {
      this.users = users.filter(u => u._id !== this.currentUser._id);
      this.selectedUser = this.users[0];
    });

    this.messagesService.getMessages().subscribe(msgs => {
      this.messages = msgs;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const msg: message = {
        sender: this.currentUser.name,
        sender_Role: 'admin',
        room: this.selectedUser._id,
        content: this.newMessage
      };

      this.messagesService.sendMessage(msg).subscribe(() => {
        this.messages.push(msg);
        this.newMessage = '';
      });
    }
  }

  isCurrentUser(msg: message): boolean {
    return msg.sender === this.currentUser.name && msg.sender_Role === 'admin';
  }

  get usersWithMessages(): user[] {
    return this.users.filter(user =>
      this.messages.some(
        msg => msg.room === user._id || msg.sender === user.name
      )
    );
  }

  get filteredMessages(): message[] {
    return this.messages.filter(msg => msg.room === this.selectedUser._id);
  }

  selectUser(user: user) {
    this.selectedUser = user;
  }

  goBack() {
    this.router.navigate(['/dashboard']).catch(() => {
      window.history.back();
    })
  }
}

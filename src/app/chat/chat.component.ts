import { Component } from '@angular/core';
import { user } from '../interfaces/user';
import { message } from '../interfaces/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { admin } from '../interfaces/admin';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  currentUser!: admin;
  users: user[] = [];
  selectedUser!: user;
  messages: message[] = [];
  newMessage = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getAdminDetails();
    this.socketService.connect(this.currentUser._id);

    this.setupSocketListeners();

    this.usersService.getUsers().subscribe(users => {
      this.users = users.filter(u => u._id !== this.currentUser._id);
      if (this.users.length > 0) {
        this.selectUser(this.users[0]);
      }
    });

    console.log('All Messages:',this.messages);
  }

  private setupSocketListeners() {
    const privateMsgSub = this.socketService.onPrivateMessage()
      .subscribe(msg => {
        console.log('Message received from socket:', msg);
        this.messages.push(msg);
      });

    this.subscriptions.push(privateMsgSub);
  }

  selectUser(user: user) {
    if (this.selectedUser?._id === user._id) return;

    this.selectedUser = user;
    console.log('selectedUser:',this.selectedUser)
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;

    const msg: message = {
      sender: this.currentUser?._id,
      sender_role: 'Admin',
      receiver: this.selectedUser?._id,
      content: this.newMessage,
      createdAt: new Date().toISOString(),
    };

    this.socketService.sendPrivateMessage(msg);
    console.log('messages:', this.messages)
    this.messages.push(msg);
    this.newMessage = '';
  }

  isCurrentUser(msg: message): boolean {
    return msg.sender === this.currentUser._id && msg.sender_role === 'admin';
  }

  get usersWithMessages(): user[] {
    console.log('userWithMsg:', this.users)
    return this.users.filter(user =>
      this.messages.some(msg =>
        msg.sender === user._id || msg.receiver === user._id
      )
    );
  }

  get filteredMessages(): message[] {
    return this.messages.filter(msg =>
      msg.receiver === this.selectedUser?._id || msg.sender === this.selectedUser?._id
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']).catch(() => {
      window.history.back();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.socketService.disconnect();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { message } from '../interfaces/message';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, SpinnerComponent, PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: user[] = [];
  paginatedUsers: user[] = [];
  isLoading: boolean = false;
  activeChatUserId: string | null = null;
  messageContent: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(
    private usersService: UsersService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.socketService.connect();
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.updatePaginatedUsers();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  toggleChat(userId: string) {
    this.activeChatUserId = this.activeChatUserId === userId ? null : userId;
  }

  sendMessage(user: user) {
    const trimmed = this.messageContent.trim();
    if (!trimmed) return;

    const admin = this.authService.getAdminDetails();
    const msg: message = {
      sender: admin,
      sender_role: admin.role.charAt(0).toUpperCase() + admin.role.slice(1) ,
      receiver: user._id,
      content: trimmed,
      createdAt: new Date().toISOString()
    };

    this.socketService.sendPrivateMessage(msg);

    console.log('Message sent via socket:', msg);
    this.messageContent = '';
    this.activeChatUserId = null;
  }

}

import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { admin } from '../interfaces/admin';
import { notification } from '../interfaces/notification';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isOpen: boolean = false;
  currentUser!: admin;
  notifications: notification[] = [];
  unreadCount: number = 0;
  showNotificationDropdown: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getAdminDetails();
    if (!this.currentUser) return;

    this.socketService.connect();
    this.fetchNotifications();

    this.subscriptions.add(
      this.socketService.listenForNotifications().subscribe((notif: notification) => {
        if (notif.type === 'message') {
          this.notifications.unshift(notif);
          this.unreadCount++;
        }
      })
    );
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe((notifs) => {
      console.log('notifs',notifs)
      this.notifications = notifs.filter(n => n.type === 'message');
      this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    });
  }

  markNotificationRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe((updated) => {
      const notif = this.notifications.find(n => n._id === notificationId);
      if (notif) notif.isRead = true;
      this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.querySelector('.dropdown button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (
      dropdownButton &&
      dropdownMenu &&
      !dropdownButton.contains(target) &&
      !dropdownMenu.contains(target)
    ) {
      this.isOpen = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.socketService.disconnect();
  }

  logout() {
    this.authService.logout();
  }
}

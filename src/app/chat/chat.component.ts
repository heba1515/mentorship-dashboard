import { Component, ElementRef, ViewChild } from '@angular/core';
import { user } from '../interfaces/user';
import { message } from '../interfaces/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { SocketService } from '../services/socket.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { admin } from '../interfaces/admin';
import { MessagesService } from '../services/messages.service';
import { MentorsService } from '../services/mentors.service';
import { mentor } from '../interfaces/mentor';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, RouterModule, SpinnerComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  currentUser!: admin;
  selectedContact!: user;
  usersWithMessages: user[] = [];
  messages: message[] = [];
  newMessage = '';
  isLoading: boolean = false;
  searchTerm: string = '';
  filteredUsers: user[] = [];
  private subscriptions = new Subscription();

  @ViewChild('chatBody') private chatBody!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private socketService: SocketService,
    private usersService: UsersService,
    private mentorsService: MentorsService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getAdminDetails();
    if (!this.currentUser) return;

    this.socketService.connect();
    this.isLoading = true;

    this.subscriptions.add(
      this.messageService.getPrivateMessages().subscribe(async (msgs) => {
        console.log(msgs)
        this.messages = msgs;
        this.usersWithMessages = await this.extractUniqueContacts(this.messages);
        this.filteredUsers = [...this.usersWithMessages];
        this.isLoading = false;
        console.log(this.usersWithMessages)
      }, error => {
        console.error('Error fetching private messages', error);
        this.isLoading = false;
      })
    );

    this.subscriptions.add(
      this.socketService.onPrivateMessage().subscribe(async (msg) => {
        if (!this.currentUser) return;
        if (
          msg.receiver === this.currentUser._id
        ) {
          this.messages.push(msg);

          const knownIds = this.usersWithMessages.map(u => u._id);
          const otherUserId = msg.sender._id !== this.currentUser._id ? msg.sender._id : msg.receiver;

          if (!knownIds.includes(otherUserId)) {
            try {
              const users = await firstValueFrom(this.usersService.getUsers());
              const newUser = users.find(u => u._id === otherUserId);
              if (newUser) {
                this.usersWithMessages.push(newUser);
                this.filteredUsers = this.usersWithMessages.filter(u =>
                  u.name.toLowerCase().includes(this.searchTerm)
                );
              }
            } catch (err) {
              console.error('Error loading user for new incoming message:', err);
            }
          }
        }
      })
    );
  }

  async extractUniqueContacts(messages: message[]): Promise<any[]> {
    const userContactsMap: { [id: string]: user } = {};
    const mentorContactsMap: { [id: string]: mentor } = {};
    if (!this.currentUser) return [];

    try {
      const allUsers = await firstValueFrom(this.usersService.getUsers());
      const usersById = new Map(allUsers.map(u => [u._id, u]));
      const allMentors = await firstValueFrom(this.mentorsService.getMentors());
      const mentorsById = new Map(allMentors.map(m => [m._id, m]));

      for (const msg of messages) {
        const contactIds = [
          msg.sender._id !== this.currentUser._id ? msg.sender._id : null,
          msg.receiver !== this.currentUser._id ? msg.receiver : null
        ];

        for (const id of contactIds) {
          if (id && !userContactsMap[id] && usersById.has(id)) {
            userContactsMap[id] = usersById.get(id)!;
          }
          else if (id && !mentorContactsMap[id] && mentorsById.has(id)) {
            mentorContactsMap[id] = mentorsById.get(id)!;
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch users for contact list', err);
    }


    const contactsMap = {
      ...userContactsMap,
      ...mentorContactsMap
    }
    return Object.values(contactsMap);
  }

  selectContact(user: user) {
    this.selectedContact = user;
    console.log('selected', this.selectedContact)
  }

  get selectedMessages(): message[] {
    if (!this.selectedContact || !this.currentUser) return [];
    return this.messages.filter(
      (msg) =>
        (msg.sender._id === this.currentUser._id && msg.receiver === this.selectedContact._id) ||
        (msg.sender._id === this.selectedContact._id && msg.receiver === this.currentUser._id)
    );
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedContact || !this.currentUser) return;

    const msg: message = {
      sender: this.currentUser,
      sender_role: this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1),
      receiver: this.selectedContact._id,
      content: this.newMessage,
      createdAt: new Date().toISOString(),
    };

    console.log("Sending private message:", msg);
    this.socketService.sendPrivateMessage(msg);
    this.messages.push(msg);
    this.newMessage = '';
  }

  isCurrentUser(msg: message): boolean {
    return this.currentUser ? msg.sender._id === this.currentUser._id : false;
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  onSearchChange(term: string) {
    this.searchTerm = term.toLowerCase().trim();
    this.filteredUsers = this.usersWithMessages.filter(u =>
      u.name.toLowerCase().includes(this.searchTerm)
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.socketService.disconnect();
  }
}

import { Component } from '@angular/core';
import { ChatComponent } from '../../chat/chat.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-chat-layout',
  imports: [HeaderComponent ,ChatComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {

}

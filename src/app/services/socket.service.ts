import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  connect() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  sendPrivateMessage(message: message) {
    this.socket.emit('send_private_msg', message);
  }

  onPrivateMessage(): Observable<message> {
    return new Observable<message>((observer) => {
      this.socket.on('receive_private_msg', (data: message) => {
        observer.next(data);
        // console.log('data', data)
      });
    });
  }

  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
}

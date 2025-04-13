import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  connect(userId: string) {
    this.socket = io('http://localhost:3000', {
      query: { userId },
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendPrivateMessage(message: message) {
    this.socket.emit('send_private_msg', message);
  }

  onPrivateMessage(): Observable<message> {
    return new Observable<message>(observer => {
      this.socket.on('receive_private_msg', (data: message) => {
        observer.next(data);
      });
    });
  }

  // emit(event: string, data?: any) {
  //   this.socket.emit(event, data);
  // }

  // listen<T>(event: string): Observable<T> {
  //   return new Observable<T>((subscriber) => {
  //     this.socket.on(event, (data: T) => subscriber.next(data));
  //   });
  // }
}

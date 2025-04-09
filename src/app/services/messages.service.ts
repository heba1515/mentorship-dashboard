import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = 'http://localhost:3000/api/v1/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<message[]> {
    return this.http.get<{ status: string; data: message[] }>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }

  sendMessage(message: message): Observable<any> {
    return this.http.post<{ status: string; data: any }>(this.apiUrl, message);
  }
}

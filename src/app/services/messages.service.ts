import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = 'http://localhost:3000/api/v1/messages';

  constructor(private http: HttpClient) {}

  getPrivateMessages(): Observable<message[]> {
    return this.http.get<{ status: string; data: message[] }>(
      `${this.apiUrl}/privateContacts`,
      { withCredentials: true}
    ).pipe(
      map(res => res.data)
    );
  }
}

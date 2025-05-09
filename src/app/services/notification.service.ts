import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { notification } from '../interfaces/notification';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/v1/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<notification[]> {
    return this.http.get<{ status: string; data: notification[] }>(
      this.apiUrl,{
        withCredentials: true
      })
      .pipe(map(res => res.data));
  }

  markAsRead(notificationId: string): Observable<notification> {
    return this.http.post<{ status: string; data: notification }>(
      `${this.apiUrl}/`,
      { id: notificationId },
      {
        withCredentials: true
      }
    ).pipe(map(res => res.data));
  }
}

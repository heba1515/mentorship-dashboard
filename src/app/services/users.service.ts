import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(): Observable<user[]> {
    return this.http.get<{ success: boolean; users: user[] }>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to fetch users');
        }
        return response.users;
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to load users. Please try again.'));
      })
    );
  }

  getAdmins(): Observable<user[]> {
    return this.http.get<{ success: boolean; admins: user[] }>(
      `${this.apiUrl}/admins`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to fetch admin users');
        }
        return response.admins;
      }),
      catchError(error => {
        console.error('Error fetching admin users:', error);
        return throwError(() => new Error('Failed to load admin users. Please try again.'));
      })
    );
  }
}

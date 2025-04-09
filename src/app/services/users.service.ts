import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from '../interfaces/user';
import { admin } from '../interfaces/admin';

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
    return this.http.get<{ success: string; users: user[] }>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map((response) => response.users)
    );
  }

  getAdmins(): Observable<admin[]> {
    return this.http.get<{ success: string; message: string; data: admin[] }>(
      `${this.apiUrl}/admins`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  addAdmin(newAdmin: Partial<admin>): Observable<admin> {
    return this.http.post<{ status: string; message: string; data: admin }>(
      `${this.apiUrl}/admins`,
      newAdmin,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }
}

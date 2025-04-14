import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from '../interfaces/user';
import { admin } from '../interfaces/admin';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers(): Observable<user[]> {
    return this.http.get<{ success: string; users: user[] }>(
      this.apiUrl,
      { headers: this.auth.getAuthHeaders() }
    ).pipe(
      map((response) => response.users)
    );
  }

  getAdmins(): Observable<admin[]> {
    return this.http.get<{ success: string; message: string; data: admin[] }>(
      `${this.apiUrl}/admins`,
      { headers: this.auth.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  addAdmin(newAdmin: Partial<admin>): Observable<admin> {
    return this.http.post<{ status: string; message: string; data: admin }>(
      `${this.apiUrl}/admins`,
      newAdmin,
      { headers: this.auth.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }
}

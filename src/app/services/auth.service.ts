import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/v1/auth/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password, role }, {withCredentials: true}).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('adminDetails', JSON.stringify(response.data));
          this.isLoggedInSubject.next(true);
          return response.data;
        }
        return null;
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminDetails');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAdminDetails() {
    const adminDetails = localStorage.getItem('adminDetails');
    return adminDetails ? JSON.parse(adminDetails) : null;
  }

  getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
}

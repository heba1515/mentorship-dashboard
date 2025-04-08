import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private apiUrl = 'http://localhost:3000/api/v1/sessions';

  constructor(private http: HttpClient) { }

  getSessions(): Observable<session[]> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ status: string; message: string; data: session[] }>(this.apiUrl, { headers }).pipe(
      map((response) => response.data) 
    );
  }
}

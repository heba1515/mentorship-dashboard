import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mentor } from '../interfaces/mentor';

@Injectable({
  providedIn: 'root'
})
export class MentorsService {
  private apiUrl = 'http://localhost:3000/api/v1/mentors';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMentors(): Observable<mentor[]> {
    return this.http.get<{ status: string; message: string; data: mentor[] }>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  activateMentor(mentorId: string): Observable<mentor> {
    return this.http.post<{ status: string; message: string; data: mentor }>(
      `${this.apiUrl}/${mentorId}/activate`,
      {}, 
      { headers: this.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  deactivateMentor(mentorId: string): Observable<mentor> {
    return this.http.post<{ status: string; message: string; data: mentor }>(
      `${this.apiUrl}/${mentorId}/deactivate`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }
}

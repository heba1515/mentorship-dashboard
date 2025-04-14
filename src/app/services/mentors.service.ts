import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mentor } from '../interfaces/mentor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MentorsService {
  private apiUrl = 'http://localhost:3000/api/v1/mentors';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMentors(): Observable<mentor[]> {
    return this.http.get<{ status: string; message: string; data: mentor[] }>(
      this.apiUrl,
      { headers: this.auth.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  activateMentor(mentorId: string): Observable<mentor> {
    return this.http.post<{ status: string; message: string; data: mentor }>(
      `${this.apiUrl}/${mentorId}/activate`,
      {},
      { headers: this.auth.getAuthHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }
}

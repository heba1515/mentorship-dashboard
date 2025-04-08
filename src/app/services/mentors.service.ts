import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mentor } from '../interfaces/mentor';

@Injectable({
  providedIn: 'root'
})
export class MentorsService {
  private apiUrl = 'http://localhost:3000/api/v1/mentors';

  constructor(private http: HttpClient) { }

  getMentors(): Observable<mentor[]> {
    return this.http.get<{ status: string; message: string; data: mentor[] }>(this.apiUrl).pipe(
      map((response) => response.data) 
    );
  }
}

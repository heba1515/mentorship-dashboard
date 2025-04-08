import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:3000/api/v1/bookings';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<transaction[]> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ status: string; data: { docs: transaction[] } }>(this.apiUrl, { headers }).pipe(
      map((response) => response.data.docs) 
    );
  }
}

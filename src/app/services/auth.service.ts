import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(email: string, password: string): boolean {
    if (email === 'admin@example.com' && password === 'password123') {
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }
}

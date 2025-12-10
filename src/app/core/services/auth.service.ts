import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Signin, Signup } from '../models/auth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private PLATFORM = inject(PLATFORM_ID);

  // userToken: BehaviorSubject<any> = new BehaviorSubject('');
  token = localStorage.getItem('token');
  user: WritableSignal<any> = signal(null);
  constructor() {
    if (isPlatformBrowser(this.PLATFORM)) {
      if (this.token !== null) {
        this.userInfo();
      }
    }
  }
  userInfo() {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.user.set(decoded);
  }

  signup(userData: Signup): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/signUp`, userData, {
      headers: { token: `3b8ny__${this.token}` },
    });
  }
  signin(userData: Signin): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/signIn`, userData, {
      headers: { token: `3b8ny__${this.token}` },
    });
  }
}

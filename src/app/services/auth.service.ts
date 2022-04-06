import { EventEmitter, Injectable, Output } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
  }
  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.getLoggedInStatus.emit(false);
  }

  login(loginInfo: Login) {
    return this.http.get('https://60dff0ba6b689e001788c858.mockapi.io/tokens');
  }

  getUser(userId: number) {
    return this.http.get<User>(`https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`);
  }
}

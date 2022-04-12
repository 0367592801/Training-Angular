import { EventEmitter, Injectable, Output } from '@angular/core';
import { Login } from '../model/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

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

  getUser(userId: number):Observable<User> {
    return this.http.get<User>(`https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`);
  }
}

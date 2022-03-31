import { EventEmitter, Injectable, Output } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.getLoggedInStatus.emit(false);
  }

  login(loginInfo: Login) {
    return this.http.get('https://60dff0ba6b689e001788c858.mockapi.io/tokens');
  }
}

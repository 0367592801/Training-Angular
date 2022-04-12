import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../../services/auth.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoginPage: boolean = false;
  userId: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getLoggedInStatus.subscribe((value) => {
      console.log('call');
      this.isLoggedIn = value;
    });
    this.isLoggedIn = this.authService.isLoggedIn;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {

        if (localStorage.getItem('user'))
          this.userId = JSON.parse(localStorage.getItem('user') ?? '')?.userId;
        event.url === '/login'
          ? (this.isLoginPage = true)
          : (this.isLoginPage = false);
        if (event.url === '/') {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}

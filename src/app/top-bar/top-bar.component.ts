import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoginPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.getLoggedInStatus.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') {
          this.isLoginPage = true;
        } else {
          this.isLoginPage = false;
        }
      }
    });
  }
}

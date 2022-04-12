import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  message: string = '';
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.required],
      ],
    });
    this.authService.logout();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.message = 'Wrong username or password';
      return;
    } else {
      let loginInfo = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authService.login(loginInfo).subscribe((data: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data));
        this.authService.getLoggedInStatus.emit(true);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome!!',
          footer: 'Have a nice trip!',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/home']);
      });
    }
  }
}

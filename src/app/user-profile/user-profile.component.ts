import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  user: User | undefined;
  
  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    let userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.user = await firstValueFrom(this.authService.getUser(userId));
  }

}

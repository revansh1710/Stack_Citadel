import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string = ''; 

  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const userData = JSON.parse(userJson);
      if (userData && userData.email) {
        this.userEmail = userData.email;
      } else {
        console.error('Invalid user data found in localStorage: email property is missing or invalid');
        localStorage.removeItem('user');
      }
    } 
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
  }
}

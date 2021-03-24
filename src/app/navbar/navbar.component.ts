import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAuthSaved: boolean;
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    // get user state if user or not
    // by checking if there is token in local stroage
    this.isAuthSaved = this.authService.getToken() ? true : false;
    // update user state at run time
    this.authService.isAuthenticatedUser().subscribe((auth) => {
      this.isAuthenticated = auth ? true : false;
    });
  }
  // logout form site
  onLogout(): void {
    this.isAuthSaved = false;
    this.authService.logout();
  }
}

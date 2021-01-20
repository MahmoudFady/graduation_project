import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAuthSaved: boolean;
  constructor(public authService: AuthService) { }
  ngOnInit(): void {
    this.isAuthSaved = this.authService.getToken() ? true : false;
    this.authService.isAuthenticated.subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
      console.log(this.isAuthenticated);

    });
    console.log(this.isAuthenticated);
  }
  onLogout(): void {
    this.isAuthSaved = false;
    this.authService.logout();
  }
}

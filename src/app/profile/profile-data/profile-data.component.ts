import { AuthService, UserData } from './../../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css'],
})
export class ProfileDataComponent implements OnInit {
  @Input() userData: UserData;
  isAdminSaved = false;
  activeUserId: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.isAdminSaved = this.authService.getIsAdmin() ? true : false;
    this.activeUserId = this.authService.getLocalStorageData()._id;
  }
  onLogout(): void {
    this.authService.logout();
  }
}

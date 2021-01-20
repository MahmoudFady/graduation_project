import { AuthService, UserData } from './../../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['../profile.component.css', './profile-data.component.css'],
})
export class ProfileDataComponent implements OnInit {
  @Input() userData: UserData;
  activeUserId: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.activeUserId = this.authService.getLocalStorageData()._id;
    console.log(this.activeUserId);
  }
  onLogout(): void {
    this.authService.logout();
  }
}

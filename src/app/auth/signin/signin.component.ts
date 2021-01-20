import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  errorMsg: string = null;
  loading: boolean;
  signinData: { userEmail: string; userPassword: string } = {
    userEmail: '',
    userPassword: '',
  };
  constructor(public autService: AuthService) {}
  ngOnInit(): void {}
  onSignin(signinForm: NgForm): void {
    this.loading = true;
    this.signinData = signinForm.value;
    const { userEmail, userPassword } = signinForm.value;
    this.autService.signin(userEmail, userPassword);
    this.autService.errMsg.subscribe((resualt) => {
      setTimeout(() => {
        this.errorMsg = resualt;
        this.loading = false;
      }, 1200);
    });
  }
}

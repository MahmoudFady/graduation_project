import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SignupComponent],
  imports: [ReactiveFormsModule, RouterModule, SharedModule],
})
export class SignupModule {}

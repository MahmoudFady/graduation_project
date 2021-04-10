import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { SigninComponent } from './signin.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SigninComponent],
  imports: [FormsModule, RouterModule, SharedModule],
})
export class SigninModule {}

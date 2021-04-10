import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SignupComponent],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [SignupComponent],
})
export class SignupModule {}

import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { SigninComponent } from './signin.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SigninComponent],
  imports: [FormsModule, SharedModule],
  exports: [SigninComponent],
})
export class SigninModule {}

import { RouterModule } from '@angular/router';
import { PostListModule } from '../create-post/posts-list/post-list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TestimonialModule } from './../home/testimonial/testimonial.module';
import { SharedModule } from './../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDataComponent,
    ViewProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TestimonialModule,
    PostListModule,
    SharedModule,
  ],
})
export class ProfileModule {}

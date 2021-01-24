import { SinglePostComponent } from './create-post/post-single/post-single.component';
import { JobsComponent } from './jobs/jobs.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  { path: 'search', component: SearchComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'view-profile/:id',
    component: ViewProfileComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'post/:postId', component: SinglePostComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

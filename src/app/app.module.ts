import { AuthInterceptor } from './auth/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './create-post/post.service';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoadingComponent } from './loading/loading.component';
import { AlertDangerComponent } from './alert-danger/alert-danger.component';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { JobsComponent } from './jobs/jobs.component';
import { TestimonialService } from './home/testimonial/testimonial.service';
import { BannerComponent } from './home/banner/banner.component';
import { BlogsComponent } from './home/blogs/blogs.component';
import { FeaturesComponent } from './home/features/features.component';
import { ServicesComponent } from './home/services/services.component';
import { SubscribeComponent } from './home/subscribe/subscribe.component';
import { TestimonialComponent } from './home/testimonial/testimonial.component';
import { AddTestimonialComponent } from './home/testimonial/add-testimonial/add-testimonial.component';
import { TestimonialListComponent } from './home/testimonial/testimonial-list/testimonial-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    SigninComponent,
    ProfileComponent,
    SignupComponent,
    HomeComponent,
    CreatePostComponent,
    PostsListComponent,
    EditProfileComponent,
    ErrorPageComponent,
    ProfileDataComponent,
    ViewProfileComponent,
    JobsComponent,
    LoadingComponent,
    AlertDangerComponent,
    AlertSuccessComponent,
    BannerComponent,
    ServicesComponent,
    FeaturesComponent,
    SubscribeComponent,
    BlogsComponent,
    TestimonialComponent,
    AddTestimonialComponent,
    TestimonialListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    PostService,
    AuthService,
    AuthGuard,
    TestimonialService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { SearchModule } from './search/search.module';
import { JobsModule } from './jobs/jobs.module';
import { PostSingleModule } from './create-post/post-single/post-single.module';
import { ProfileModule } from './profile/profile.module';
import { HomeModule } from './home/home.module';

import { AuthInterceptor } from './auth/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CreatePostModule } from './create-post/create-post.module';
import { SigninModule } from './auth/signin/sigin.module';
import { SignupModule } from './auth/signup/signup.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ErrorPageComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    ProfileModule,
    CreatePostModule,
    PostSingleModule,
    JobsModule,
    SearchModule,
    SigninModule,
    SignupModule,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

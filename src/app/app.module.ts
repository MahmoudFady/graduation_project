import { PostModule } from './create-post/post.module';
import { ProfileModule } from './profile/profile.module';
import { HomeModule } from './home/home.module';

import { AuthInterceptor } from './auth/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ErrorPageComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    ProfileModule,
    PostModule,
    AuthModule,
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

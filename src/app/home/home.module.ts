import { RouterModule } from '@angular/router';
import { CreatePostModule } from './../create-post/create-post.module';
import { SignupModule } from './../auth/signup/signup.module';
import { SigninModule } from './../auth/signin/sigin.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ServicesComponent } from './services/services.component';
import { FeaturesComponent } from './features/features.component';
import { BannerComponent } from './banner/banner.component';
import { TestimonialModule } from './testimonial/testimonial.module';
import { NgModule } from '@angular/core';
import { SubscribeComponent } from './subscribe/subscribe.component';
@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    FeaturesComponent,
    ServicesComponent,
    BlogsComponent,
    SubscribeComponent,
    SponsorComponent,
    FooterComponent,
  ],
  imports: [RouterModule, TestimonialModule],
})
export class HomeModule {}

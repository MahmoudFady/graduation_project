import {
  Testimonial,
  TestimonialService,
} from './../home/testimonial/testimonial.service';
import { Post } from '../create-post/post.model';
import { AuthService, UserData } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  userId: string = '';
  userPosts: Post[];
  userReviews: Testimonial[];
  userData: UserData = {
    profileImage: '',
    _id: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userBigCity: '',
    userCity: '',
    job: '',
  };
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.authService
      .getUserById(this.userId)
      .subscribe(
        (getUserResualt: {
          message: string;
          user: UserData;
          userPosts: Post[];
        }) => {
          this.userData = getUserResualt.user;
          this.userPosts = getUserResualt.userPosts;
        }
      );
    this.testimonialService.getReview(this.userId);
    this.userReviews = this.testimonialService._testtimonials;
    this.testimonialService.getUpdatedTestimonials().subscribe((testis) => {
      this.userReviews = testis;
    });
    console.log(this.userReviews);
  }
}

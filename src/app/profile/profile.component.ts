import {
  Testimonial,
  TestimonialService,
} from './../home/testimonial/testimonial.service';
import { PostService } from '../create-post/post.service';
import { Post } from '../create-post/post.model';
import { Component, OnInit } from '@angular/core';
import { AuthService, UserData } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  err: string = null;
  userPosts: Post[] = [];
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
  userReviews: Testimonial[] = [];

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private testimonialService: TestimonialService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.postService.getUpdatedPosts().subscribe((posts) => {
      this.userPosts = posts;
    });
    const userId = this.authService.getLocalStorageData()._id;
    this.authService.getUserById(userId).subscribe(
      (getUserResponse: {
        message: string;
        user: UserData;
        userPosts: Post[];
      }) => {
        if (getUserResponse) {
          this.userData = getUserResponse.user;
          this.userPosts = getUserResponse.userPosts;
          this.loading = false;
        }
      },
      (err: any) => {
        this.loading = false;
        this.err = 'لا يوجد اتصال بالانترنت';
      }
    );
    this.testimonialService.getReview(userId);
    this.testimonialService.getUpdatedTestimonials().subscribe((testis) => {
      this.userReviews = testis;
    });
  }
}

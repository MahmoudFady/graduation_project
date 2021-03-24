import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/create-post/post.service';
import { Post } from 'src/app/create-post/post.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  posts: Post[];
  postedJobs: string[] = [];
  errMsg: string = null;
  loading = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loading = true;
    this.postService.getAllPosts();
    this.postService.updatedUserPosts.subscribe((posts) => {
      if (posts) {
        this.posts = posts;
        this.posts.forEach((post) => {
          if (!this.postedJobs.includes(post.job)) {
            this.postedJobs.push(post.job);
          }
        });
        setTimeout(() => {
          this.loading = false;
          this.errMsg = null;
          this.errMsg = null;
        }, 600);
      } else {
        this.posts = null;
        this.loading = false;
        this.errMsg = 'لا يوجد اتصال بالانترنت';
      }
    });
  }
}

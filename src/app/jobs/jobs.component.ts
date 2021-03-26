import { JobService } from './jobs.service';
import { Post } from './../create-post/post.model';
import { SocketIoService } from './../shared/socket-io.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/create-post/post.service';

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

  constructor(
    private postService: PostService,
    private socketIOService: SocketIoService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.socketIOService.joinRoom('allJobsRoom');
    this.loading = true;
    this.jobService.getAllJobs();
    this.jobService.getUpdatedJobs().subscribe((posts) => {
      if (posts) {
        this.posts = posts;
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
    this.jobService.getUpdatedJobLinks().subscribe((links) => {
      this.postedJobs = links;
    });
    this.socketIOService.socket.on('onGetPost', (post: Post) => {
      this.jobService.addJob(post);
    });
    this.socketIOService.socket.on('onGetDeletedPostId', (postId) => {
      this.jobService.deleteJob(postId);
    });
  }
  ngOnDestroy(): void {
    this.socketIOService.disconnectUser('allJobsRoom');
  }
}

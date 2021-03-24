import { PostService } from 'src/app/create-post/post.service';
import { ElementRef, Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'job-links',
  templateUrl: './job-links.component.html',
  styleUrls: ['./job-links.component.css'],
})
export class JobLinks {
  @Input() postedJobs: string[] = [];
  constructor(private postService: PostService) {}
  getPosts(job: string, ele: HTMLElement) {
    document.querySelectorAll('ul li').forEach((li) => {
      li.classList.remove('active');
    });
    ele.classList.add('active');
    this.postService.getPostByJob(job);
  }
}

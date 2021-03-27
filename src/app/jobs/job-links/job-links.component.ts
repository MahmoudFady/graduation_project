import { JobService } from './../jobs.service';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'job-links',
  templateUrl: './job-links.component.html',
  styleUrls: ['./job-links.component.css'],
})
export class JobLinks {
  @Input() postedJobs: string[] = [];
  constructor(private jobService: JobService) {}
  getPosts(job: string, ele: HTMLElement) {
    document.querySelectorAll('ul li').forEach((li) => {
      li.classList.remove('active');
    });
    ele.classList.add('active');
    this.jobService.getPostByJob(job);
  }
}

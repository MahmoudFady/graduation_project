import { PostService } from './../create-post/post.service';
import { Subject, Observable } from 'rxjs';
import { Post } from './../create-post/post.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobs: Post[];
  private updatedJobs = new Subject<Post[]>();
  private jobLinks: string[] = [];
  private updateJobLinks = new Subject<string[]>();
  constructor(private postService: PostService) {}
  getJobLinks(jobs: Post[]) {
    this.jobLinks = [];
    console.log(jobs);
    jobs.forEach((job) => {
      if (!this.jobLinks.includes(job.job)) {
        this.jobLinks.push(job.job);
      }
    });
    console.log(this.jobLinks);

    this.updateJobLinks.next(this.jobLinks);
  }
  addJob(job: Post) {
    this.jobs.push(job);
    this.getJobLinks(this.jobs);
    this.updatedJobs.next(this.jobs);
  }
  deleteJob(jobId: string) {
    const jobIndex = this.jobs.findIndex((job) => job._id === jobId);
    this.jobs.splice(jobIndex, 1);
    this.getJobLinks(this.jobs);
    this.updatedJobs.next(this.jobs);
  }
  getAllJobs() {
    this.postService.getAllPosts();
    this.postService.getUpdatedPosts().subscribe((posts) => {
      this.jobs = posts;
      this.getJobLinks(this.jobs);
      this.updatedJobs.next(this.jobs);
    });
  }
  getUpdatedJobs(): Observable<Post[]> {
    return this.updatedJobs.asObservable();
  }
  getUpdatedJobLinks(): Observable<string[]> {
    return this.updateJobLinks.asObservable();
  }
}

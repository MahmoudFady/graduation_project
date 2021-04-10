import { PostListModule } from '../create-post/posts-list/post-list.module';
import { JobLinksComponent } from './job-links/job-links.component';
import { JobsComponent } from './jobs.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [JobsComponent, JobLinksComponent],
  imports: [PostListModule],
})
export class JobsModule {}

import { SinglePostComponent } from './post-single.component';
import { CommentModule } from './comment.module';
import { PostListModule } from '../posts-list/post-list.module';
import { NgModule } from '@angular/core';
import { ViewSinglePostComponent } from './view-single-post/view-single-post.component';

@NgModule({
  declarations: [SinglePostComponent, ViewSinglePostComponent],
  imports: [CommentModule, PostListModule, CommentModule],
  exports: [SinglePostComponent, ViewSinglePostComponent],
})
export class PostSingleModule {}

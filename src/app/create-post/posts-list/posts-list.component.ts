import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[];
  userId: string = null;
  deleltePost = false;
  displayedImageUrl: string = null;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.deleltePost = false;
    this.userId = this.authService.getLocalStorageData()._id;
  }
  // GET THE CREATOR OF POST
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/view-profile/${id}`]);
    }
  }
  // DELETE POST
  onDeletePost(postId: string) {
    this.deleltePost = true;
    console.log(postId);
    this.postService.deletePost(postId);
    setTimeout(() => {
      this.deleltePost = false;
    }, 1200);
  }
  // ADD NEW COMMENT TO POST'S COMMENTS
  onAddComment(postId: string) {
    this.router.navigate(['/post/' + postId]);
  }
  // get image url
  displayImage(url: string): void {
    this.displayedImageUrl = url;
    console.log(this.displayedImageUrl);
  }
  // close displayedImage
  closeImage() {
    this.displayedImageUrl = null;
    console.log(this.displayedImageUrl);
  }
}

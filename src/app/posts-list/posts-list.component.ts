import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../shared/post.model';
import { PostService } from '../create-post/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[];
  userId: string = null;
  deleltePost = false;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.deleltePost = false;
    this.userId = this.authService.getLocalStorageData()._id;
  }
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/view-profile/${id}`]);
    }
  }
  onDeletePost(id: string) {
    this.deleltePost = true;
    console.log(id);
    this.postService.deletePost(id);
    setTimeout(() => {
      this.deleltePost = false;
    }, 1200);
  }
}

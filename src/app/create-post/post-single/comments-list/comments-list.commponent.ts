import { Comment } from './../../../shared/comment.model';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from '../../post.service';
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.commponent.html',
  styleUrls: ['../post-single.component.css'],
})
export class CommentsListComponent {
  @Input() postComments: Comment[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  // GET THE CREATOR OF POST
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/view-profile/${id}`]);
    }
  }
}

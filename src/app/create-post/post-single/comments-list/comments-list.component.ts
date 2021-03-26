import { CommentService } from './../comment.service';
import { Comment } from '../create-comment/comment.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.commponent.html',
  styleUrls: ['./comments-list.component.css'],
})
export class CommentsListComponent implements OnInit {
  @Input() postComments: Comment[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    console.log(this.postComments.length);

    this.commentService.getUpdatedComments().subscribe((newComments) => {
      this.postComments = newComments;
    });
  } // GET THE CREATOR OF POST
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/view-profile/${id}`]);
    }
  }
}

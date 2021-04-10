import { SocketIoService } from './../../../shared/socket-io.service';
import { CommentService } from './../comment.service';
import { Comment } from '../create-comment/comment.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.commponent.html',
  styleUrls: ['./comments-list.component.css'],
})
export class CommentsListComponent implements OnInit {
  @Input() postComments: Comment[] = [];
  userId: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private socketIoService: SocketIoService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.commentService.initComments(this.postComments);
  }
  ngOnInit() {
    this.userId = this.authService.getLocalStorageData()['_id'];
    this.commentService.getUpdatedComments().subscribe((newComments) => {
      this.postComments = newComments;
    });
    // => listin if comment deleted
    this.socketIoService.socket.on(
      'onGetDeletedComment',
      (commentId: string) => {
        this.commentService.deleteCommentIo(commentId);
      }
    );
    this.socketIoService.socket.on(
      'onGetComment',
      (resualt: { newComment: Comment; joinPath: string }) => {
        this.postComments.push(resualt.newComment);
      }
    );
  } // GET THE CREATOR OF POST
  onDeleteComment(commentId: string) {
    this.route.params.subscribe((param: Params) => {
      this.commentService.deleteComment(commentId, param['postId']);
    });
  }
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/view-profile/${id}`]);
    }
  }
}

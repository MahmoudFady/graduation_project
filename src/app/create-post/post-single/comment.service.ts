import { SocketIoService } from './../../shared/socket-io.service';
import { AuthService } from './../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Comment } from './create-comment/comment.model';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments: Comment[];
  private updatedComments = new Subject<Comment[]>();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketIoService: SocketIoService
  ) {}
  initComments(updatedComments: Comment[]) {
    this.comments = updatedComments;
    this.updatedComments.next(this.comments);
  }
  addComment(postId: string, commentText: string, commentImages: FileList) {
    const formData = new FormData();
    formData.append('commentText', commentText);
    if (commentImages) {
      for (const index in commentImages) {
        formData.append('commentImages', commentImages[index]);
      }
    }
    this.http
      .post('http://localhost:3000/api/comment/addComment/' + postId, formData)
      .subscribe((resualt: { message: string; newComment: Comment }) => {
        const {
          _id,
          userName,
          profileImage,
        } = this.authService.getLocalStorageData();
        const newComment = {
          ...resualt.newComment,
          creator: { _id, userName, profileImage },
        };
        this.socketIoService.onAddComment(newComment, 'postid=' + postId);
        this.comments.push(newComment);
        this.updatedComments.next(this.comments);
      });
  }

  //LISTEN TO updatedComments OF ANY USER ADD NEW COMMENT
  getUpdatedComments(): Observable<Comment[]> {
    return this.updatedComments.asObservable();
  }
}

import { AuthService } from './../auth/auth.service';
import { Comment } from './../shared/comment.model';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from '../shared/post.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class PostService {
  private userPosts: Post[] = [];
  private _comments: Comment[] = [];
  comments = new Subject<Comment[]>();
  updatedUserPosts = new Subject<Post[]>();
  // BASIC URL TO POST ROUTES AT SERVER
  private url = 'http://localhost:3000/api/post/';
  constructor(private http: HttpClient, private authService: AuthService) {}
  // REVERS USER POSTS FUCTION ###########
  reverUserPosts(userPosts: Post[]) {
    this.userPosts = userPosts.reverse();
    this.updatedUserPosts.next(this.userPosts);
  }
  // ADDING POSTS FUCTION ################
  addPost(
    job: string,
    creatorPhone: string,
    creatorBigCity: string,
    creatorCity: string,
    postText: string,
    postImages: FileList,
    createByWorker: string
  ) {
    let formData = new FormData();
    const date = new Date().toLocaleDateString();
    formData.append('job', job);
    formData.append('creatorPhone', creatorPhone);
    formData.append('creatorBigCity', creatorBigCity);
    formData.append('creatorCity', creatorCity);
    if (postImages) {
      for (const img in <FileList>postImages) {
        formData.append('postImages', postImages[img]);
      }
    }
    formData.append('postText', postText);
    formData.append('createByWorker', createByWorker);
    formData.append('postDate', date);
    return this.http.post(this.url + 'addPost', formData);
  }
  // DELETE POST BY ID ################

  deletePost(postId: string) {
    console.log('delete post');
    const userPosts = this.userPosts.filter((post) => {
      return post._id !== postId;
    });
    this.userPosts = userPosts;
    this.updatedUserPosts.next(this.userPosts);
    this.http
      .delete<{ message: string }>(this.url + 'deletePost/' + postId)
      .subscribe((resualt) => {
        console.log(resualt.message);
      });
  }
  // GET ALL USERS POSTS #################3
  getAllPosts() {
    this.http.get<{ message: string; posts: Post[] }>(this.url).subscribe(
      (resualt: { message: string; posts: Post[] }) => {
        this.userPosts = resualt.posts.reverse();
        this.updatedUserPosts.next(this.userPosts);
      },
      (err) => {
        this.userPosts = null;
        this.updatedUserPosts.next(this.userPosts);
      }
    );
  }
  // GET POST BY ID FUNCTION
  getPostById(postId: string) {
    return this.http.get<{ message: string; post: Post }>(this.url + postId);
  }
  addComment(
    oldComments: Comment[],
    postId: string,
    commentText: string,
    commentImages: FileList
  ) {
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
        oldComments.push(newComment);
        this._comments = oldComments;
        this.comments.next(this._comments);
      });
  }
  //LISTEN TO COMMENTS OF ANY USER ADD NEW COMMENT
  getUpdatedComments(): Observable<Comment[]> {
    return this.comments.asObservable();
  }
}

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PostService {
  private userPosts: Post[] = [];
  private updatedUserPosts = new Subject<Post[]>();
  // BASIC URL TO POST ROUTES AT SERVER
  private url = 'http://localhost:3000/api/post/';
  constructor(private http: HttpClient) {}
  // REVERS USER POSTS FUCTION ###########

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
    const postIndex = this.userPosts.findIndex((post) => post._id === postId);
    this.userPosts.splice(postIndex, 1);
    this.updatedUserPosts.next(this.userPosts);
    this.http
      .delete<{ message: string }>(this.url + 'deletePost/' + postId)
      .subscribe((resualt) => {});
  }

  // GET ALL USERS POSTS #################3
  getAllPosts() {
    this.http.get<{ message: string; posts: Post[] }>(this.url).subscribe(
      (resualt: { message: string; posts: Post[] }) => {
        this.userPosts = resualt.posts;
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
  // FILTER POSTS BY POST JOB
  getPostByJob(job: string) {
    let selectedPosts: Post[] = [];
    selectedPosts =
      job == '*'
        ? this.userPosts
        : this.userPosts.filter((post) => post.job === job);
    this.updatedUserPosts.next(selectedPosts);
  }
  // GET COMMENT OF SPECIFIC POST
  getPostComment(postId: string) {
    return this.http.get('http://localhost:3000/api/comment/' + postId);
  }
  // GET UPDATE USER POSTS
  getUpdatedPosts(): Observable<Post[]> {
    return this.updatedUserPosts.asObservable();
  }
}

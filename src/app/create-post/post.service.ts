import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from '../shared/post.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class PostService {
  private userPosts: Post[] = [];
  updatedUserPosts = new Subject<Post[]>();
  private url = 'http://localhost:3000/api/post/';
  constructor(private http: HttpClient) {}
  // get user userPosts
  reverUserPosts(userPosts: Post[]) {
    this.userPosts = userPosts.reverse();
    this.updatedUserPosts.next(this.userPosts);
  }
  // ADDING POSTS FUCTION          ################
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
  //delete post by post id
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
  // get all posts at db
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
}

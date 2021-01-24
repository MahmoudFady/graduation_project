import { Comment } from './../../shared/comment.model';
import { PostService } from 'src/app/create-post/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from './../../shared/post.model';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css'],
})
export class SinglePostComponent implements OnInit {
  // DEFINE POST
  post: Post = {
    _id: '',
    creator: {
      _id: '',
      userName: '',
      profileImage: '',
    },
    creatorBigCity: '',
    creatorCity: '',
    creatorPhone: '',
    job: '',
    postText: '',
    postDate: '',
    postImages: [],
    comments: [],
    createByWorker: null,
  };
  // DEFINE COMMENTS OF POST THEN PASS IT TO COMMENTS LIST COMPONENT
  postComments: Comment[] = [
    {
      _id: '',
      commentDate: '',
      commentImages: [],
      commentText: '',
      creator: {
        _id: '',
        userName: '',
        profileImage: '',
      },
    },
  ];
  // DEFINE IMAGES IF USER WANT TO ATTACH SOME IAMGES INTO HIS COMMENT
  commentImages: string[] = null;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    let postId: string = null;
    this.route.params.subscribe((params: Params) => {
      // GET POST ID FORM URL : HTTP://LOCALHOST:4200/POST/:POSTID
      postId = params['postId'];
    });
    // THEN GET THAT POST BY ID
    this.postService.getPostById(postId).subscribe((resualt) => {
      /**
       * EXTRACT CLASS PROPERTYIES FORM THE RESUALT
       * POST
       * POSTCOMMENTS
       */
      this.post = resualt.post;
      this.postComments = resualt.post.comments;
      // ASSIGN COMMENTS TO OBSERVALBE < COMMENTS WHICH DECLARED IN POST SERVICE >
      this.postService.comments.next(this.postComments);
    });
    // LISTIEN TO COMMENTS IF ANY USER ADD COMMENT
    this.postService.getUpdatedComments().subscribe((resualt) => {
      this.postComments = resualt;
    });
  }
}

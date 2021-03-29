import { CommentService } from './comment.service';
import { SocketIoService } from './../../shared/socket-io.service';
import { Post } from './../post.model';
import { Comment } from './create-comment/comment.model';
import { PostService } from 'src/app/create-post/post.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css'],
})
export class SinglePostComponent implements OnInit {
  postId: string = '';
  // DEFINE POST
  post: Post = {
    _id: '',
    creator: {
      _id: '',
      profileImage: '',
      userName: '',
    },
    job: '',
    creatorPhone: '',
    creatorBigCity: '',
    creatorCity: '',
    postText: '',
    createByWorker: false,
    postDate: '',
    postImages: [''],
    comments: [],
  };
  // DEFINE COMMENTS OF POST THEN PASS IT TO COMMENTS LIST COMPONENT
  postComments: Comment[] = [];
  // DEFINE IMAGES IF USER WANT TO ATTACH SOME IAMGES INTO HIS COMMENT
  commentImages: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private socketIoService: SocketIoService,
    private commentService: CommentService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // GET POST ID FORM URL : HTTP://LOCALHOST:4200/POST/:POSTID
      this.postId = params['postId'];
      this.socketIoService.joinRoom('postid=' + this.postId);
      //=> LISTIN IF NEW COMMENT PUSHED
      this.socketIoService.socket.on(
        'onGetComment',
        (resualt: { newComment: Comment; joinPath: string }) => {
          this.postComments.push(resualt.newComment);
        }
      );
    });
    // THEN GET THAT POST BY ID
    this.postService.getPostById(this.postId).subscribe((resualt) => {
      /**
       * EXTRACT CLASS PROPERTYIES FORM THE RESUALT
       * POST
       * POSTCOMMENTS
       */
      this.post = resualt.post;
      console.log(this.post);

      this.postComments = resualt.post.comments;
      // ASSIGN COMMENTS TO OBSERVALBE < COMMENTS WHICH DECLARED IN POST SERVICE >
      this.commentService.initComments(this.postComments);
    });
  }
  ngOnDestroy(): void {
    this.socketIoService.disconnectUser('postid=' + this.postId);
  }
}

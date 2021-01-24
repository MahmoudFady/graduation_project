import { AuthService } from 'src/app/auth/auth.service';
import { Comment } from './../../../shared/comment.model';
import { PostService } from 'src/app/create-post/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['../post-single.component.css', './create-comment.component.css'],
})
export class CreateCommentComponent implements OnInit {
  isAuthenticated: boolean;
  commentImages: string[] = [];
  commentForm: FormGroup;
  @Input() postId: string = null;
  @Input() postComments: Comment[] = [];
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isAuthenticated = this.authService.getToken() ? true : false;
    console.log(this.isAuthenticated);

    this.commentForm = new FormGroup({
      commentText: new FormControl(null, [Validators.required]),
      commentImages: new FormControl(null),
    });
  }
  // ON ATTACH SOME IMAGES TO COMMENT REQUIEST
  onImagePicker(event: Event): void {
    // CATCH IMAGES TO VIEW IT TO USER
    this.commentImages = [];
    // GET IMAGES AS DATA < BITS OR BYTE>
    const files = (event.target as HTMLInputElement).files;
    // UPDATE COMMENTIMAGES OF THE FORM
    this.commentForm.patchValue({
      commentImages: files,
    });

    this.commentForm.get('commentImages').updateValueAndValidity();
    // LOOP IN FILES TO GET IMAGE URL DATA
    for (const index in files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // PUSH URLS INTO COMMENTIMAGES
        this.commentImages.push(fileReader.result as string);
      };
      // THEN READ DATA AS URL SOURCE
      fileReader.readAsDataURL(files[index]);
    }
  }
  // ON ADD COMMENT
  onAddComent() {
    // FORM IS VALID
    if (this.commentForm.valid) {
      const { commentText, commentImages } = this.commentForm.value;
      this.postService.addComment(
        this.postComments,
        this.postId,
        commentText,
        commentImages
      );
      this.commentImages = null;
    }
  }
}

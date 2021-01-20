import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Post } from '../shared/post.model';
import { PostService } from '../create-post/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  selectedPosts: Post[] = [];
  resualt: string;
  userData: { job: string; userBigCity: string; userCity: string } = {
    job: '',
    userBigCity: '',
    userCity: '',
  };

  constructor(
    public autService: AuthService,
    public postService: PostService
  ) {}

  ngOnInit(): void {
    if (this.autService.getToken) {
      const {
        job,
        userBigCity,
        userCity,
      } = this.autService.getLocalStorageData();
      this.userData = {
        job,
        userBigCity,
        userCity,
      };
    }
  }
  onSubmit(f: NgForm): void {
    console.log(f.value);
  }
}

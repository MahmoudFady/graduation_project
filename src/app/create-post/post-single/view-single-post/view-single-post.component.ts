import { Post } from './../../post.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-single-post',
  templateUrl: './view-single-post.component.html',
  styleUrls: ['./view-single-post.component.css'],
})
export class ViewSinglePost implements OnInit {
  @Input() post: Post;
  ngOnInit(): void {
    console.log(this.post);
  }
}

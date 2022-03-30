import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent implements OnInit {

  public postsList: Array<Post> | undefined = [];
  totalElements = 10;
  pageNumber = 1;
  reorderable = true;
  isLoading: boolean = true;

  constructor(private post: PostsService) {
    this.post.getPosts().subscribe((data) => {
      this.postsList = [...data];
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}

  onDelete(selected: Post) {
    console.log('Delete Post: ', selected);
  }

  onShowDetail(selected: Post) {
    console.log('Detail Post: ', selected);
  }
}

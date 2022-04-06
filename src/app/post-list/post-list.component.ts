import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostsService } from '../services/posts.service';
import { ViewEncapsulation } from '@angular/core';
import { filter } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent implements OnInit {

  searchTitle: string = "";
  searchBody: string = "";

  public postsList: Array<Post> | undefined = [];
  rows: Array<Post> = [];
  totalElements = 10;
  pageNumber = 1;
  reorderable = true;
  isLoading: boolean = true;

  constructor(
    private post: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.post.getPostsList().subscribe((data) => {
      this.postsList = [...data];
      this.rows = [...data];
      this.isLoading = false;
    });
  }

  onDelete(selected: Post) {
    console.log('Delete Post: ', selected);
  }

  onShowDetail(selected: Post) {
    this.router.navigate([`/post/${selected.id}`]);
  }

  onSearchTitleChange(searchTitle: string) {
    this.searchTitle = searchTitle;
  }

  onSearchBodyChange(searchBody: string) {
    this.searchBody = searchBody;
  }
  
  onSearch() {
    this.isLoading = true;
    this.post.getPostsList().subscribe((data) => {
      this.postsList = [...data];
    });
    if (this.searchTitle) {
      this.rows = [...this.postsList?.filter((value) => {
        return value.title.includes(this.searchTitle);
      }) || []]
    }

    if (this.searchBody) {
      this.rows = [...this.postsList?.filter((value) => {
        return value.body.includes(this.searchBody);
      }) || []]
    }
    this.isLoading = false;
  }
}

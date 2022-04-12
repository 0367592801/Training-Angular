import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Post } from '../../model/post';
import { PostsService } from '../../services/posts.service';
import { ViewEncapsulation } from '@angular/core';
import { filter } from 'rxjs';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MockServerResultsService } from '../../services/mock-server-results-service.service';
import { PagedData } from '../../model/paged-data';
import { Page } from '../../model/page';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent implements OnInit {

  @ViewChild(DatatableComponent) postsTable!: DatatableComponent;

  page = new Page();
  rows = new Array<Post>();
  filteredPost = new Array<Post>();
  searchTitle: string = "";
  searchBody: string = "";
  public postsList = new Array<Post>();
  pageNumber = 1;
  reorderable = true;
  isLoading: boolean = true;

  constructor(
    private postService: PostsService,
    private router: Router,
    private mockServerResultsService: MockServerResultsService,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit(): void {
    this.getPostList();
  }
  
  setPage(pageInfo: any, postsList: Array<Post>) {
    this.page.pageNumber = pageInfo.offset;
    this.isLoading = true;
    this.mockServerResultsService.getResults(this.page, postsList).subscribe(pagedData => {
      console.log(pagedData);
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
    this.isLoading = false;
  }

  getPostList() {
    this.postService.getPostsList().subscribe((data) => {
      this.postsList = [...data];
      this.rows = [...data];
      this.filteredPost = [...data];
      this.setPage({ offset: 0 }, [...data]);
      this.isLoading = false;
    });
  }

  onDelete(selected: Post) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(selected.id).subscribe((respone) => {
          if (respone.id == selected.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getPostList();
          }
        })
      }
    })
    
  }

  onShowDetail(selected: Post) {
    this.router.navigate([`/post/${selected.id}`]);
  }

  onSearchTitleChange(searchTitle: string) {
    this.searchTitle = searchTitle;
    this.onSearch("title");
  }

  onSearchBodyChange(searchBody: string) {
    this.searchBody = searchBody;
    this.onSearch("body");
  }

  onSearch(type: string) {
    this.isLoading = true;
    this.filteredPost = [...this.postsList?.filter((value) => {
      return type === "body" ? value.body.includes(this.searchBody) : value.title.includes(this.searchTitle);
    }) || []]
    this.setPage({ offset: 0 }, this.filteredPost);
    this.isLoading = false;
  }
}

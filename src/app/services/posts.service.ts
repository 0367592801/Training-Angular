import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  items: Post[] = [];
  postsAPI: string = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private http: HttpClient) { }

  getPostsList() {
    return this.http.get<any>(this.postsAPI)
  }

  getPost(postId: number) {
    return this.http.get<Post>(`${this.postsAPI}${postId}`);
  }

}

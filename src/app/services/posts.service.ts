import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  items: Post[] = [];
  postsAPI: string = 'https://624fc49757186bb95568f7c0.mockapi.io/api/v1/posts/';
  constructor(private http: HttpClient) { }

  getPostsList(): Observable<Array<Post>> {
    return this.http.get<any>(this.postsAPI)
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsAPI}${postId}`);
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${this.postsAPI}${postId}`);
  }
}

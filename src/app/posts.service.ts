import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  items: Post[] = [];
  constructor(private http: HttpClient) { }

  getPosts() {
    // API Call
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts')
  }
}

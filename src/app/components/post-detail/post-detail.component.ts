import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../model/post';
import { User } from '../../model/user';
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
  ) { }

  post: Post | undefined;
  user: User | undefined;
  postId: number | undefined;

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.postId = Number(routeParams.get(
      'postId'
    ));
    this.getPost();
  }

  async getUser() {
    if (this.post?.userId) {
      this.user = await firstValueFrom(this.authService.getUser(this.post?.userId));
    }
    console.log(this.user);
  }

  async getPost() {
    if (this.postId)
      this.post = await firstValueFrom(this.postsService.getPost(this.postId));
    console.log(this.post);

    this.getUser();
  }
}

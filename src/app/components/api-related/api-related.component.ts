import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-api-related',
  templateUrl: './api-related.component.html',
  styleUrls: ['./api-related.component.css']
})
export class ApiRelatedComponent implements OnInit {

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  id: string;
  post: Post;
  url: string = 'https://jsonplaceholder.typicode.com/todos/';
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  public callTodoList() {
    this.postService.get(this.url.concat(this.id))
    .subscribe(data => {
      this.post = data;
    });
  }
}

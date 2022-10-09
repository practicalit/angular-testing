import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiServiceService<Post>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}

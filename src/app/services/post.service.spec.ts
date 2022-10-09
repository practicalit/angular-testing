import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  //using the direct instantiation and passing the spy object here.
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PostService(httpClientSpy);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    injector = getTestBed();
    service = injector.inject(PostService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method direct method', () => {
    const post:Post = {userId:1, id: 1, title:'admin', completed: true};
    httpClientSpy.get.and.returnValue(new Observable<Post>(observer => {
          observer.next(post)
        }
      )
    );

    service.get('url').subscribe(data => {
      expect(data).toEqual(post)
    });
  });
  it('should call get method', () => {
    service.get('url').subscribe({
      next: data => {
        expect(data).toEqual(jasmine.objectContaining({title: 'admin'}))
      },
      error: error => {
        console.log(error)
      }
    });
    const req = httpMock.expectOne(`url`);
    req.flush({userId:1, id: 1, title:'admin', completed: true});
  });
});

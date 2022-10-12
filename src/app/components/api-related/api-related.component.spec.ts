import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { ApiRelatedComponent } from './api-related.component';


/**
 * 
 * Note on the .and.stub() and .and.callThrough() 
 * When jasmine is calling the spyOn(class, 'method') it does overwrite the 
 * method with stub response.
 * 
 * If the original value of the class to be called then call it with the 
 * .and.callThrough() -> this calls the original method.
 * 
 * If what is needed is to stub it, like to make sure it has been called for 
 * example, then simply do .and.stub();
 * 
 * Another one, if the function that is being called happens to be complex, 
 * then it can be replaced with the .and.callFake(() => {})
 */
describe('ApiRelatedComponent', () => {

  let componet: ApiRelatedComponent;
  let postService: PostService;
  //follow where this postServiceSpy has been used.
  //let postServiceSpy: PostService = jasmine.createSpyObj('PostService', ['get']);
  let fixture: ComponentFixture<ApiRelatedComponent>;
  let httpController: HttpTestingController
  const samplePost = {
    id: 1,
    userId: 1,
    completed: false,
    title: 'test title'
  };

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: id => id
      }
    }
  } as ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApiRelatedComponent],
      providers: [PostService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]//for muting the warning on console.
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRelatedComponent);
    componet = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create component', () => {
    expect(componet).toBeTruthy();
  });

  it('should call postService get method', fakeAsync(() => {
    const spyOnGetMethod = spyOn(postService, 'get').and.returnValue(
      new Observable(subj => subj.next({
        id: 1,
        userId: 1,
        completed: false,
        title: 'test title'
      }))
    );
    const spyOnSubscribe = spyOn(postService.get('http://test.url'), 'subscribe');
    componet.url = 'http://test.url';
    componet.callTodoList();
    tick();
    expect(spyOnGetMethod).toHaveBeenCalled();
  }));

  // describe('Calling get method', () => {
  //   beforeEach(() => {
  //     componet['postService'] = postServiceSpy;
  //   });
  //   it('should call postService get method', fakeAsync(() => {
  //     //componet['postService'].get = () => new Observable(subj => subj.next(samplePost))
  //     //spyOn(postServiceSpy) = (url) => new Observable(subj => subj.next(samplePost));
  //     const spyOnSubscribe = spyOn(postServiceSpy.get('http://test.url'), 'subscribe');
  //     componet.url = 'http://test.url';
  //     componet.callTodoList();
  //     //tick();
  //     flushMicrotasks();
  //     //expect(postServiceSpy.get).toHaveBeenCalled();
  //   }));
  //});

  it('should call the get method correctly', (done: DoneFn) => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const postId = '5';
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue(postId)
    const fakePostData: Post = {
      id: 1,
      title: 'test title',
      userId: 1,
      completed: false
    };
    const postService = TestBed.inject(PostService);
    postService.get(componet.url.concat(postId)).subscribe( data => {
      expect(data).toEqual(fakePostData);
      done();
    });
    componet.callTodoList();
    const testRequest = httpController.expectOne(componet.url.concat(postId));
    testRequest.flush(fakePostData);  
  });

  it('should call the get method with fakeAsync', fakeAsync(() => {
    const postId = '5';
    const fakePostData: Post = {
      id: 1,
      title: 'test title',
      userId: 1,
      completed: false
    };
    spyOn(postService, 'get').withArgs(componet.url.concat(postId)).and.returnValue(
      new Observable(sub => sub.next(fakePostData))
    );
    //const spySubsc = spyOn(postService.get(componet.url.concat('5')), 'subscribe');
    componet.id = postId;
    componet.callTodoList();
    tick();
    //fixture.detectChanges();
    //expect(spyGet).toHaveBeenCalledBefore(spySubsc);
    //expect(spySubsc).toHaveBeenCalled();
    expect(componet.post).toBeTruthy();
    expect(componet.post).toBe(fakePostData);
  }));

  it('should call postService get method with callFake', fakeAsync(() => {
    const spyOnGetMethod = spyOn(postService, 'get').and.callFake( () => 
      new Observable(subj => subj.next(samplePost))
    );
    const spyOnSubscribe = spyOn(postService.get(componet.url), 'subscribe');
    componet.callTodoList();
    tick();
    expect(spyOnGetMethod).toHaveBeenCalled();
  }));

  it('should call with the same id as the param', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('5');
    componet.ngOnInit();
    expect(componet.id).toEqual('5');
  });

  it('should contain the title in the dom', fakeAsync(() => {
    const spyOnGetMethod = spyOn(postService, 'get').and.callFake( () => 
      new Observable(subj => subj.next(samplePost))
    );

    componet.id = '5';
    componet.callTodoList();
    tick(1000);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.title')).nativeElement;
    //expect(spySubscribe).toHaveBeenCalled(); //see samplePost above.
    expect(element).toBeTruthy();
    expect(spyOnGetMethod).toHaveBeenCalled();
    expect(element.innerHTML).toContain('test');
    //expect(spySubscribe).toHaveBeenCalled();
  }));

  it('should contain the title in the dom - compare with the above method', () => {
    const spyOnGetMethod = spyOn(postService, 'get').and.callFake( () => 
      new Observable(subj => subj.next(samplePost))
    );

    componet.id = '5';
    componet.callTodoList();
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(element).toBeTruthy();
    expect(spyOnGetMethod).toHaveBeenCalled();
    expect(element.innerHTML).toContain('test');
  });
});
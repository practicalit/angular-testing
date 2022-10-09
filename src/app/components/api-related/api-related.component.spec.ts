import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
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
  let fixture: ComponentFixture<ApiRelatedComponent>

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
      providers: [PostService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRelatedComponent);
    componet = fixture.componentInstance;
    postService = TestBed.inject(PostService);
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

  it('should call postService get method with callFake', fakeAsync(() => {
    const spyOnGetMethod = spyOn(postService, 'get').and.callFake( () => 
      new Observable(subj => subj.next({
        id: 1,
        userId: 1,
        completed: false,
        title: 'test title'
      }))
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
});
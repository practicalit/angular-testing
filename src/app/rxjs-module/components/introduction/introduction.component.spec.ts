import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { IntroductionComponent } from './introduction.component';

describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should show success only for numbers above 0', () => {
    component.subjectObservable$ = new Observable<number>(observer => {
      observer.next(5);
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.success-message').textContent).toContain('Success');
  });

  it ('should not show success for numbers <= 0', () => {
    component.subjectObservable$ = new Observable<number>(observer => {
      observer.next(-5);
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.success-message')).toBeNull();
  });
});

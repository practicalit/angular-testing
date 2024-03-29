import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { RxjsModuleModule } from '../../rxjs-module/rxjs-module.module';
import { RxServiceService } from '../../rxjs-module/services/rx-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  // let rxServiceMock: jasmine.SpyObj<RxServiceService>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        RxjsModuleModule,
        HttpClientTestingModule
      ],
      providers: [ //needed  to simulate the injections
        RxServiceService
      ],
      declarations: [
        HomeComponent
      ],
    }).compileComponents();
  }));

  it('should create the home', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    expect(home).toBeTruthy();
  });

  it(`should have as title 'angular-unit-testing'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    expect(home.title).toEqual('angular-unit-testing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-unit-testing app is running!');
  });

  it('should render first name on checkbox selection', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    let component = fixture.componentInstance;
    let checkbox = component.contactForm.controls['showInput'];
    component.handleChange();
    checkbox.setValue(true);
    fixture.detectChanges();//check changes after value change.
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.data').textContent).toContain('Add Data');
  });

  it ('shows the message if the service allows it', () => {
    const rxService = TestBed.inject(RxServiceService);
    //spyOnProperty(rxService, 'show', 'get').and.returnValue(true);
    spyOn(rxService, 'getShow').and.returnValue(true);
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;

    expect(home.getShow()).toBeTruthy();
  });

  //mock the method to return the false and fail it accordingly.
  it ('dont show the message if the service is not allowing it', () => {
    const rxService = TestBed.inject(RxServiceService);
    //spyOnProperty(rxService, 'show', 'get').and.returnValue(false);
    spyOn(rxService, 'getShow').and.returnValue(false);
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;

    expect(home.getShow()).toBeFalsy();
  });

  it ('upate the data based on subscription ', () => {
    const rxService = TestBed.inject(RxServiceService);
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    const publishedValue = "published";
    home.subscription(); //order matters here, has tobe before callNextOnSubject
    rxService.callNextOnSubject(publishedValue);
    fixture.detectChanges();
    expect(home.subscribedValue).toEqual(publishedValue);

  });
});

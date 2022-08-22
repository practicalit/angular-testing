import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicElementsComponent } from './basic-elements.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MaterialModule } from '../material.module';
import { By } from '@angular/platform-browser';

describe('BasicElementsComponent', () => {
  let component: BasicElementsComponent;
  let fixture: ComponentFixture<BasicElementsComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        /*
         * this is required to address issues of the material related error
         * like export of name matTooltip not found error.
         */
        MaterialModule
      ],
      declarations: [ BasicElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicElementsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the tooltip', ()=>{
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tooltip')).not.toBeNull();
  });

  it('should have the tooltip visibilty hidden first', ()=>{
    const compiled = fixture.nativeElement;
    //const toolText = compiled.querySelector('.tooltip .tooltiptext').nativeElement;
    //expect(getComputedStyle(toolText).visibility).toEqual('hidden');
    expect(getComputedStyle(compiled.querySelector('.tooltip .tooltiptext'))
    .visibility).toEqual('hidden');
  });

  it('should have the tooltip text as Tooltip text', async ()=>{
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.tooltip .tooltiptext'))
      .nativeElement
      .textContent
    ).toEqual('Tooltip text');
  });

  /**
   * This is testing the following:
   * - Checking if the tooltip is shown or not
   * - If the css has been changed as needed
   * - Triggering the buitin DOM click and mouseover, mouseenter effects and then 
   * checking accordingly 
   * - tricky part is the css :hover one is not being listened and using the 
   * event handler is working here.
   * - Using click event triggered from the dom and listening for the changes.
   */
  it('should have the tooltip text as Tooltip text', async ()=>{
    const compiled = fixture.nativeElement;
    // let div = compiled.querySelector('.tooltip .tooltiptext')

    // div.mouseover();
    fixture.detectChanges();
    const divOne = fixture.debugElement.query(By.css('.tooltip'));
    const div = compiled.querySelector('.tooltip');
    divOne.triggerEventHandler('click', {});
    //const div = fixture.debugElement.nativeElement.querySelector('div');

    div.dispatchEvent(new MouseEvent('mouseover'), {
      view: window,
      bubbles: true,
      cancelable: true
    });
    div.dispatchEvent(new MouseEvent('mouseenter'), {
      view: window,
      bubbles: true,
      cancelable: true
    });
    //div.triggerEventHandler('mouseover', {});
    component.onDiv2Hover();
    fixture.detectChanges();
    expect(getComputedStyle(fixture.debugElement.query(By.css('.tooltip .tooltiptext2'))
    .nativeElement)
      .visibility).toEqual('visible');
    expect(component.divClicked).toEqual('clicked');
    expect(component.divHovered).toEqual('hovered');
    expect(component.visible).toEqual('visible');
    expect(
      fixture.debugElement.query(By.css('.tooltip .tooltiptext'))
      .nativeElement
      .textContent
    ).toEqual('Tooltip text');
  });
});

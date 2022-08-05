import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { RxServiceService } from './rxjs-module/services/rx-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-unit-testing';
  show: boolean = false;
  subscribedValue:string = "";

  constructor(private fb: FormBuilder, 
    private rxService: RxServiceService) {

  }
  ngOnInit() {

  }

  contactForm = this.fb.group({
    anyData: new FormControl(),
    showInput: new FormControl(),
  })

  handleChange() {
    this.show = !this.show;
  }

  getShow() {
    return this.rxService.getShow();
  }

  getData() {
    this.rxService.getData().subscribe((data) => {
      console.log(data);
    });
  }

  subscription() {
    this.rxService.rxSubjectProperty$.subscribe(data => {
      this.subscribedValue = data;
    })
  }
}

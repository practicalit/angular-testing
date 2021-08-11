import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-unit-testing';
  show: boolean = false;

  constructor(private fb: FormBuilder) {

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
}

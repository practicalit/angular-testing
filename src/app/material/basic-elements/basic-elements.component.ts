import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.css']
})
export class BasicElementsComponent {

  divClicked = "clicknone";
  divHovered = "hovernone";
  visible: string = 'hidden';
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  onDivClick() {
    this.divClicked = "clicked";
  }

  onDivHover() {
    this.divHovered = "hovered";
  }

  onDiv2Hover() {
    this.divHovered = "hovered";
    this.visible = 'visible';
  }

  onDiv2Leave() {
    this.visible = 'hidden';
  }
}
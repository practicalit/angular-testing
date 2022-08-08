import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IntroductionComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    IntroductionComponent
  ],
})
export class RxjsModuleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostService } from './post.service';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    PostService
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: []
})
export class ServicesModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxjsModuleModule } from './rxjs-module/rxjs-module.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiRelatedComponent } from './components/api-related/api-related.component';
import { ServicesModule } from './services/sevices.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RxjsModuleModule,
    HttpClientModule,
    MaterialModule,
    ComponentsModule,
    ServicesModule,
    BrowserAnimationsModule //see the usage of basic-element cmpnt in material module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

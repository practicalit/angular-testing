import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiRelatedComponent } from './components/api-related/api-related.component';
import { BasicElementsComponent } from './material/basic-elements/basic-elements.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {path: 'material', component: BasicElementsComponent, pathMatch: 'full'}, 
  {path: 'api/:id', component: ApiRelatedComponent, pathMatch: 'full'}, 
  {path: '', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

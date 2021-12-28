import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdgeClicksComponent } from "./edge-clicks/edge-clicks.component";
import {ApiTestComponent} from "./api-test/api-test.component";

const routes: Routes = [
  {path: '', component: EdgeClicksComponent},
  {path: 'api', component: ApiTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

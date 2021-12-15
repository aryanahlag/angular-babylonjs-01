import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdgeClicksComponent } from "./edge-clicks/edge-clicks.component";

const routes: Routes = [
  {path: '', component: EdgeClicksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

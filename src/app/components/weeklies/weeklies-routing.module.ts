import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Weeklies } from './weeklies.component';


const routes: Routes = [
  {
    path: '',
    component: Weeklies
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeekliesRoutingModule { }
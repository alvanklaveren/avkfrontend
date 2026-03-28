import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dailies } from './dailies.component';


const routes: Routes = [
  {
    path: '',
    component: Dailies
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailiesRoutingModule { }
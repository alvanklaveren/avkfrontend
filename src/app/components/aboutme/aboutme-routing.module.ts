import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutMe } from './aboutme.component';


const routes: Routes = [
  {
    path: '',
    component: AboutMe
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
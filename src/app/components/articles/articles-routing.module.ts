import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Articles } from './articles.component';


const routes: Routes = [
  {
    path: '',
    component: Articles
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
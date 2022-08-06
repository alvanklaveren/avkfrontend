import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Forum } from './forum.component';


const routes: Routes = [
  { path: '', component: Forum },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
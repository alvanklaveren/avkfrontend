import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

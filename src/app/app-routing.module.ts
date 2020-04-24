import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './components/homepage/homepage.component';
import { AboutMe } from './components/aboutme/aboutme.component';
import { GameShop } from './components/gameshop/gameshop.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'aboutme', component: AboutMe },
  { path: 'gameshop', redirectTo: 'gameshop/0/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole', redirectTo: 'gameshop/:codeGameConsole/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole/:codeProductType', component: GameShop },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './components/homepage/homepage.component';
import { AboutMe } from './components/aboutme/aboutme.component';
import { Forum } from './components/forum/forum.component';
import { GameShop } from './components/gameshop/gameshop.component';
import { ForumMessage } from './components/forum/forum.message.component';
import { AdministratorPage } from './components/administrator/administrator.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'aboutme', component: AboutMe },

  { path: 'administrator', redirectTo: 'administrator/0', pathMatch: 'full' },
  { path: 'administrator/:tabpage', component: AdministratorPage },

  { path: 'forum', component: Forum },
  { path: 'forum/:codeMessageCategory', component: Forum },
  { path: 'forum/message/:codeMessageCategory/:codeMessage', component: ForumMessage },

  { path: 'gameshop', redirectTo: 'gameshop/0/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole', redirectTo: 'gameshop/:codeGameConsole/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole/:codeProductType', component: GameShop },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

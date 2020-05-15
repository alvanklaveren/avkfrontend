import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './components/homepage/homepage.component';
import { AboutMe } from './components/aboutme/aboutme.component';
import { Forum } from './components/forum/forum.component';
import { GameShop } from './components/gameshop/gameshop.component';
import { ForumMessage } from './components/forum/forum.message.component';
import { AdministratorPage } from './components/administrator/administrator.component';
import { GameShopMobile } from './components/gameshop/gameshopmobile.component';
import { Articles } from './components/articles/articles.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'aboutme', component: AboutMe },

  { path: 'articles', redirectTo: 'articles/index', pathMatch: 'full' },
  { path: 'articles/:articleId', component: Articles },

  { path: 'administrator', component: AdministratorPage },

  { path: 'forum', component: Forum },
  { path: 'forum/:codeMessageCategory', component: Forum },
  { path: 'forum/message/:codeMessageCategory/:codeMessage', component: ForumMessage },

  { path: 'gameshop', redirectTo: 'gameshop/0/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole', redirectTo: 'gameshop/:codeGameConsole/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole/:codeProductType', component: GameShop },

  // { path: 'gameshopmobile', redirectTo: 'gameshopmobile/0/0', pathMatch: 'full' },
  // { path: 'gameshopmobile/:codeGameConsole', redirectTo: 'gameshopmobile/:codeGameConsole/0', pathMatch: 'full' },
  // { path: 'gameshopmobile/:codeGameConsole/:codeProductType', component: GameShopMobile },
  // { path: 'gameshopmobile/:codeGameConsole/:codeProductType/:description', component: GameShopMobile },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

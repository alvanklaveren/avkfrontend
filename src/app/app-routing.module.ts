import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumMessage } from './components/forum/forum.message.component';
import { AdministratorPage } from './components/administrator/administrator.component';
import { PageNotFound } from './pagenotfound.component';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/homepage/homepage.module').then(m => m.HomePageModule)},
  { path: 'aboutme', loadChildren: () => import('./components/aboutme/aboutme.module').then(m => m.AboutMeModule)},

  { path: 'articles', redirectTo: 'articles/index', pathMatch: 'full' },
  { path: 'articles/:articleId', loadChildren: () => import('./components/articles/articles.module').then(m => m.ArticlesModule)},

  { path: 'administrator', component: AdministratorPage },

  { path: 'forum', loadChildren: () => import('./components/forum/forum.module').then(m => m.ForumModule)},
  { path: 'forum/:codeMessageCategory', loadChildren: () => import('./components/forum/forum.module').then(m => m.ForumModule)},
  { path: 'forum/message/:codeMessageCategory/:codeMessage', component: ForumMessage },

  { path: 'gameshop', redirectTo: 'gameshop/0/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole', redirectTo: 'gameshop/:codeGameConsole/0', pathMatch: 'full' },
  { path: 'gameshop/:codeGameConsole/:codeProductType', loadChildren: () => import('./components/gameshop/gameshop.module').then(m => m.GameShopModule)},

  { path: '**', pathMatch: 'full', component: PageNotFound },

  // { path: 'gameshopmobile', redirectTo: 'gameshopmobile/0/0', pathMatch: 'full' },
  // { path: 'gameshopmobile/:codeGameConsole', redirectTo: 'gameshopmobile/:codeGameConsole/0', pathMatch: 'full' },
  // { path: 'gameshopmobile/:codeGameConsole/:codeProductType', component: GameShopMobile },
  // { path: 'gameshopmobile/:codeGameConsole/:codeProductType/:description', component: GameShopMobile },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { 
      relativeLinkResolution: 'legacy',
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

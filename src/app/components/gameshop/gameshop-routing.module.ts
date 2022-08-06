import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameShop } from './gameshop.component';


const routes: Routes = [
  { path: '', component: GameShop },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameShopRoutingModule { }
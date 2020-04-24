import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameShop } from './gameshop.component';

@NgModule({
  declarations: [
    GameShop
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})

export class GameShopModule { }

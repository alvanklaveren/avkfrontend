import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameShop } from './gameshop.component';
import { GameModalComponent } from './details/gamemodal.component';

@NgModule({
  declarations: [
    GameShop,
    GameModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
  bootstrap: [GameModalComponent]
})

export class GameShopModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameShop } from './gameshop.component';
import { GameModalComponent } from './modals/gamemodal.component';
import { UploadImageModalComponent } from './modals/uploadimagemodal.component';
import { GameShopMobile } from './gameshopmobile.component';
import { RatingModalComponent } from './modals/ratingmodal.component';
import { GameShopRoutingModule } from './gameshop-routing.module';

@NgModule({
  declarations: [
    GameShop,
    GameShopMobile,
    GameModalComponent,
    UploadImageModalComponent,
    RatingModalComponent,
  ],
  imports: [
    SharedModule,
    GameShopRoutingModule,
  ],
  providers: [],
  bootstrap: [GameModalComponent, UploadImageModalComponent, RatingModalComponent]
})

export class GameShopModule { }

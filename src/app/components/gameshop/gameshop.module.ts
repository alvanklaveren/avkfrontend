import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameShop } from './gameshop.component';
import { GameModalComponent } from './details/gamemodal.component';
import { UploadImageModalComponent } from './details/uploadimagemodal.component';

@NgModule({
  declarations: [
    GameShop,
    GameModalComponent,
    UploadImageModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
  bootstrap: [GameModalComponent, UploadImageModalComponent]
})

export class GameShopModule { }

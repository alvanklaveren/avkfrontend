import { NgModule } from '@angular/core';
import { Dailies } from './dailies.component';
import { SharedModule } from '../shared/shared.module';
import { DailiesRoutingModule } from './dailies-routing.module';

@NgModule({
  declarations: [
    Dailies
  ],
  imports: [
    SharedModule,
    DailiesRoutingModule,
  ],
  providers: []
})
export class DailiesPageModule { }

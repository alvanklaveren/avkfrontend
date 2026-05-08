import { NgModule } from '@angular/core';
import { Weeklies } from './weeklies.component';
import { SharedModule } from '../shared/shared.module';
import { WeekliesRoutingModule } from './weeklies-routing.module';

@NgModule({
  declarations: [
    Weeklies
  ],
  imports: [
    SharedModule,
    WeekliesRoutingModule,
  ],
  providers: []
})
export class WeekliesModule { }

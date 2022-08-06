import { NgModule } from '@angular/core';
import { HomePage } from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    SharedModule,
    HomePageRoutingModule,
  ],
  providers: []
})
export class HomePageModule { }

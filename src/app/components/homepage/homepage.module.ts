import { NgModule } from '@angular/core';
import { HomePage } from './homepage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})
export class HomePageModule { }

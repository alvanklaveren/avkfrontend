import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './homepage.component';
import { SafePipe } from '../../pipes/safe.pipe';

@NgModule({
  declarations: [
    HomePage,
    SafePipe
  ],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class HomePageModule { }

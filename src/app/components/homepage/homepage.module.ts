import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './homepage.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: []
})
export class AppModule { }

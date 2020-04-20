import { NgModule } from '@angular/core';
import { AboutMe } from './aboutme.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AboutMe
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})
export class AboutMeModule { }

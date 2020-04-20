import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutMe } from './aboutme.component';


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

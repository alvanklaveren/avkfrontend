import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutMeRoutingModule } from './aboutme-routing.module';
import { AboutMe } from './aboutme.component';


@NgModule({
  declarations: [
    AboutMe
  ],
  imports: [
    SharedModule,
    AboutMeRoutingModule,
  ],
  providers: []
})
export class AboutMeModule { }

import { NgModule } from '@angular/core';
import { AdministratorPage } from './administrator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdministratorPage
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})

export class AdministratorPageModule { }

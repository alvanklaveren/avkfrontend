import { NgModule } from '@angular/core';
import { AdministratorPage } from './administrator.component';
import { SharedModule } from '../shared/shared.module';
import { UserModalComponent } from './modals/usermodal.component';

@NgModule({
  declarations: [
    AdministratorPage,
    UserModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
  bootstrap: [UserModalComponent]

})

export class AdministratorPageModule { }

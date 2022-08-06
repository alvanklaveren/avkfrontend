import { NgModule } from '@angular/core';
import { AdministratorPage } from './administrator.component';
import { SharedModule } from '../shared/shared.module';
import { UserModalComponent } from './modals/usermodal.component';
import { CodeTableModalComponent } from './modals/codetablemodal.component';
import { AdministratorRoutingModule } from './administrator-routing.module';

@NgModule({
  declarations: [
    AdministratorPage,
    UserModalComponent,
    CodeTableModalComponent,
  ],
  imports: [
    SharedModule,
    AdministratorRoutingModule,
  ],
  providers: [],
  bootstrap: [UserModalComponent, CodeTableModalComponent]

})

export class AdministratorPageModule { }

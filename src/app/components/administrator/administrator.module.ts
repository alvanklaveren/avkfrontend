import { NgModule } from '@angular/core';
import { AdministratorPage } from './administrator.component';
import { SharedModule } from '../shared/shared.module';
import { UserModalComponent } from './modals/usermodal.component';
import { CodeTableModalComponent } from './modals/codetablemodal.component';

@NgModule({
  declarations: [
    AdministratorPage,
    UserModalComponent,
    CodeTableModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
  bootstrap: [UserModalComponent, CodeTableModalComponent]

})

export class AdministratorPageModule { }

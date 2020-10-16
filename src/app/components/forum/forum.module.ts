import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Forum } from './forum.component';
import { ForumMessage } from './forum.message.component';
import { ImageModalComponent } from './modals/image.modal.component';
import { LoginModalComponent } from './modals/login.modal.component';

@NgModule({
  declarations: [
    Forum,
    ForumMessage,
    ImageModalComponent,
    LoginModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
  bootstrap: [ImageModalComponent, LoginModalComponent]
})

export class ForumModule { }

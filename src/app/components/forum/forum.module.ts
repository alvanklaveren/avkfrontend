import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Forum } from './forum.component';
import { ForumMessage } from './forum.message.component';
import { ImageModalComponent } from './modals/image.modal.component';

@NgModule({
  declarations: [
    Forum,
    ForumMessage,
    ImageModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
  bootstrap: [ImageModalComponent]
})

export class ForumModule { }

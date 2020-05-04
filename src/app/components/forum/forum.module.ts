import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Forum } from './forum.component';
import { ForumMessage } from './forum.message.component';

@NgModule({
  declarations: [
    Forum,
    ForumMessage,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
})

export class ForumModule { }

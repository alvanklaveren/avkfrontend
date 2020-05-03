import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Forum } from './forum.component';

@NgModule({
  declarations: [
    Forum,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
})

export class ForumModule { }

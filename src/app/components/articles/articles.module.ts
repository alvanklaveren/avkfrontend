import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Articles } from './articles.component';


@NgModule({
  declarations: [
    Articles
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})
export class ArticlesModule { }

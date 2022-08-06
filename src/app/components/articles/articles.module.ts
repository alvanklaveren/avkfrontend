import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { Articles } from './articles.component';


@NgModule({
  declarations: [
    Articles
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule,
  ],
  providers: []
})
export class ArticlesModule { }

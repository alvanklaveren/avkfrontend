import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from 'src/app/pipes/safe.pipe';

import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SpinnerComponent,
    SafePipe,
  ],
  imports: [
    TranslateModule,
    InfiniteScrollModule,
    CommonModule,
    NgSelectModule,
  ],
  exports: [
    TranslateModule,
    InfiniteScrollModule,
    CommonModule,
    NgSelectModule,
    SpinnerComponent,
    SafePipe,
  ],
})
export class SharedModule { }

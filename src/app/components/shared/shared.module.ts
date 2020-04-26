import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from 'src/app/pipes/safe.pipe';

import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SelectModule } from 'ng2-select';

@NgModule({
  declarations: [
    SpinnerComponent,
    SafePipe,
  ],
  imports: [
    TranslateModule,
    InfiniteScrollModule,
    CommonModule,
    SelectModule,
  ],
  exports: [
    TranslateModule,
    InfiniteScrollModule,
    CommonModule,
    SpinnerComponent,
    SafePipe,
  ],
})
export class SharedModule { }

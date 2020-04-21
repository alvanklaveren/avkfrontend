import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from 'src/app/pipes/safe.pipe';

import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SpinnerComponent,
    SafePipe,
  ],
  imports: [
    TranslateModule,
    CommonModule,
  ],
  exports: [
    TranslateModule,
    CommonModule,
    SpinnerComponent,
    SafePipe,
  ]
})
export class SharedModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from 'src/app/pipes/safe.pipe';

import { SpinnerComponent } from '../shared/spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    SafePipe,
  ]
})
export class SharedModule { }

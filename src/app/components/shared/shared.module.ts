import { NgModule } from '@angular/core';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    SafePipe
  ],
  providers: [
    SafePipe
  ]
})
export class SharedModule { }

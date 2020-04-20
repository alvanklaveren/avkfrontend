import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: '<div class="text-center"><br>' +
               '  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>' + 
               '  <span class="sr-only">Loading...</span><br><br>' +
               '</div>'
})

export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

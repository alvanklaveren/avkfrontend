import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'avk-fe';
  errormessage: string = null;
  successmessage: string = "website is working";

  onErrorMessageClick(){
    this.errormessage = null;
  }

  onSuccesMessageClick(){
    this.successmessage = null;
  }
}

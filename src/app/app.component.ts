import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'AVK';
  errormessage: string = null;
  successmessage: string = null;

  constructor(private router:Router){ }

  ngOnInit(){
    this.router.navigateByUrl('home');
  }

  onErrorMessageClick(){
    this.errormessage = null;
  }

  onSuccesMessageClick(){
    this.successmessage = null;
  }
}

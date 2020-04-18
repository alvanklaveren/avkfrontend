import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'AVK';
  errormessage: string = null;
  successmessage: string = null;
  about: string = 'About ...';
  aboutWebsite: string = '[aboutwebsite]';
  
  constructor(private router:Router, private translationService: TranslationService){ }

  ngOnInit(){
    this.translationService.translate(this.about, "US").subscribe(res => {
      let response = res as any;
      console.log(response.result);
      this.about = response.result as string;
    });

    this.translationService.translate(this.aboutWebsite, "US").subscribe(res => {
      let response = res as any;
      console.log(response.result);
      this.aboutWebsite = response.result as string;
    });

    this.router.navigateByUrl('home');
  }

  onErrorMessageClick(){
    this.errormessage = null;
  }

  onSuccesMessageClick(){
    this.successmessage = null;
  }
}

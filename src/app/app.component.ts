import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from './services/context.service';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
//import { faBootstrap } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  @ViewChild('aboutDiv', { static: true }) aboutDiv: { nativeElement: { innerHTML: string; }; };

  title = 'AVK';
  errormessage: string = null;
  successmessage: string = null;

  aboutText = 'About ...';
  aboutWebsite: string = '';

  activeLanguage = '';

  mailTo: string = environment.mailTo;

  constructor(private router:Router, protected contextService:ContextService, protected translateService: TranslateService){ 
  }

  ngAfterViewInit() {
    this.contextService.translate('[aboutwebsite]').subscribe(res => {
      let response = res as any;
      this.aboutWebsite = response.result;

      // doing it like this, allows the htmlsanitizer to skip this text, leaving things like <fa-icon class="" [..]
      // in the HTML but unfortunately, it still does not display the bootstrap icon. 
      // So for now, we use the bootstrap icon from bootstrap itself (using <svg>)
      this.aboutDiv.nativeElement.innerHTML = this.aboutWebsite;
    });
  }

  ngOnInit(){
    this.translateService.setDefaultLang(this.contextService.isoA2);

    // this.contextService.translate('About ...').subscribe(res => {
    //   let response = res as any;
    //   this.about = response.result as string;
    // });
    console.log("loading: " + this.activeLanguage);
    this.router.navigateByUrl('home');
  }

  changeLanguage(language){
    console.log(language);
    this.contextService.setIsoA2(language);
  }

  onErrorMessageClick(){
    this.errormessage = null;
  }
  onSuccesMessageClick(){
    this.successmessage = null;
  }
}

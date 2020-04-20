import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from './services/context.service';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';

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
  cookiemessage: string = null;

  aboutText = 'About ...';
  aboutWebsite: string = '';

  flagIcon = '';
  selectedIsoA2 = this.contextService.getIsoA2();

  mailTo: string = environment.mailTo;

  menuItems = [
    { description: 'Home', url: '/' },
    { description: 'Forum', url: '/forum' },
    { description: 'My Game Collection', url: '/gameshop' },
    { description: 'Articles', url: '/articles' },
    { description: 'About me', url: '/aboutme' },
  ]

  constructor(private router:Router, private contextService:ContextService, private translateService: TranslateService){ 
    if(this.selectedIsoA2){
      if(this.selectedIsoA2.toUpperCase() === 'US') {
        this.flagIcon = '../assets/fonts/flag_us.svg';
      } else if(this.selectedIsoA2.toUpperCase() === 'NL'){
        this.flagIcon = '../assets/fonts/flag_nl.svg';
      }

      if(!this.contextService.hasAgreedToCookies()) {
        if(this.selectedIsoA2.toUpperCase() === 'US') {
          this.cookiemessage = '<b>Cookies</b><br>This site only uses technical cookies that are necessary for this site to function. By continuing ' + 
          'to use this site you these cookies will be used on your device. If you disabled cookies in your browser settings, ' +
          'this site may not function properly. <a href="http://cookiesandyou.com/" target="_blank">Learn more about cookies.</a></small> ' +
          '<br><div style="display: flex;justify-content: center;"></div></div>' 
        } else if(this.selectedIsoA2.toUpperCase() === 'NL'){
          this.cookiemessage = '<b>Cookies</b><br>Deze website gebruikt enkel technische cookies die nodig zijn om deze website goed te laten functioneren. ' + 
          'Bij verder gebruik van deze website ben je dus op de hoogte dat dit soort cookies op dit apparaat zullen worden gebruikt. ' +
          'Als je cookies hebt uitgeschakeld in je browser, dan zal deze website mogelijk minder goed functioneren. ' +
          '<a href="http://cookiesandyou.com/" target="_blank">Leer meer over cookies.</a></small> ' +
          '<br><div style="display: flex;justify-content: center;"></div></div>'    
        }
      }

    }

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
    this.translateService.setDefaultLang(this.selectedIsoA2);
  }

  changeLanguage(language){
    this.contextService.setIsoA2(language);
    this.translateService.setDefaultLang(this.contextService.getIsoA2());
    window.location.reload();
  }

  onErrorMessageClick(){
    this.errormessage = null;
  }

  onSuccesMessageClick(){
    this.successmessage = null;
  }

  onCookieMessageClick(){
    this.cookiemessage = null;
    this.contextService.setAgreedToCookies();
  }
}

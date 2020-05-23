import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from './services/context.service';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/token-storage.service';

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

  theme = this.contextService.getTheme();
  flagIcon = '';

  selectedIsoA2 = this.contextService.getIsoA2();

  mailTo: string = environment.mailTo;

  menuItems = [
    { id: 0, description: 'Administrator', url: '/administrator', disabled: true },
    { id: 1, description: 'Home', url: '/', disabled: false },
    { id: 2, description: 'Forum', url: '/forum', disabled: false },
    { id: 3, description: 'My Game Collection', url: '/gameshop', disabled: false },
    { id: 4, description: 'Articles', url: '/articles', disabled: false },
    { id: 5, description: 'About me', url: '/aboutme', disabled: false },
  ]

  constructor(private router:Router, private contextService:ContextService, private translateService: TranslateService,
              private authenticationService: AuthenticationService, private tokenStorageService: TokenStorageService ){ 
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
    if(this.authenticationService.isAdmin()) {
      this.menuItems[0].disabled=false;
    } else {
      this.menuItems[0].disabled=true;
    }

    this.translateService.setDefaultLang(this.selectedIsoA2);
    this.setTheme(this.theme);
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
  
  setTheme(theme:string){
    this.theme = theme;
    this.contextService.setTheme(theme);
    if(theme === 'dark'){
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      document.getElementById("myapproot").classList.remove("light-mode");
      document.getElementById("myapproot").classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      document.getElementById("myapproot").classList.remove("dark-mode");
      document.getElementById("myapproot").classList.add("light-mode");
    }
  }
}

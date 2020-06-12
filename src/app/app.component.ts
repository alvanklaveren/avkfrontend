import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from './services/context.service';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/token-storage.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CookieModalComponent } from './cookiemodal.component';
import * as moment from 'moment';

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

  today: string;

  isMenuCollapsed = true;

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

  constructor(private router:Router, private modalService: NgbModal,
              private contextService:ContextService, private translateService: TranslateService,
              private authenticationService: AuthenticationService, private tokenStorageService: TokenStorageService ){ 
    if(this.selectedIsoA2){
      if(this.selectedIsoA2.toUpperCase() === 'US') {
        this.flagIcon = '../assets/fonts/flag_us.svg';
      } else if(this.selectedIsoA2.toUpperCase() === 'NL'){
        this.flagIcon = '../assets/fonts/flag_nl.svg';
      }

      if(!this.contextService.hasAgreedToCookies()) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false,
          ariaLabelledBy: 'app-cookie-modal'
        };
        let modal = this.modalService.open(CookieModalComponent, ngbModalOptions);
        modal
    
        modal.result.then((result) => {
          this.contextService.setAgreedToCookies();
        }, (reason) => {
          this.contextService.setAgreedToCookies();
        });  
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

    let todayNow = new Date();
    let dd = String(todayNow.getDate()).padStart(2, '0');
    let mm = String(todayNow.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayNow.getFullYear();
    
    this.today = yyyy + '/' + mm + '/' + dd;

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

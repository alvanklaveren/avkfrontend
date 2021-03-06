import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from './services/context.service';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/token-storage.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CookieModalComponent } from './cookiemodal.component';

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

  selectedTheme = this.contextService.getTheme();
  flagIcon = '';

  avkThemes = [
    { id: 'light', description: 'Light', icon: 'far fa-sun', cssId: 'light-mode' },
    { id: 'dark', description: 'Dark', icon: 'far fa-moon', cssId: 'dark-mode' },
    { id: 'hell', description: 'Demon', icon: 'fas fa-skull-crossbones', cssId: 'hell-mode' },
  ];
 
  selectedIsoA2 = this.contextService.getIsoA2();

  mailTo: string = environment.mailTo;

  menuItems = [
    { id: 0, description: 'Administrator', url: '/administrator', icon: 'fas fa-home', disabled: true },
    { id: 1, description: 'Home', url: '/', icon: 'fas fa-home', disabled: false },
    { id: 2, description: 'Forum', url: '/forum', icon: 'fas fa-comments', disabled: false },
    { id: 3, description: 'My Game Collection', url: '/gameshop', icon: 'fas fa-gamepad', disabled: false },
    { id: 4, description: 'Articles', url: '/articles', icon: 'fas fa-newspaper', disabled: false },
    { id: 5, description: 'About me', url: '/aboutme', icon: 'fas fa-grin-beam', disabled: false },
  ];

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
    if(!this.selectedTheme){
      this.selectedTheme = 'light';
    }
    this.setTheme(this.selectedTheme);
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
  
  setTheme(selectedThemeId:string){
    this.selectedTheme = selectedThemeId;
    this.contextService.setTheme(this.selectedTheme);

    for(let theme of this.avkThemes){
      if(theme.id === selectedThemeId){
        document.body.classList.add(theme.cssId);
        document.getElementById("myapproot").classList.add(theme.cssId); 
      } else {
        document.body.classList.remove(theme.cssId);
        document.getElementById("myapproot").classList.remove(theme.cssId);
      }

    }
  }
}

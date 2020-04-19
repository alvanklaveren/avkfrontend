import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { environment } from 'src/environments/environment';
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

  about: string = '';
  aboutWebsite: string = '';

  mailTo: string = environment.mailTo;

  constructor(private router:Router, protected translationService: TranslationService){ }

  ngAfterViewInit() {
    this.translationService.translate('[aboutwebsite]', 'US').subscribe(res => {
      let response = res as any;
      this.aboutWebsite = response.result;

      // doing it like this, allows the htmlsanitizer to skip this text, leaving things like <fa-icon class="" [..]
      // in the HTML but unfortunately, it still does not display the bootstrap icon. 
      // So for now, we use the bootstrap icon from bootstrap itself (using <svg>)
      this.aboutDiv.nativeElement.innerHTML = this.aboutWebsite;
    });
  }

  ngOnInit(){
    this.translationService.translate('About ...', 'US').subscribe(res => {
      let response = res as any;
      this.about = response.result as string;
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

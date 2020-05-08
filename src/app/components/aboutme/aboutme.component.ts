import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { SmartResponse } from '../../models/smartresponse';

import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})

export class AboutMe implements OnInit{
  @ViewChild('aboutMeDiv', { static: true }) aboutMeDiv: { nativeElement: { innerHTML: string; }; };

  loading = true;

  aboutMeText: string = null;
  downloadCVText: string = null;

  constructor(private httpClient: HttpClient, private title:Title, private contextService:ContextService){ }

  ngAfterViewInit() {
    this.contextService.translate('[aboutme]').subscribe(res => {
      let response = res as SmartResponse;
      this.aboutMeText = response.result as string;

      // doing it like this, allows the htmlsanitizer to skip this text, so we can use tags and attributes
      this.aboutMeDiv.nativeElement.innerHTML = this.aboutMeText;
      this.loading = false;
    });
  }

  ngOnInit(){

    this.contextService.setPageTitle(this, 'About me');

    if(this.contextService.getIsoA2() || this.contextService.getIsoA2().toUpperCase() === 'US'){
      this.downloadCVText = 'Click here to download my Curriculum Vitae';
    } else if(this.contextService.getIsoA2() || this.contextService.getIsoA2().toUpperCase() === 'NL'){
      this.downloadCVText = 'Klik hier om mijn Curriculum Vitae te downloaden';
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../../models/message';
import { SafeUrl, Title } from '@angular/platform-browser';

import { ContextService } from '../../services/context.service';
import { WeekliesService } from 'src/app/services/weeklies.service';

import { DomSanitizer } from '@angular/platform-browser';
import {AuthenticationService} from "../../services/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-weeklies',
  templateUrl: './weeklies.component.html',
  styleUrls: ['./weeklies.component.scss'],
})

export class Weeklies implements OnInit{

  messages: Message[] = [];

  loading = true;

  isAdmin: boolean = false;

  page = 0;
  pageSize = 7;

  constructor(private weekliesService: WeekliesService, private httpClient: HttpClient,
              private domSanitizer: DomSanitizer, private authenticationService: AuthenticationService,
              private title:Title, private contextService:ContextService, private router: Router){ }

  ngOnInit(){
    this.isAdmin = this.authenticationService.isAdmin();
    this.getMessageList();
    this.contextService.setPageTitle(this, 'Weeklies');

  }

  getMessageList(){
    this.loading = true;
    this.weekliesService.getWeekliesMessages(this.page, this.pageSize).subscribe(response => {
      this.messages = response as Array<Message>;
      this.loading = false;
    }, error => this.loading = false);
  }

  generateWeeklies() {
    this.loading = true;
    this.weekliesService.getLatest().subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        this.loading = false;
        this.getMessageList();
      },
      error: (err) => {
        console.error('Error loading comic:', err);
        this.loading = false;
        this.getMessageList();
      }
    });
  }


  navigateToDeveloperConsole() {
    window.location.href="https://console.x.ai";
  }

  onScroll() {
    this.getMessageList();
  }


}

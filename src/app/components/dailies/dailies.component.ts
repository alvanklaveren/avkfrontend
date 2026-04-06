import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../../models/message';
import { SafeUrl, Title } from '@angular/platform-browser';

import { ContextService } from '../../services/context.service';
import { DailiesService } from 'src/app/services/dailies.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dailies',
  templateUrl: './dailies.component.html',
  styleUrls: ['./dailies.component.scss'],
})

export class Dailies implements OnInit{

  messages: Message[] = [];

  loading = true;

  page = 0;
  pageSize = 5;

  constructor(private dailiesService: DailiesService, private httpClient: HttpClient,
              private domSanitizer: DomSanitizer,
              private title:Title, private contextService:ContextService){ }

  ngOnInit(){
    this.getMessageList();
    this.contextService.setPageTitle(this, 'Dailies');

  }

  getMessageList(){
    this.loading = true;
    this.dailiesService.getDailiesMessages(this.page, this.pageSize).subscribe(response => {
      this.messages = response as Array<Message>;
      this.loading = false;
    }, error => this.loading = false);
  }

  generateDailies() {
    this.loading = true;
    this.dailiesService.getLatest().subscribe({
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


  onScroll() {
    this.getMessageList();
  }


}

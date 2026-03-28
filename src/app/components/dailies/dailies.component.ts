import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../../models/message';
import { Title } from '@angular/platform-browser';

import { ContextService } from '../../services/context.service';
import { ForumService } from '../../services/forum.service';
import { DailiesService } from 'src/app/services/dailies.service';


@Component({
  selector: 'app-dailies',
  templateUrl: './dailies.component.html',
  styleUrls: ['./dailies.component.scss'],
})

export class Dailies implements OnInit{

  messages: Message[] = [];

  loading = true;

  page = 0;
  pageSize = 10;

  constructor(private dailiesService: DailiesService, private httpClient: HttpClient, 
              private title:Title, private contextService:ContextService){ }

  ngOnInit(){
    this.getMessageList();
    this.contextService.setPageTitle(this, 'Dailies');

  }

  getMessageList(){
    this.loading = true;
    this.dailiesService.getDailiesMessages(this.page, this.pageSize).subscribe(response => {
      if (scroll && this.messages) {
        this.messages = this.messages.concat(response as Array<Message>);
      } else {
        this.messages = response as Array<Message>;
      }
      this.loading = false;      
    }, error => this.loading = false); 
  }

  onScroll() {
    this.page++;
    this.getMessageList();
  }


}

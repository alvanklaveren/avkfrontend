import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../../models/message';
import { Title } from '@angular/platform-browser';

import { ContextService } from '../../services/context.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomePage implements OnInit{

  messages: Message[] = Array<Message>();

  loading = true;

  constructor(private messageService: MessageService, private httpClient: HttpClient, 
              private title:Title, private contextService:ContextService){ 

    let home = 'Home';
    contextService.translate(home).subscribe(res => {
      let response = res as any;
      this.title.setTitle("AVK - " + response.result);
    });
  }

  ngOnInit(){

    this.messageService.getHomepageMessages().subscribe(res => {
      this.messages = res as Array<Message>;
      this.loading = false;
    }); 
  }

}

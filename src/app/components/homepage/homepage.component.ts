import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomePage implements OnInit{
  title = 'AVK - Home';

  messages: Message[] = Array<Message>();

  constructor(private messageService: MessageService, private httpClient: HttpClient){ }

  ngOnInit(){

    this.messageService.getHomepageMessages().subscribe(res => {
      this.messages = res as Array<Message>;
    }); 

  }

}

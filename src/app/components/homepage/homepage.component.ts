import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/message';
//import { NgbDateMomentParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomePage implements OnInit{

  //ngbDateParserFormatter: NgbDateMomentParserFormatter;

  messages: Message[] = Array<Message>();
  searchModel: any;

  constructor(private messageService: MessageService, private httpClient: HttpClient, private title:Title){ 
    this.title.setTitle("AVK - Home");
  }

  ngOnInit(){

    //this.ngbDateParserFormatter = new NgbDateMomentParserFormatter();

    this.messageService.getHomepageMessages().subscribe(res => {
      this.messages = res as Array<Message>;
      console.log(this.messages);
    }); 
  }

}

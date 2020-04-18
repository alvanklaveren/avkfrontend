import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/message';
//import { NgbDateMomentParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomePage implements OnInit{
  title = 'AVK - Home';

  //ngbDateParserFormatter: NgbDateMomentParserFormatter;

  messages: Message[] = Array<Message>();
  searchModel: any;

  constructor(private messageService: MessageService, private httpClient: HttpClient){ }

  ngOnInit(){

    //this.ngbDateParserFormatter = new NgbDateMomentParserFormatter();

    this.messageService.getHomepageMessages().subscribe(res => {
      this.messages = res as Array<Message>;
    }); 
  }

}

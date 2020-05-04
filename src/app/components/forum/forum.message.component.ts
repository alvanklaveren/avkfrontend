import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForumService } from 'src/app/services/forum.service';
import { Message } from 'src/app/models/message';
import { SmartResponse } from 'src/app/models/smartresponse';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.message.component.html',
  styleUrls: ['./forum.message.component.scss'],
})

export class ForumMessage implements OnInit{

  loading = true;

  codeMessage: number;
  message: Message;
  
  replyMessages: Array<Message> = [];

  preparedText: string;
  avatarUrl = ''; 
  
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, 
              private contextService:ContextService, private forumService: ForumService){ 
  }

  ngOnInit(){

    this.avatarUrl = this.forumService.avatarUrl;

    if(this.route.snapshot.paramMap.get('codeMessage')) {
      this.codeMessage = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeMessage'));
      this.forumService.getMessage(this.codeMessage).subscribe(res => {
             
        this.message = res as Message;

        this.forumService.prepareMessage(this.message.messageText).subscribe(resp => {
          this.preparedText = (resp as SmartResponse).result as string;
        });

        this.forumService.getReplyMessages(this.message.code).subscribe(replies => {
          this.replyMessages = replies as Array<Message>;
        });

       });

    } else {
      this.codeMessage = null;
    }

  }

  goHome(){
    this.router.navigateByUrl("home");
  }

  goForum(){
    this.router.navigateByUrl("forum");
  }

  goCategory(messageCategory){
    if(this.message) {
      let codeMessageCategory = this.message.messageCategory.code as number;
      this.router.navigateByUrl("forum/" + codeMessageCategory);
    }
  }

}

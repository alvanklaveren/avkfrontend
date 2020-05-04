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
  editMessage: Message;
  editReplyMessage: Message;
  replyMessages: Array<Message> = [];

  avatarUrl = ''; 
  askDelete = false;
  askReplyDelete = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, 
              private contextService:ContextService, private forumService: ForumService){ 
  }

  ngOnInit(){

    this.avatarUrl = this.forumService.avatarUrl;
    this.editMessage = null;
    this.editReplyMessage = null;

    if(this.route.snapshot.paramMap.get('codeMessage')) {
      this.codeMessage = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeMessage'));
      this.forumService.getMessage(this.codeMessage).subscribe(res => {
             
        this.message = res as Message;

        this.forumService.prepareMessage(this.message.messageText).subscribe(resp => {
          this.message.preparedMessageText = (resp as SmartResponse).result as string;
        });

        this.forumService.getReplyMessages(this.message.code).subscribe(replies => {
          this.replyMessages = replies as Array<Message>;
          for(let replyMessage of this.replyMessages) {
            this.forumService.prepareMessage(replyMessage.messageText).subscribe(resp => {
              replyMessage.preparedMessageText = (resp as SmartResponse).result as string;
            });
    
          }
        });

       });

    } else {
      this.codeMessage = null;
    }

  }

  onEditMessage(message: Message) {
    this.editMessage = message;
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

  onCancel(){
    this.editMessage = null;
  }

  onSave(){
    this.forumService.prepareMessage(this.editMessage.messageText).subscribe(resp => {
      this.forumService.save(this.editMessage).subscribe(res =>{
        this.editMessage.preparedMessageText = (resp as SmartResponse).result as string;
        this.message = this.editMessage;
        this.editMessage = null; 
      });
    });   
  }

  onDelete() {
    let codeMessageCategory = this.message.messageCategory.code as number;

    this.forumService.delete(this.message).subscribe( res => {
      this.router.navigateByUrl("forum/" + codeMessageCategory);
    });
  }

  onEditReplyMessage(message: Message) {
    this.editReplyMessage = message;
  }

  onReplySave(reply: Message) {
    this.forumService.prepareMessage(this.editReplyMessage.messageText).subscribe(resp => {
      this.forumService.save(this.editReplyMessage).subscribe(res =>{
        this.editReplyMessage.preparedMessageText = (resp as SmartResponse).result as string;
        reply = this.editReplyMessage;
        this.editReplyMessage = null; 
      });
    });   
  }

  onCancelEditReplyMessage(){
    this.editReplyMessage = null;
  }

  onReplyDelete(replyMessage: Message) {
    this.forumService.delete(replyMessage).subscribe( res => {
      this.ngOnInit();
    });
  }

}

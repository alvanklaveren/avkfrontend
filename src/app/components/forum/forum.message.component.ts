import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForumService } from 'src/app/services/forum.service';
import { Message } from 'src/app/models/message';
import { SmartResponse } from 'src/app/models/smartresponse';
import { MessageCategory } from 'src/app/models/messagecategory';
import * as moment from 'moment';

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

  newMessageCategory: MessageCategory;
  messageCategories: Array<MessageCategory> = [];
  testList = ['a', 'b'];

  avatarUrl = ''; 
  askDelete = false;
  askReplyDelete = false;
  askChangeCategory = false;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, 
              private contextService:ContextService, private forumService: ForumService){ 
  }

  ngOnInit(){

    this.avatarUrl = this.forumService.avatarUrl;
    this.editMessage = null;
    this.editReplyMessage = null;

    this.forumService.getMessageCategories().subscribe(res => {
      this.messageCategories = res as Array<MessageCategory>;
    });

    if(this.route.snapshot.paramMap.get('codeMessage') === '0') {
      this.message = new Message();
      let codeMessageCategory = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeMessageCategory'));
      this.forumService.getMessageCategory(codeMessageCategory).subscribe(cat => {
        this.message.messageCategory = cat as MessageCategory;
        this.editMessage = this.message;
      });
      this.codeMessage = null;
    } else {

      if(this.route.snapshot.paramMap.get('codeMessage')) {
        this.codeMessage = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeMessage'));
        this.forumService.getMessage(this.codeMessage).subscribe(res => {
              
          this.message = res as Message;

          this.newMessageCategory = this.message.messageCategory;

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

  goCategory(){
    if(this.message) {
      let codeMessageCategory = this.message.messageCategory.code as number;
      this.router.navigateByUrl("forum/" + codeMessageCategory);
    }
  }

  onCancel(){
    this.editMessage = null;    
    if(!this.message?.code) {
      let codeMessageCategory = this.message.messageCategory.code as number;
      this.router.navigateByUrl("forum/" + codeMessageCategory);
    }
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
      this.forumService.save(reply).subscribe(res =>{
        this.editReplyMessage.preparedMessageText = (resp as SmartResponse).result as string;
        reply = this.editReplyMessage;
        this.editReplyMessage = null; 
      });
    });   
  }

  onCancelEditReplyMessage(){
    if(!this.editReplyMessage.code) {
      this.replyMessages.pop();
    }

    this.editReplyMessage = null;
  }

  onReplyDelete(replyMessage: Message) {
    console.log(replyMessage);
    this.forumService.delete(replyMessage).subscribe( res => {
      this.ngOnInit();
    });
  }

  onAddReplyMessage() {
    let newReplyMessage = new Message();
    newReplyMessage.messageDate = moment().toDate();
    newReplyMessage.description = '';
    newReplyMessage.messageText = '';
    newReplyMessage.preparedMessageText = '';  
    newReplyMessage.messageCategory = this.message.messageCategory;
    newReplyMessage.message = this.message;

    // TODO: this has to be replaced by logged in user
    newReplyMessage.forumUser = this.message.forumUser;

    this.replyMessages.push(newReplyMessage);
    this.editReplyMessage = newReplyMessage;
  }

  onMoveMessage(){
    this.message.messageCategory = this.newMessageCategory;
    this.forumService.save(this.message).subscribe(res => {
      this.message = res as Message;
      window.location.reload();
    });
  }

}

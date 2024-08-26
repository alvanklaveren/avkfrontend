import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForumUser } from 'src/app/models/forumuser';
import { MessageCategory } from 'src/app/models/messagecategory';
import { MessageListView } from 'src/app/projections/messagelistview';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ForumService } from 'src/app/services/forum.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContextService } from '../../services/context.service';
import { LoginModalComponent } from './modals/login.modal.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})

export class Forum implements OnInit{

  loading = true;

  codeMessageCategory: number;
  messageCategory: MessageCategory;

  messageCategories: Array<MessageCategory>;
  messages: Array<MessageListView>;

  editMessageCategory: MessageCategory;

  user: ForumUser;
  isAdmin: boolean = false;
  isMember: boolean = false;

  loginForm: FormGroup;

   constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, private formBuilder: FormBuilder,
              private contextService:ContextService, private forumService: ForumService,
              private tokenStorageService: TokenStorageService, private authenticationService: AuthenticationService){ 
  }

  ngOnInit(){

    this.contextService.setPageTitle(this, 'Forum');

    this.editMessageCategory = null;

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.initForum();
  }

  initForum(){
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = this.authenticationService.isAdmin();
    this.isMember = this.authenticationService.isMember();

    if(this.route.snapshot.paramMap.get('codeMessageCategory')) {
      this.codeMessageCategory = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeMessageCategory'));
      this.forumService.getMessageCategory(this.codeMessageCategory).subscribe(res => {
        this.messageCategory = res as MessageCategory;
      });
    } else {
      this.codeMessageCategory = null;
    }

    if(!this.codeMessageCategory) {
      this.forumService.getMessageCategories().subscribe(res => {
        this.messageCategories = res as Array<MessageCategory>;

        for(let messageCategory of this.messageCategories){
          this.forumService.getMessageCount(messageCategory.code).subscribe(response => {
            let count = response as number;
            messageCategory.messageCount = count;
          });
        }
      });
    } else {
      this.forumService.getMessagesByCategory(this.codeMessageCategory).subscribe(res =>{
        this.messages = res as Array<MessageListView>;
      });
    }
  }

  goHome(){
    this.router.navigateByUrl("home");
  }

  goForum(){
    this.router.navigateByUrl("forum");
  }

  onSelectCategory(messageCategory){
    let codeMessageCategory = messageCategory.code as number;
    this.router.navigateByUrl("forum/" + codeMessageCategory);
  }

  onAddMessage(){
    this.router.navigateByUrl("forum/message/" + this.codeMessageCategory + "/0" );
  }

  onAddMessageCategory() {
    let newMessageCategory = new MessageCategory();
    newMessageCategory.description = '<new category>';
    newMessageCategory.messageCount = 0;
    this.forumService.saveMessageCategory(newMessageCategory).subscribe(res => {
      newMessageCategory = res as MessageCategory;
      this.messageCategories.push(newMessageCategory);
    });
  }

  onSelectMessage(message) {
    let codeCategory = message.messageCategoryCode;
    let codeMessage = message.code as number;
    this.router.navigateByUrl("forum/message/" + codeCategory + "/" + codeMessage);
  }

  renameCategory(messageCategory: MessageCategory) {
    this.forumService.saveMessageCategory(messageCategory).subscribe(res => {
      this.messageCategory = res as MessageCategory;
      this.editMessageCategory = null;
    });
  }

  deleteCategory(messageCategory: MessageCategory) {
    this.forumService.deleteMessageCategory(messageCategory).subscribe(res => {
      this.messageCategories.splice(this.messageCategories.indexOf(messageCategory), 1)
      this.editMessageCategory = null;
    });   
  }

  logout(){
    this.authenticationService.logout();
    this.isAdmin = this.authenticationService.isAdmin();
    this.isMember = this.authenticationService.isMember();

      // admin needs to refresh the top menu, to remove the configuration cogwheel
      // TODO: this should be made more pretty, i.e. make show/hide of cogwheel a behavioursubject 
      // responding to change in user
        window.location.reload(); 
  }

  openLoginModal(){   

    let modal = this.modalService.open(LoginModalComponent, {ariaLabelledBy: 'app-login-modal'});
    modal.result.then((result) => {
      this.isAdmin = this.authenticationService.isAdmin();
      this.isMember = this.authenticationService.isMember();

      // admin needs to refresh the top menu, to add the configuration cogwheel
      // TODO: this should be made more pretty, i.e. make show/hide of cogwheel a behavioursubject 
      // responding to change in user
      if(this.isAdmin) {
        window.location.reload();
      } else {
        this.initForum();
      }
    });
  }

  testEmail(){
    this.loading = true;
    this.forumService.testEmail().subscribe(res => {
        this.loading = false;
    });
  }

}

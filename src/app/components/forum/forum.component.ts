import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageCategory } from 'src/app/models/messagecategory';
import { ForumService } from 'src/app/services/forum.service';
import { Message } from 'src/app/models/message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ForumUser } from 'src/app/models/forumuser';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { browser } from 'protractor';

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
  messages: Array<Message>;

  editMessageCategory: MessageCategory;

  user: ForumUser;
  isAdmin: boolean = false;
  isMember: boolean = false;

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  forgotPassword = false;

   constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, private formBuilder: FormBuilder,
              private contextService:ContextService, private forumService: ForumService,
              private tokenStorageService: TokenStorageService, private authenticationService: AuthenticationService){ 
  }

  ngOnInit(){

    this.contextService.setPageTitle(this, 'Forum');

    this.user = this.tokenStorageService.getUser();
    this.isAdmin = this.authenticationService.isAdmin();
    this.isMember = this.authenticationService.isMember();

    this.editMessageCategory = null;

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      username: [null, Validators.required],
    });

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
        this.messages = res as Array<Message>;
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
    let codeCategory = message.messageCategory.code;
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

  login(){
    let lf = this.loginForm.value;

    this.authenticationService.login(lf.username, lf.password).subscribe(async (response) =>{
      let auth = response.headers.get('authorization');
      let tokens = JSON.parse(auth);
      this.authenticationService.saveAccessData(tokens);
      await this.delay(1000); // it takes a sec to get the data saved to local and session storage
      this.user = this.tokenStorageService.getUser();
      this.authenticationService.setUser();
      window.location.reload();
    }, (err) => {
      console.log(err);
    });  
  }

  logout(){
    this.authenticationService.logout();
    this.user = this.tokenStorageService.getUser();
    window.location.reload();
  }

  emailNewPassword(){
    let lf = this.loginForm.value;

    this.forumService.emailNewPassword(lf.username).subscribe((res: {result:boolean}) => {
      if(res.result) {
        this.forgotPassword = false;
      } else {
        this.forgotPassword = false;
      }
    });
  }

  delay(ms: number) {
     return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

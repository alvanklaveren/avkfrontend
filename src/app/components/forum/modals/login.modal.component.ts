import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'src/app/models/message';
import { ForumService } from 'src/app/services/forum.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ForumUser } from 'src/app/models/forumuser';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.modal.component.html',
  styleUrls: ['./login.modal.component.scss'],
})

export class LoginModalComponent implements OnInit {

    @Input('message') message: Message;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, 
                private forumService: ForumService, private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService,
                private tokenStorageService: TokenStorageService) { }
               
    loginForm: FormGroup;
    forgotPassword = false;
    user: ForumUser;
    
    ngOnInit(){
        this.loginForm = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
        });     
    }

    onSignIn(){
        let form = this.loginForm.value;

        this.authenticationService.login(form.username, form.password).subscribe(async (response) =>{
          let auth = response.headers.get('authorization');
          let tokens = JSON.parse(auth);
          this.authenticationService.saveAccessData(tokens);
          
          await this.delay(1000); // it takes a sec to get the data saved to local and session storage

          this.user = this.tokenStorageService.getUser();
          this.authenticationService.setUser();
    
          this.onClose();
        }, (err) => {
          console.log(err);
        });  
    }

    emailNewPassword(){

        let username = this.loginForm.value.username;
        if(username == null || username == undefined){
            this.forgotPassword = false;
            return;
        }

        this.forumService.emailNewPassword(username).subscribe((res: {result:boolean}) => {
          if(res.result) {
            this.forgotPassword = false;
          } else {
            this.forgotPassword = false;
          }
        });
    }
    
    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.close();
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
   
  }

import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ForumUser } from 'src/app/models/forumuser';
import { Classification } from 'src/app/models/classification';

import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.scss'],
})

export class UserModalComponent implements OnInit{

    @Input('forumUser') forumUser: ForumUser;

    editForm: FormGroup;

    askDelete = false;

    classifications: Classification[];


    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private administratorService: AdministratorService) { }

    ngOnInit(){

        this.administratorService.getClassifications().subscribe(res => {
            this.classifications = res as Classification[];
        });

        this.editForm = this.formBuilder.group({
            username: [null, Validators.required],
            displayName: [null, Validators.required],
            emailAddress: [null, Validators.required],
            codeClassification: [null, Validators.required],
            avatar: [null]
        });

        if (this.forumUser) {
            this.editForm.patchValue({
                username: this.forumUser.username,
                displayName: this.forumUser.displayName,
                emailAddress: this.forumUser.emailAddress,
                codeClassification: this.forumUser.classification.code,
                avatar: this.forumUser.avatar,
            });
        } else {
        }
    }

    onDelete(){       
        if(!this.forumUser || !this.forumUser.code) { 
            return;
        }

        this.askDelete =  false;
        
        this.administratorService.deleteUser(this.forumUser.code).subscribe(res => {
            this.activeModal.close("Deleted")
         }, (err) => {
            console.log("Delete failed");
         });
    }

    onSave(){
        let ef = this.editForm.value;

        let classification = this.classifications.find(obj => obj.code === ef.codeClassification);

        let forumUser;
        if(this.forumUser){
            forumUser = this.forumUser;
        } else {
            forumUser = new ForumUser();
        }
        
        forumUser.username = ef.username;
        // saving new user will trigger an automatic email with password to the user email address
        // forumUser.password = ef.password;
        forumUser.displayName = ef.displayName;
        forumUser.emailAddress = ef.emailAddress;
        forumUser.classification = classification;
        forumUser.avatar = ef.avatar;


        this.administratorService.saveUser(forumUser).subscribe(res => {
            this.forumUser = res as ForumUser;
            this.activeModal.close();
        },
        (err => {
            console.log("Saving failed");
        }
        ));

    }

    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.dismiss();
    }
  }

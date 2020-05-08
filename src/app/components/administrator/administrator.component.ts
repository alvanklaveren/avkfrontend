
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ContextService } from '../../services/context.service';
import { AdministratorService } from '../../services/administrator.service';
import { Constants } from 'src/app/models/constants';
import { ForumUser } from 'src/app/models/forumuser';
import { UserModalComponent } from './modals/usermodal.component';

@Component({
  selector: 'app-administratorpage',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})

export class AdministratorPage implements OnInit{

  CONSTANTS: number = 0;
  USERS: number = 1;
  CODETABLES: number = 2;

  ADMINTABPAGE = 'adminTabPage';

  tabpage: number = 0;
  tabpages = [
    {id: 0, menutitle: 'Configuration', title: 'Configuration'},
    {id: 1, menutitle: 'Users', title: 'Users'},
    {id: 2, menutitle: 'Code Tables', title: 'Code Tables'},
  ]

  constantsForm: FormGroup;

  codeConstantsGuestImage: number;
  guestImageUrl = '';

  codeConstantsWebLogo: number;
  webLogoUrl = '';

  acmeAddressConstants: Constants;
  acmeConstants: Constants;

  users: ForumUser[];

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
    private title:Title, private modalService: NgbModal, private formBuilder: FormBuilder,
    private contextService:ContextService, private administratorService: AdministratorService){ }
  
  ngOnInit(){

    this.contextService.setPageTitle(this, 'Administrator');
    this.tabpage = this.contextService.toNumber(this.contextService.getSessionGlobal(this.ADMINTABPAGE));
    if(!this.tabpage){ 
      this.setTabPage(0);
    }

    this.administratorService.getUsers().subscribe(res => {
      this.users = res as Array<ForumUser>;
    });

    this.constantsForm = this.formBuilder.group({
      acmeAddress: [null],
      acme: [null],
      guestAvatar: [null],
      webLogo: [null],
    });

    this.administratorService.getConstantById('acme_address').subscribe(res => {
      this.acmeAddressConstants = res as Constants;
      this.constantsForm.patchValue({ acmeAddress: this.acmeAddressConstants.stringValue as string } );
    });

    this.administratorService.getConstantById('acme').subscribe(res => {
      this.acmeConstants = res as Constants;
      this.constantsForm.patchValue({ acme: this.acmeConstants.stringValue as string } );
    });

    this.refreshImages();
  }

  setTabPage(tabpage: number){
    this.tabpage = tabpage;
    this.contextService.setSessionGlobal(this.ADMINTABPAGE, this.tabpage);
  }

  refreshImages(){
    this.administratorService.getConstantById('guestimage').subscribe(res => {
      let constants = res as Constants;
      this.codeConstantsGuestImage = constants.code;
      this.guestImageUrl = this.administratorService.constantImageUrl + this.codeConstantsGuestImage;
    });

    this.administratorService.getConstantById('weblogo').subscribe(res => {
      let constants = res as Constants;
      this.codeConstantsWebLogo = constants.code;
      this.webLogoUrl = this.administratorService.constantImageUrl + this.codeConstantsWebLogo;
    });
  }

  onUploadGuestAvatar(event){
    this.uploadImage(this.codeConstantsGuestImage, event.target.files.item(0));
  }

  onUploadWebLogo(event){
    this.uploadImage(this.codeConstantsWebLogo, event.target.files.item(0));
  }

  uploadImage(codeConstants: number, file: File){
    if(!file || !codeConstants){ return; }

    this.administratorService.uploadImage(codeConstants, file).subscribe(res => {
      window.location.reload();
    },
    (err => {
        console.log("Saving image failed");
    }
    ));
  }

  onSaveConstants(){
    let ef = this.constantsForm.value;
    this.acmeAddressConstants.stringValue = ef.acmeAddress;
    this.acmeConstants.stringValue = ef.acme; 

    this.administratorService.saveConstant(this.acmeConstants).subscribe(res => {
      this.acmeConstants = res as Constants;

      this.administratorService.saveConstant(this.acmeAddressConstants).subscribe(res2 => {
        this.acmeAddressConstants = res2 as Constants;
        window.location.reload();
      });
    });

  }

  openEditModal(forumUser?){   
    let modal = this.modalService.open(UserModalComponent, {ariaLabelledBy: 'app-user-modal'});

    if(forumUser) {
      modal.componentInstance.forumUser = forumUser;
    }

    modal.result.then((result) => {
      window.location.reload();
      
    }, (reason) => {
      if(reason === 'Deleted') {
        window.location.reload();
      }
    });
  }

}

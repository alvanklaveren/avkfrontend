import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContextService } from './services/context.service';

@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookiemodal.component.html',
})

export class CookieModalComponent implements OnInit{

    selectedIsoA2 = this.contextService.getIsoA2();
    cookiemessage: string;
    okButton: string;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private contextService: ContextService) { 

      if(this.selectedIsoA2.toUpperCase() === 'NL'){
        this.cookiemessage = '<b>Cookies</b><br>Deze website gebruikt enkel technische cookies die nodig zijn om deze website goed te laten functioneren. ' + 
        'Bij verder gebruik van deze website ben je dus op de hoogte dat dit soort cookies op dit apparaat zullen worden gebruikt. ' +
        'Als je cookies hebt uitgeschakeld in je browser, dan zal deze website mogelijk minder goed functioneren. ' +
        '<a href="http://cookiesandyou.com/" target="_blank">Leer meer over cookies.</a> ' +
        '<br>';

        this.okButton = "Begrepen";
      } else {
        this.cookiemessage = '<b>Cookies</b><br>This site only uses technical cookies that are necessary for this site to function. By continuing ' + 
        'to use this site you accept the use of these cookies on your device. If you disabled cookies in your browser settings, ' +
        'this site may not function properly. <a href="http://cookiesandyou.com/" target="_blank">Learn more about cookies.</a> ' +
        '<br>';

        this.okButton = "Understood";
      }

    }

    ngOnInit(){
      
    }

 
    onClose() {
        this.activeModal.dismiss();
    }
  }

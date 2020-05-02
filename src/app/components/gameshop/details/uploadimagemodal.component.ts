import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameConsole } from 'src/app/models/gameconsole';
import { Company } from 'src/app/models/company';
import { ProductType } from 'src/app/models/producttype';
import { GameShopService } from 'src/app/services/gameshop.service';

@Component({
  selector: 'app-uploadimage-modal',
  templateUrl: './uploadimagemodal.component.html',
  styleUrls: ['./uploadimagemodal.component.scss'],
})

export class UploadImageModalComponent implements OnInit {

    @Input('product') product: Product;

    selectedFile: File;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private gameShopService: GameShopService) { }

                
    ngOnInit(){

    }

    uploadImage(){

        if(!this.selectedFile || !this.product){
            return;
        }

        this.gameShopService.uploadImage(this.product.code, this.selectedFile).subscribe(res => {
            this.activeModal.close();
        },
        (err => {
            console.log("Saving failed");
        }
        ));

    }

    onFileChanged(event){
        this.selectedFile = event.target.files.item(0);
    }

    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.close();
    }
  }

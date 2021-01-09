import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product';

import { GameShopService } from 'src/app/services/gameshop.service';

@Component({
  selector: 'app-uploadimage-modal',
  templateUrl: './uploadimagemodal.component.html',
  styleUrls: ['./uploadimagemodal.component.scss'],
})

export class UploadImageModalComponent implements OnInit {

    @Input('product') product: Product;

    selectedFile: File;
    error: string;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private gameShopService: GameShopService) { }

                
    ngOnInit(){

    }

    uploadImage(){

        this.error = "";

        if(!this.selectedFile || !this.product){
            return;
        }

        // file size should be less than a 100 kilobyte, to not take up to much space in the database 
        if(this.selectedFile.size > 102400) {
            this.error = "Not allowed to upload file. Reason: File size is larger than 100 KB."
            return;
        }

        let fileContent = undefined;

        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            fileContent = fileReader.result;

            this.gameShopService.uploadImageAlt(this.product.code, fileContent).subscribe(res => {
                    this.activeModal.close();
                },(err => {
                        console.log("Saving failed");
                        console.log(err);
                })
            );
        };

    fileReader.readAsBinaryString(this.selectedFile);
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

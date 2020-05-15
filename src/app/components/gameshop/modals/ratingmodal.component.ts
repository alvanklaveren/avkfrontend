import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product';

import { GameShopService } from 'src/app/services/gameshop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingUrl } from 'src/app/models/ratingurl';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './ratingmodal.component.html',
  styleUrls: ['./ratingmodal.component.scss'],
})

export class RatingModalComponent implements OnInit {

    @Input('product') product: Product;

    editForm: FormGroup;

    ratingUrlList: Array<RatingUrl> = [];

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private gameShopService: GameShopService) { }

                
    ngOnInit(){
        this.gameShopService.getRatingUrls().subscribe(res => {
            this.ratingUrlList = res as Array<RatingUrl>;
        });

        this.editForm = this.formBuilder.group({
            codeRatingUrl: [null, Validators.required],
            rating: [null, Validators.required],
        });
    }


    onSave(){
        let ef = this.editForm.value;
        this.gameShopService.saveProductRating(this.product.code, ef.codeRatingUrl, ef.rating).subscribe(res =>{
            this.activeModal.close();
        }, (err) => {
            this.activeModal.dismiss(err);
        });
    }

    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.close();
    }
  }

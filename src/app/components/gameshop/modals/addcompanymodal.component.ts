import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product';

import { GameShopService } from 'src/app/services/gameshop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingUrl } from 'src/app/models/ratingurl';

@Component({
  selector: 'app-addcompanymodal',
  templateUrl: './addcompanymodal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./addcompanymodal.component.scss'],
})

export class AddCompanyModalComponent implements OnInit {

    editForm: FormGroup;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private gameShopService: GameShopService) { }

                
    ngOnInit(){
        this.editForm = this.formBuilder.group({
            name: [null, Validators.required],
        });
    }


    onSave(){
        let ef = this.editForm.value;
        this.gameShopService.addCompany(ef.name).subscribe(res => {
            this.activeModal.close(ef.name);
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

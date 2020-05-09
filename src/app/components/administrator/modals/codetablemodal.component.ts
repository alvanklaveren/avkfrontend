import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-codetable-modal',
  templateUrl: './codetablemodal.component.html',
  styleUrls: ['./codetablemodal.component.scss'],
})

export class CodeTableModalComponent implements OnInit{

    @Input('codetable') codetable: number;
    @Input('codeTableRow') codeTableRow: any;

    COMPANIES: number = 0;
    GAMECONSOLES: number = 1;
    PRODUCTTYPES: number = 2;
    RATINGURLS: number = 3;
  
    editForm: FormGroup;

    askDelete = false;


    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private administratorService: AdministratorService) { }

    ngOnInit(){

        if(this.codetable == this.GAMECONSOLES) {
            this.editForm = this.formBuilder.group({
                description: [null, Validators.required],
                sortorder: [null, Validators.required],
            });

            this.editForm.patchValue({
                description: this.codeTableRow.description,
                sortorder: this.codeTableRow.sortorder,
            });   
        } else if(this.codetable == this.RATINGURLS) {
            this.editForm = this.formBuilder.group({
                url: [null, Validators.required],
            });

            this.editForm.patchValue({
                url: this.codeTableRow.url,
            });     
        } else if(this.codetable == this.COMPANIES || this.codetable == this.PRODUCTTYPES) {
            this.editForm = this.formBuilder.group({
                description: [null, Validators.required],
            });

            this.editForm.patchValue({
                description: this.codeTableRow.description,
            });   
        }
    }

    onDelete(){       
        this.askDelete =  false;
        
        // this.administratorService.deleteCodeTable(this.codetable, this.codeTableRow.code).subscribe(res => {
        //     this.activeModal.close("Deleted")
        //  }, (err) => {
        //     console.log("Delete failed");
        //  });
    }

    onSave(){
        let ef = this.editForm.value;

        if(this.codetable != this.RATINGURLS){
            this.codeTableRow.description = ef.description;
        } else {
            this.codeTableRow.url = ef.url;
        }

        if(this.codetable == this.GAMECONSOLES){
            this.codeTableRow.sortorder = ef.sortorder;
        }

        // this.administratorService.saveCodeTable(this.codetable, this.codeTableRow).subscribe(res => {
        //     this.codeTableRow = res;
        //     this.activeModal.close();
        // },
        // (err => {
        //     console.log("Saving failed");
        // }
        // ));

    }

    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.dismiss();
    }
  }

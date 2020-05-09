import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdministratorService } from 'src/app/services/administrator.service';
import { Company } from 'src/app/models/company';
import { GameShopService } from 'src/app/services/gameshop.service';
import { ProductType } from 'src/app/models/producttype';
import { GameConsole } from 'src/app/models/gameconsole';
import { RatingUrl } from 'src/app/models/ratingurl';

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

    companies: Company[];
    loadingCompanies = true;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private formBuilder: FormBuilder,
                private administratorService: AdministratorService, private gameShopService: GameShopService) { }

    ngOnInit(){

        if(!this.codeTableRow) {
            if(this.codetable == this.COMPANIES) {
                this.codeTableRow = new Company();
                this.codeTableRow.description = ' ';
            } else if(this.codetable == this.PRODUCTTYPES) {
                this.codeTableRow = new ProductType();
                this.codeTableRow.description = ' ';
            } else if(this.codetable == this.GAMECONSOLES) {
                this.codeTableRow = new GameConsole();
                this.codeTableRow.description = ' ';
                this.codeTableRow.sortorder = 0;
            } else if(this.codetable == this.RATINGURLS) {
                this.codeTableRow = new RatingUrl();
                this.codeTableRow.url = ' ';
            }
            this.codeTableRow.code = null;
        }

        if(this.codetable == this.GAMECONSOLES) {
            this.gameShopService.getCompanyList().subscribe(res => {
                this.companies = res as Company[];
                this.loadingCompanies = false;
            });

            this.editForm = this.formBuilder.group({
                description: [null, Validators.required],
                sortorder: [null, Validators.required],
                codeCompany: [null, Validators.required],
            });

            let codeCompany = (this.codeTableRow.code) ? this.codeTableRow.company.code : 6;
            this.editForm.patchValue({
                description: this.codeTableRow.description,
                sortorder: this.codeTableRow.sortorder,
                codeCompany: codeCompany,
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
        
        this.administratorService.deleteCodeTableRow(this.codetable, this.codeTableRow.code).subscribe(res => {
            this.activeModal.dismiss("Deleted");
         }, (err) => {
            console.log("Delete failed");
         });
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
            let company = this.companies.find(c => c.code == ef.codeCompany);
            if(!company){
                company = this.companies.find(c => c.code == 6);
            }
            this.codeTableRow.company = company;
        }

        this.administratorService.saveCodeTableRow(this.codetable, this.codeTableRow).subscribe(res => {
            this.activeModal.close();
        },(err => {
                console.log("Saving failed");
        }));
    }

    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.dismiss();
    }
  }

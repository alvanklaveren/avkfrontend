import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameConsole } from 'src/app/models/gameconsole';
import { Company } from 'src/app/models/company';
import { ProductType } from 'src/app/models/producttype';
import { GameShopService } from 'src/app/services/gameshop.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './gamemodal.component.html',
  styleUrls: ['./gamemodal.component.scss'],
})

export class GameModalComponent implements OnInit{

    @Input('product') product: Product;

    editForm: FormGroup;

    gameConsoleList: [GameConsole];
    productTypeList: [ProductType];
    companyList: [Company];

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private gameShopService: GameShopService) { }

    ngOnInit(){
        this.gameShopService.getGameConsoleList().subscribe(res => {
            this.gameConsoleList = res as [GameConsole];
          });
      
        this.gameShopService.getProductTypeList().subscribe(res => {
        this.productTypeList = res as [ProductType];
        });

        this.gameShopService.getCompanyList().subscribe(res => {
        this.companyList = res as [Company];
        });

        this.editForm = this.formBuilder.group({
            name: [null, Validators.required],
            year: [null],
            description: [null, Validators.required],
            codeGameConsole: [null, Validators.required],
            codeProductType: [null, Validators.required],
            codeCompany: [null, Validators.required],
        });

        if (this.product) {
            this.editForm.patchValue({
                name: this.product.name,
                year: this.product.year,
                description: this.product.description,
                codeGameConsole: this.product.gameConsole.code,
                codeProductType: this.product.productType.code,
                codeCompany: this.product.company.code,
            });
        } else {
        }
    }

    onSave(){
        let ef = this.editForm.value;

        let gameConsole = this.gameConsoleList.find(obj => obj.code === ef.codeGameConsole);
        let productType = this.productTypeList.find(obj => obj.code === ef.codeProductType);
        let company = this.companyList.find(obj => obj.code === ef.codeCompany);

        let product;
        if(this.product){
            product = this.product;
        } else {
            product = new Product();
        }
        
        product.name = ef.name;
        product.year = ef.year;
        product.description = ef.description;
        product.gameConsole = gameConsole;
        product.productType = productType;
        product.company = company;

        this.gameShopService.save(product).subscribe(res => {
            this.product = res as Product;
            this.activeModal.dismiss('Saved!');
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
        this.activeModal.dismiss('Closed!');
    }
  }

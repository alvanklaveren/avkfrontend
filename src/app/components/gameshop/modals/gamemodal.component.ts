import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameConsole } from 'src/app/models/gameconsole';
import { Company } from 'src/app/models/company';
import { ProductType } from 'src/app/models/producttype';
import { GameShopService } from 'src/app/services/gameshop.service';
import { ProductStatus } from 'src/app/models/productStatus';
import { UserModalComponent } from '../../administrator/modals/usermodal.component';
import { AddCompanyModalComponent } from './addcompanymodal.component';

@Component({
  selector: 'app-game-modal',
  templateUrl: './gamemodal.component.html',
  styleUrls: ['./gamemodal.component.scss'],
})

export class GameModalComponent implements OnInit{

    @Input('product') product: Product;

    editForm: FormGroup;

    gameConsoleList: GameConsole[];
    productTypeList: ProductType[];
    companyList: Company[];

    productStatusList: ProductStatus[];

    askDelete = false;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private formBuilder: FormBuilder, private gameShopService: GameShopService) { }

    ngOnInit(){
        this.gameShopService.getGameConsoleList().subscribe(res => {
            this.gameConsoleList = res as GameConsole[];
            this.gameConsoleList = this.gameConsoleList.filter(gameConsole => gameConsole.code > 0);
        });
      
        this.gameShopService.getProductTypeList().subscribe(res => {
            this.productTypeList = res as ProductType[];
            this.productTypeList = this.productTypeList.filter(productType => productType.code > 0);
        });

        this.gameShopService.getCompanyList().subscribe(res => {
        this.companyList = res as Company[];
        });

        this.gameShopService.getProductStatusList().subscribe(res => {
            this.productStatusList = res as ProductStatus[];
        });

        this.editForm = this.formBuilder.group({
            name: [null, Validators.required],
            year: [null],
            description: [null, Validators.required],
            productStatus: [null],
            price: [null],
            codeGameConsole: [null, Validators.required],
            codeProductType: [null, Validators.required],
            codeCompany: [null, Validators.required],
        });

        if (this.product) {
            // the description in the @Input object (product) has been formatted 
            // to show as HTML, so we need the actual description from the database.
            this.gameShopService.getProductDescription(this.product.code).subscribe(res => {
                let description = (res as {description: string}).description as string;

                this.editForm.patchValue({
                    name: this.product.name,
                    year: this.product.year,
                    description: description,
                    productStatus: this.product.productStatus,
                    price: this.product.price,
                    codeGameConsole: this.product.gameConsole.code,
                    codeProductType: this.product.productType.code,
                    codeCompany: this.product.company.code,
                });
            });

        } else {
        }
    }

    addCompany(){
     let modal = this.modalService.open(AddCompanyModalComponent, {ariaLabelledBy: 'app-addcompanymodal'});
     modal.result.then(res => {
        this.gameShopService.getCompanyList().subscribe(res => {
            this.companyList = res as Company[];
        });  
     });
    }

    onDelete(){       
        if(!this.product || !this.product.code) { 
            return;
        }

        this.askDelete =  false;
        
        this.gameShopService.delete(this.product.code).subscribe(res => {
            this.activeModal.close("Deleted")
         }, (err) => {
            console.log("Delete failed");
         });
    }

    onSave(){
        let ef = this.editForm.value;

        let gameConsole = this.gameConsoleList.find(obj => obj.code === ef.codeGameConsole);
        let productType = this.productTypeList.find(obj => obj.code === ef.codeProductType);
        let company = this.companyList.find(obj => obj.code === ef.codeCompany);
        let productStatus = this.productStatusList.find(obj => obj === ef.productStatus);

        let product;
        if(this.product){
            product = this.product;
        } else {
            product = new Product();
        }
        
        product.name = ef.name;
        product.description = ef.description;
        product.year = ef.year;
        product.productStatus = ef.productStatus;
        product.price = ef.price;
        product.gameConsole = gameConsole;
        product.productType = productType;
        product.company = company;

        this.gameShopService.save(product).subscribe(res => {
            this.product = res as Product;
            if (this.product.imageHTML == undefined) {
                this.product.imageHTML = '?';
            }
            this.activeModal.close(this.product);
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

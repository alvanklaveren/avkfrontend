import { Component, OnInit } from '@angular/core';
import { GameShopService } from '../../services/gameshop.service';
import { ContextService } from '../../services/context.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductSort } from 'src/app/models/productSort';
import { GameConsole } from 'src/app/models/gameconsole';
import { ProductType } from 'src/app/models/producttype';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameModalComponent } from './details/gamemodal.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UploadImageModalComponent } from './details/uploadimagemodal.component';

@Component({
  selector: 'app-gameshop',
  templateUrl: './gameshop.component.html',
  styleUrls: ['./gameshop.component.scss'],
})

export class GameShop implements OnInit{

  loading = true;

  searchForm: FormGroup;
  searchProductName: string = '';
  searchProductNames: Array<String> = [];
  searchSubject: Subject<string> = new Subject<string>();

  listType = this.contextService.getGameListType();

  products: Array<Product>;

  gameConsoleList: [GameConsole];
  productTypeList: [ProductType];
  productSortList: [ProductSort];

  pageSize = 24;
  page = 0;

  imageUrl = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, private formBuilder: FormBuilder,
              private contextService:ContextService, private gameShopService: GameShopService){ 
  }

  ngOnInit(){

    this.searchSubject.pipe(debounceTime(200), distinctUntilChanged()).subscribe((searchString) => {
      console.log(searchString);
      if (searchString && searchString.length > 2) {
        this.gameShopService.simpleSearch(searchString, 0, 10).subscribe((response) => {
          this.searchProductNames = response as Array<String>;
          console.log(this.searchProductNames);
        });
      }
    });

    this.searchForm = this.formBuilder.group({
      productSortId: [null],
      codeGameConsole: [null],
      codeProductType: [null],
    });

    this.imageUrl = this.gameShopService.imageUrl;

    this.gameShopService.getProductSortList().subscribe(res => {
        this.productSortList = res as [ProductSort];

        this.gameShopService.getGameConsoleList().subscribe(res => {
          this.gameConsoleList = res as [GameConsole];

          this.gameShopService.getProductTypeList().subscribe(res => {
            this.productTypeList = res as [ProductType];

            let codeGameConsole = this.toNumber(this.route.snapshot.paramMap.get('codeGameConsole'));
            let codeProductType = this.toNumber(this.route.snapshot.paramMap.get('codeProductType'));
            let productSortId = 0;
        
            if(!codeGameConsole){ codeProductType = 0; }
            
            if(codeGameConsole == 0){
              codeProductType == 0;
              productSortId = 3;
            }
        
            if(!codeProductType){ codeProductType = 0; }
            
            this.searchForm.patchValue({
              productSortId: productSortId,
              codeGameConsole: codeGameConsole,
              codeProductType: codeProductType,
            });
        
            this.getProductList();
          });
        });
    });

  }

  getProductList(){
    let sf = this.searchForm.value;

    if(this.searchProductName && this.searchProductName.length > 0) {
      this.gameShopService.searchProductList(this.searchProductName, this.page, this.pageSize).subscribe( response => {
        if (scroll && this.products) {
          this.products = this.products.concat(response as Array<Product>);
        } else {
          this.products = response as Array<Product>;
        }
        this.loading = false;
      });
    } else {
      this.gameShopService.getProductList(sf.codeGameConsole, sf.codeProductType, this.page, this.pageSize, sf.productSortId).subscribe( response => {
        if (scroll && this.products) {
          this.products = this.products.concat(response as Array<Product>);
        } else {
          this.products = response as Array<Product>;
        }
        this.loading = false;
      });
    }  

  }

  openEditModal(product?){   
    let modal = this.modalService.open(GameModalComponent, {ariaLabelledBy: 'app-game-modal'});

    if(product) {
      modal.componentInstance.product = product;
    }

    modal.result.then((result) => {
      window.location.reload();
      
    }, (reason) => {
      if(reason === 'Deleted') {
        window.location.reload();
      }
    });
  }

  openUploadImageModal(product){   
    let modal = this.modalService.open(UploadImageModalComponent, {ariaLabelledBy: 'app-uploadimage-modal'});

    modal.componentInstance.product = product;

    modal.result.then((result) => {
      window.location.reload();
    }, (reason) => {
      window.location.reload();
    });
  }

  setListType(listType: string){
    this.listType = listType;
    this.contextService.setListType(listType);
  }

  search(){
    // this.searchForm.patchValue({
    //   productSort: 0,
    //   codeGameConsole: 0,
    //   codeProductType: 0
    // });

    this.products = [];
    this.page = 0;   
    this.getProductList();    
  }

  searchTypeAhead(){
    console.log("typing");
  }

  onSortChanged(){
    this.searchProductName = '';
    this.products = [];
    this.getProductList();
  }

  onFilterChanged(){
    this.searchProductName = '';

    let sf = this.searchForm.value;
    // same page navigate will change the url but will not reload the page (this is exactly what we want)
    this.router.navigateByUrl('gameshop/' + sf.codeGameConsole + '/' + sf.codeProductType);
    // refresh the part of the page that matters.
    this.products = [];
    this.getProductList();    
  }

  onScroll() {
    this.page++;
    this.getProductList();
  }

  toNumber(text: string){
    if(isNaN(Number(text))){
      return undefined;
    } 
    return Number(text);
  }

}

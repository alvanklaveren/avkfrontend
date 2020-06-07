import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameModalComponent } from './modals/gamemodal.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { Product } from 'src/app/models/product';
import { ProductSort } from 'src/app/models/productSort';
import { GameConsole } from 'src/app/models/gameconsole';
import { ProductType } from 'src/app/models/producttype';

import { GameShopService } from '../../services/gameshop.service';
import { ContextService } from '../../services/context.service';

import { UploadImageModalComponent } from './modals/uploadimagemodal.component';
import { RatingModalComponent } from './modals/ratingmodal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  addingCompany = false;
  newCompanyDescription = '';

  isAdmin: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, private formBuilder: FormBuilder,
              private contextService:ContextService, private gameShopService: GameShopService,
              private authenticationService: AuthenticationService){ 
  }

  ngOnInit(){

    this.contextService.setPageTitle(this, 'My Game Collection');

    this.isAdmin = this.authenticationService.isAdmin();

    this.searchSubject.pipe(debounceTime(200), distinctUntilChanged()).subscribe((searchString) => {      
      if (searchString && searchString.length > 2) {
        this.gameShopService.simpleSearch(searchString, 0, 10).subscribe((response) => {
          this.searchProductNames = response as Array<String>;
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

            let codeGameConsole = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeGameConsole'));
            let codeProductType = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeProductType'));
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
        this.fetchImages();
      });
    } else {
      this.gameShopService.getProductList(sf.codeGameConsole, sf.codeProductType, this.page, this.pageSize, sf.productSortId).subscribe( response => {
        if (scroll && this.products) {
          this.products = this.products.concat(response as Array<Product>);
        } else {
          this.products = response as Array<Product>;
        }

        this.loading = false;
        this.fetchImages();
      });
    }  

  }

  fetchImages(){
    for(let product of this.products){
      this.gameShopService.getProductMainImage(product.code).subscribe( blob => {
        
        let reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
            let rawImage = reader.result;
            product.imageHTML = '<img class="col" src="' + rawImage + '" onerror="this.style.display=&#39;block&#39;" alt="missing picture" style="width:95%;height:auto;padding-left:10%; padding-right:2%; margin-left:auto; margin-right:auto; cursor:pointer;"/>';
          }

      });
      
    }
  }

  openEditModal(product?){   

    if(!this.isAdmin){
      return;
    }

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

    if(!this.isAdmin){
      return;
    }

    let modal = this.modalService.open(UploadImageModalComponent, {ariaLabelledBy: 'app-uploadimage-modal'});

    modal.componentInstance.product = product;

    modal.result.then((result) => {
      window.location.reload();
    }, (reason) => {
      window.location.reload();
    });
  }

  openRatingModal(product){   

    if(!this.isAdmin){
      return;
    }

    let modal = this.modalService.open(RatingModalComponent, {ariaLabelledBy: 'app-rating-modal'});

    modal.componentInstance.product = product;

    modal.result.then((result) => {
      window.location.reload();
    }, (reason) => {
      window.location.reload();
    });
  }

  addCompany(){

    if(!this.isAdmin){
      return;
    }

    this.gameShopService.addCompany(this.newCompanyDescription).subscribe(res => {
      this.addingCompany = false;
      this.newCompanyDescription = '';
    });
  }

  setListType(listType: string){
    this.listType = listType;
    this.contextService.setListType(listType);
  }

  search(){
    this.products = [];
    this.page = 0;
    this.getProductList();    
  }

  deleteProductRating(product, productRating) {
    this.gameShopService.deleteProductRating(productRating.code).subscribe(res => {
      let index = product.productRatings.indexOf(productRating, 0);
      if(index > -1) {
        product.productRatings.splice(index, 1);
      }
    });
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

}

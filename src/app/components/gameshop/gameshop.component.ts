import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameModalComponent } from './modals/gamemodal.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject, merge } from 'rxjs';

import { Product } from 'src/app/models/product';
import { ProductSort } from 'src/app/models/productSort';
import { GameConsole } from 'src/app/models/gameconsole';
import { ProductType } from 'src/app/models/producttype';

import { GameShopService } from '../../services/gameshop.service';
import { ContextService } from '../../services/context.service';

import { UploadImageModalComponent } from './modals/uploadimagemodal.component';
import { RatingModalComponent } from './modals/ratingmodal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-gameshop',
  templateUrl: './gameshop.component.html',
  styleUrls: ['./gameshop.component.scss'],
})

export class GameShop implements OnInit{

  loading = true;
  isMenuCollapsed = true;
  isConsoleMenuCollapsed = true;

  mostRecentlyAdded = 'Most Recently Added Products';

  searchForm: FormGroup;
  searchProductName: string;
  searchProductNames: Array<{name:string}> = [];
  searchSubject: Subject<string> = new Subject<string>();

  searcher: {name:string};

  listType = this.contextService.getGameListType();

  products: Array<Product>;

  gameConsoleCompanies: Array<Company>;
  gameConsoleMenuList: Array<{companyName:string, consoles: Array<GameConsole>}> = [];

  codeGameConsole: number;
  codeProductType: number;

  gameConsoleList: Array<GameConsole>;
  productTypeList: Array<ProductType>;
  productSortList: Array<ProductSort>;

  pageSize = 24;
  page = 0;

  imageUrl = '';
  addingCompany = false;
  newCompanyDescription = '';

  isAdmin: boolean = false;

  selectedConsole = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal, private formBuilder: FormBuilder,
              private contextService:ContextService, private gameShopService: GameShopService,
              private authenticationService: AuthenticationService){ 
  }

  ngOnInit(){

    this.contextService.setPageTitle(this, 'My Game Collection');

    this.isAdmin = this.authenticationService.isAdmin();

    this.searchSubject.pipe(debounceTime(200), distinctUntilChanged()).subscribe((searchString) => {      
      this.searchProductName=searchString;
      if (searchString && searchString.length > 2) {
        this.gameShopService.simpleSearch(searchString, 0, 10).subscribe((response) => {
          let searchNames = response as Array<string>;
          this.searchProductNames = [];
          for(let searchPN of searchNames) {
            this.searchProductNames.push({name: searchPN});
          }
        });
      }
    });

    this.searchForm = this.formBuilder.group({
      productSortId: [null],
    });

    this.imageUrl = this.gameShopService.imageUrl;

    this.gameShopService.getProductSortList().subscribe(res => {
        this.productSortList = res as Array<ProductSort>;

        this.gameShopService.getGameConsoleList().subscribe(res => {
          this.gameConsoleList = res as Array<GameConsole>;
          
          this.gameConsoleCompanies = [];

          for(let gcc of this.gameConsoleList.map(gc => gc.company)) {
            // when company (gcc) is undefined, it is not a gameconsole, but a wildcard 
            // ('All', for instance), we add these wildcards to the menu separately.
            if(gcc) {
              if(this.gameConsoleCompanies.filter(obj => obj.code === gcc.code).length == 0) {
                this.gameConsoleCompanies.push(gcc);
              }
            }
          }

          for(let company of this.gameConsoleCompanies){
            let companyName: string = company.description;
            let consoles = this.gameConsoleList.filter(gc => gc.company?.code == company.code);
            let gameConsoleMenuItem = {companyName, consoles};
            this.gameConsoleMenuList.push(gameConsoleMenuItem);
          }

          this.gameShopService.getProductTypeList().subscribe(res => {
            this.productTypeList = res as Array<ProductType>;

            this.codeGameConsole = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeGameConsole'));
            this.codeProductType = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeProductType'));
            let productSortId = 0;
        
            if(!this.codeGameConsole){ 
              this.codeGameConsole = 0;
            }
            
            if(this.codeGameConsole == 0){
              this.codeProductType = 0;
              productSortId = 3;
            } else {
              productSortId = 0;
            }
        
            if(!this.codeProductType){ this.codeProductType = 0; }

            this.searchForm.patchValue({
              productSortId: productSortId,
            });
        
            this.getProductList();
          });
        });
    });

  }

  getProductList(){
    let sf = this.searchForm.value;

    this.searchForm.patchValue({
      productSortId: sf.productSortId,
    });

    if(!this.codeGameConsole || this.codeGameConsole === 0){ 
      if((!this.codeProductType || this.codeProductType === 0) && sf.productSortId === 3){
        this.selectedConsole = this.mostRecentlyAdded;
      } else {
        this.selectedConsole = '';
      }
    } else {
      this.selectedConsole = this.gameConsoleList.find(gc => gc.code === this.codeGameConsole).description;            
    }

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
      this.gameShopService.getProductList(this.codeGameConsole, this.codeProductType, this.page, this.pageSize, sf.productSortId).subscribe( response => {
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

      let jobs = [];

      jobs.push(this.gameShopService.getProductMainImage(product.code));

      merge(...jobs).subscribe(res => {
        
        let blob: Blob = res as Blob;

        let that = this;

        let reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
            let rawImage = reader.result;
            if(that.isAdmin) {
              if(rawImage.toString() !== 'data:'){
                product.imageHTML = '<img class="col" src="' + rawImage + '" onerror="this.style.display=&#39;block&#39;" alt="[Click to upload picture]" style="width:95%;height:auto;padding-left:10%; padding-right:2%; margin-left:auto; margin-right:auto; cursor:pointer;"/>';
              } else {
                product.imageHTML = '?';
              }
            } else {
              product.imageHTML = '<img class="col" src="' + rawImage + '" onerror="this.style.display=&#39;block&#39;" alt="missing picture" style="width:95%;height:auto;padding-left:10%; padding-right:2%; margin-left:auto; margin-right:auto; cursor:pointer;"/>';
            }
          }

      });
      
    }
  }

  openEditModal(product?){   

    if(!this.isAdmin){
      return;
    }

    let modal = this.modalService.open(GameModalComponent, {ariaLabelledBy: 'app-game-modal'});

    let isNew: Boolean = true;

    if(product) {
      modal.componentInstance.product = product;
      isNew = false;
    }

    modal.result.then((result) => {
      if(isNew){
        product = result as Product;
        let replaceProducts: Array<Product> = [];
        replaceProducts.push(product);
        replaceProducts.push(...this.products);
        this.products = replaceProducts;
      }
      
    }, (reason) => {
      if(reason === 'Deleted') {
        
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
      this.fetchImages();
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
    this.products = [];
    this.getProductList();
  }

  onFilterChanged(){
    this.searchProductName = '';

    // same page navigate will change the url but will not reload the page (this is exactly what we want)
    this.router.navigateByUrl('gameshop/' + this.codeGameConsole + '/' + this.codeProductType);

    // refresh the part of the page that matters.
    this.products = [];
    this.getProductList();
  }

  onScroll() {
    let sf = this.searchForm.value;
    if(this.selectedConsole === this.mostRecentlyAdded){ 
      return; // do not fetch more than 1 page (24 items) when fetching most recently added products.
    }

    this.page++;
    this.getProductList();
  }

}

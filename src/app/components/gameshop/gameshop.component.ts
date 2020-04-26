import { Component, OnInit } from '@angular/core';
import { GameShopService } from '../../services/gameshop.service';
import { ContextService } from '../../services/context.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductSort } from 'src/app/models/productSort';

@Component({
  selector: 'app-gameshop',
  templateUrl: './gameshop.component.html',
  styleUrls: ['./gameshop.component.scss'],
})

export class GameShop implements OnInit{

  loading = true;

  listType = this.contextService.getGameListType();

  products: Array<Product>;

  codeGameConsole: number;
  codeProductType: number;
 
  productSortList: [ProductSort];
  productSort = 0;

  pageSize = 24;
  page = 0;

  imageUrl = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private title:Title,
              private contextService:ContextService, private gameShopService: GameShopService){ 
  }

  ngOnInit(){
    this.imageUrl = this.gameShopService.imageUrl;

    this.gameShopService.getProductSortList().subscribe(res => {
        this.productSortList = res as [ProductSort];
        console.log(this.productSortList);
    });

    this.codeGameConsole = this.toNumber(this.route.snapshot.paramMap.get('codeGameConsole'));
    this.codeProductType = this.toNumber(this.route.snapshot.paramMap.get('codeProductType'));

    if(!this.codeGameConsole){
      this.codeProductType = 0;
    }

    if(this.codeGameConsole == 0){
      this.codeProductType == 0;
      this.productSort = 3;
    }

    if(!this.codeProductType){
      this.codeProductType = 0;
    }

    this.getProductList();
  }

  getProductList(){
    this.gameShopService.getProductList(this.codeGameConsole, this.codeProductType, this.page, this.pageSize, this.productSort).subscribe( response => {
      if (scroll && this.products) {
        this.products = this.products.concat(response as Array<Product>);
      } else {
        this.products = response as Array<Product>;
      }
      this.loading = false;
    });
  
  }

  setListType(listType: string){
    this.listType = listType;
    this.contextService.setListType(listType);
  }

  onSortChanged(event){
    let sort = event.value as ProductSort;
    console.log(sort);
    this.productSort = sort.id;
  }

  onScroll() {
    this.page++;
    console.log("scrolling to page " + this.page);
    this.getProductList();
  }

  toNumber(text: string){
    if(isNaN(Number(text))){
      return undefined;
    } 
    return Number(text);
  }

}

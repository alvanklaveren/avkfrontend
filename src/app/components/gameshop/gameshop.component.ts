import { Component, OnInit } from '@angular/core';
import { GameShopService } from '../../services/gameshop.service';
import { ContextService } from '../../services/context.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gameshop',
  templateUrl: './gameshop.component.html',
  styleUrls: ['./gameshop.component.scss'],
})

export class GameShop implements OnInit{

  loading = true;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private title:Title,
              private contextService:ContextService, private gameShopService: GameShopService){ 
  }

  products: Array<Product>;

  codeGameConsole: number;
  codeProductType: number;
  pageSize = 12;
  page = 0;

  ngOnInit(){
    this.codeGameConsole = this.toNumber(this.route.snapshot.paramMap.get('codeGameConsole'));
    this.codeProductType = this.toNumber(this.route.snapshot.paramMap.get('codeProductType'));

    if(!this.codeGameConsole){
      this.codeProductType = 0;
    }

    if(!this.codeProductType){
      this.codeProductType = 0;
    }

    this.getProductList();
  }

  getProductList(){
    this.gameShopService.getProductList(this.codeGameConsole, this.codeProductType, this.page, this.pageSize).subscribe( response => {

      if (scroll && this.products) {
        this.products = this.products.concat(response as Array<Product>);
      } else {
        this.products = response as Array<Product>;
      }

      this.loading = false;
    });
  
  }

  toNumber(text: string){
    if(isNaN(Number(text))){
      return undefined;
    } 
    return Number(text);
  }

}

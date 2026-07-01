import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { GameShopService } from '../../services/gameshop.service';
import { ContextService } from '../../services/context.service';
import { ProductMobileDTO } from '../../models/productmobiledto';

@Component({
  selector: 'app-gameshopmobile',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './gameshopmobile.component.html',
})

export class GameShopMobile implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
              private title:Title, private modalService: NgbModal,
              private contextService:ContextService, private gameShopService: GameShopService){ 
  }

  products: ProductMobileDTO[] = [];
  pageContent: any;

  ngOnInit(){

    const codeGameConsole = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeGameConsole') ?? '') ?? 0;
    const codeProductType = this.contextService.toNumber(this.route.snapshot.paramMap.get('codeProductType') ?? '') ?? 0;
    const description = this.route.snapshot.paramMap.get('description') ?? '';

    this.contextService.setPageTitle(this, 'Gameshop Mobile');
    this.gameShopService.getGameShopMobile(codeGameConsole, codeProductType, description).subscribe(res => {
      this.products = res;
      // this.pageContent = JSON.stringify(this.products, null, 1);
    });
  }
  
}


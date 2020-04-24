import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameShopService {

  constructor(private http: HttpClient) {}

  getProductList(codeGameConsole: number, codeProductType: number, page: number, pageSize: number, sortId?: number) {
     return this.http.post(environment.backendUrl + 'gameshop/getProductList', {codeGameConsole: codeGameConsole, codeProductType: codeProductType, page: page, pageSize: pageSize, sortId: sortId});
  }


}
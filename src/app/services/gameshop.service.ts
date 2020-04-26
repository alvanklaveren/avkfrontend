import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameShopService {

  imageUrl = environment.backendUrl + 'gameshop/getProductMainImage?codeProduct=';

  constructor(private http: HttpClient) {}

  getProductList(codeGameConsole: number, codeProductType: number, page: number, pageSize: number, sortId?: number) {
     return this.http.post(environment.backendUrl + 'gameshop/getProductList', {codeGameConsole: codeGameConsole, codeProductType: codeProductType, page: page, pageSize: pageSize, sortId: sortId});
  }

  getProductMainImage(codeProduct: number): Observable<Blob> {
    let url = environment.backendUrl + 'gameshop/getProductMainImage?codeProduct=' + codeProduct;
    return this.http.get(url, {responseType: 'blob'});
  }

  getProductSortList(){
    return this.http.get(environment.backendUrl + 'gameshop/getProductSortList');
  }

}
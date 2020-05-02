import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class GameShopService {

  imageUrl = environment.backendUrl + 'gameshop/getProductMainImage?codeProduct=';

  constructor(private http: HttpClient) {}

  getProductList(codeGameConsole: number, codeProductType: number, page: number, pageSize: number, sortId?: number) {
     return this.http.post(environment.backendUrl + 'gameshop/getProductList', {codeGameConsole: codeGameConsole, codeProductType: codeProductType, page: page, pageSize: pageSize, sortId: sortId});
  }

  searchProductList(productName: string, page: number, pageSize: number) {
    return this.http.post(environment.backendUrl + 'gameshop/searchProductList', {productName:productName, page: page, pageSize: pageSize});
  }

  simpleSearch(productName: string, page: number, pageSize: number) {
    return this.http.post(environment.backendUrl + 'gameshop/simpleSearch', {productName: productName, page: page, pageSize: pageSize});
  }

  getProductMainImage(codeProduct: number): Observable<Blob> {
    let url = environment.backendUrl + 'gameshop/getProductMainImage?codeProduct=' + codeProduct;
    return this.http.get(url, {responseType: 'blob'});
  }

  getProductSortList(){
    return this.http.get(environment.backendUrl + 'gameshop/getProductSortList');
  }

  getGameConsoleList(){
    return this.http.get(environment.backendUrl + 'gameshop/getGameConsoleList');
  }

  getProductTypeList(){
    return this.http.get(environment.backendUrl + 'gameshop/getProductTypeList');
  }

  getCompanyList(){
    return this.http.get(environment.backendUrl + 'gameshop/getCompanyList');
  }

  save(product: Product){
    return this.http.post(environment.backendUrl + 'gameshop/save', product); 
  }

  uploadImage(codeProduct: Number, imageFile: File) {
    console.log(imageFile);
    return this.http.post(environment.backendUrl + 'gameshop/uploadImage', { codeProduct: codeProduct, imageFile: imageFile }); 
  }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

  getProductStatusList(){
    return this.http.get(environment.backendUrl + 'gameshop/getProductStatusList');
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

  getRatingUrls(){
    return this.http.get(environment.backendUrl + 'gameshop/getRatingUrls');
  }

  getCompanyList(){
    return this.http.get(environment.backendUrl + 'gameshop/getCompanyList');
  }

  addCompany(description: string) {
    return this.http.post(environment.backendUrl + 'gameshop/addCompany', description); 
  }

  save(product: Product){
    return this.http.post(environment.backendUrl + 'gameshop/save', product); 
  }

  saveProductRating(codeProduct: number, codeRatingUrl: string, rating: number){
    return this.http.post(environment.backendUrl + 'gameshop/saveProductRating', { codeProduct: codeProduct, codeRatingUrl: codeRatingUrl, rating: rating }); 
  }

  delete(codeProduct: Number){
    return this.http.post(environment.backendUrl + 'gameshop/delete', codeProduct); 
  }

  deleteProductRating(codeProductRating: Number){
    return this.http.post(environment.backendUrl + 'gameshop/deleteProductRating', codeProductRating); 
  }

  getGameShopMobile(codeGameConsole: number, codeProductType: number, description?: string){
    if(!description){
      return this.http.get(environment.backendUrl + 'gameshop/gameshopmobile/' + codeGameConsole + '/' + codeProductType); 
    } else {
      return this.http.get(environment.backendUrl + 'gameshop/gameshopmobile/' + codeGameConsole + '/' + codeProductType + '/' + description); 
    }
  }

  uploadImage(codeProduct: any, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('imageFile', file);
    formdata.append('codeProduct', codeProduct);
    
    const req = new HttpRequest('POST', environment.backendUrl + 'gameshop/uploadImage', formdata, {
      reportProgress: false,
      responseType: 'text',
    });

    return this.http.request(req);
  }

  uploadImageAlt(codeProduct: number, fileContent) {
    // for some reason, sending a multipartfile is not working.. god knows why. 
    // but it started to go wrong when I added jwt auth filters in spring.
    // the below will work (sends a base64 formatted string and decodes on backend)
    return this.http.post(environment.backendUrl + 'gameshop/uploadImageAlt', {codeProduct: codeProduct, fileContent: btoa(fileContent)});
    
  }

  getProductDescription(codeProduct:number){
    return this.http.post(environment.backendUrl + 'gameshop/getProductDescription', codeProduct);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Constants } from '../models/constants';

@Injectable({ providedIn: 'root' })
export class AdministratorService {

  constantImageUrl = environment.backendUrl + 'administrator/getConstantsImage/?codeConstants=';
  
  constructor(private http: HttpClient) {}

  getConstant(codeConstants: number){
    return this.http.post(environment.backendUrl + 'administrator/getConstant', codeConstants);
  }

  getConstantById(constantsId: string){
    return this.http.post(environment.backendUrl + 'administrator/getConstantById', constantsId);
  }

  saveConstant(constants: Constants){
    return this.http.post(environment.backendUrl + 'administrator/saveConstant', constants);
  }

  uploadImage(codeConstants: any, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('imageFile', file);
    if(codeConstants) {
      formdata.append('codeConstants', codeConstants);
    }
    
    const req = new HttpRequest('POST', environment.backendUrl + 'administrator/uploadConstantsImage', formdata, {
      reportProgress: false,
      responseType: 'text',
    });

    return this.http.request(req);
  }

}
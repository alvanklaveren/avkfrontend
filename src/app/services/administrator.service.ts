import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Constants } from '../models/constants';
import { ForumUser } from '../models/forumuser';

@Injectable({ providedIn: 'root' })
export class AdministratorService {

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

  uploadImageAlt(codeConstants: any, fileContent) {
    // for some reason, sending a multipartfile is not working.. god knows why. 
    // but it started to go wrong when I added jwt auth filters in spring.
    // the below will work (sends a base64 formatted string and decodes on backend)
    console.log(btoa(fileContent));
    return this.http.post(environment.backendUrl + 'administrator/uploadConstantsImageAlt', {codeConstants: codeConstants, fileContent: btoa(fileContent)});    
  }

  getConstantsImage(codeConstants: number): Observable<Blob> {
    return this.http.get(environment.backendUrl + 'administrator/getConstantsImage/?codeConstants=' + codeConstants, {responseType: 'blob'});
  }

  getUsers(){
    return this.http.post(environment.backendUrl + 'administrator/getUsers', {});
  }

  getClassifications(){
    return this.http.post(environment.backendUrl + 'administrator/getClassifications', {});
  }

  saveUser(forumUser: ForumUser){
    return this.http.post(environment.backendUrl + 'administrator/saveUser', forumUser);
  }

  deleteUser(codeForumUser: number){
    return this.http.post(environment.backendUrl + 'administrator/deleteUser', codeForumUser);
  }

  saveCodeTableRow(codetable: number, codeTableRow: any){
    return this.http.post(environment.backendUrl + 'administrator/saveCodeTableRow', {codeTable: codetable, codeTableRow: codeTableRow});
  }

  deleteCodeTableRow(codetable: number, code: number){
    return this.http.post(environment.backendUrl + 'administrator/deleteCodeTableRow', {codeTable: codetable, code: code});
  }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { MessageCategory } from '../models/messagecategory';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForumService {


  avatarUrl = environment.backendUrl + 'forum/getAvatar/?codeForumUser=';
  messageImageUrl = environment.backendUrl + 'forum/getMessageImage?codeMessageImage=';

  constructor(private http: HttpClient) {}

  getHomepageMessages(page:number, pageSize:number) {
    return this.http.post(environment.backendUrl + 'forum/getHomePageMessages', { page: page, pageSize: pageSize });
  }

  getMessageCategories(){
    return this.http.get(environment.backendUrl + 'forum/getMessageCategories');
  }

  getMessageCategory(codeMessageCategory: number){
    return this.http.post(environment.backendUrl + 'forum/getMessageCategory', codeMessageCategory);
  }

  getMessageCount(codeMessageCategory: number){
    return this.http.post(environment.backendUrl + 'forum/getMessageCount', codeMessageCategory);
  }

  getMessagesByCategory(codeMessageCategory: number){
    return this.http.post(environment.backendUrl + 'forum/getMessagesByCategory', codeMessageCategory);
  }

  getMessage(codeMessage: number){
    return this.http.post(environment.backendUrl + 'forum/getMessage', codeMessage);
  }

  getReplyMessages(codeMessage: number){
    return this.http.post(environment.backendUrl + 'forum/getReplyMessages', codeMessage);
  }

  prepareMessage(messageText: string){
    return this.http.post(environment.backendUrl + 'forum/prepareMessage', messageText);
  }

  save(message: Message){
    return this.http.post(environment.backendUrl + 'forum/save', message);
  }

  saveMessageCategory(messageCategory: MessageCategory){
    return this.http.post(environment.backendUrl + 'forum/saveMessageCategory', messageCategory);
  }

  delete(message: Message){
    return this.http.post(environment.backendUrl + 'forum/delete', message.code);
  }

  deleteMessageCategory(messageCategory: MessageCategory){
    return this.http.post(environment.backendUrl + 'forum/deleteMessageCategory', messageCategory.code);
  }

  uploadImage(file: File, codeMessage?: any): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('imageFile', file);
    if(codeMessage) {
      formdata.append('codeMessage', codeMessage);
    }
    
    const req = new HttpRequest('POST', environment.backendUrl + 'forum/uploadImage', formdata, {
      reportProgress: false,
      responseType: 'text',
    });

    return this.http.request(req);
  }

  uploadImageAlt(fileContent, codeMessage?: any ) {
    // for some reason, sending a multipartfile is not working.. god knows why. 
    // but it started to go wrong when I added jwt auth filters in spring.
    // the below will work (sends a base64 formatted string and decodes on backend)
    return this.http.post(environment.backendUrl + 'forum/uploadImageAlt', {codeMessage: codeMessage, fileContent: btoa(fileContent)});
    
  }

  getImages() {
    return this.http.post(environment.backendUrl + 'forum/getImages', {});
  }

  emailNewPassword(username: string) {
    return this.http.post(environment.backendUrl + 'forum/emailNewPassword', username);
  }

  testEmail() {
    return this.http.post(environment.backendUrl + 'forum/testEmail', {});
  }

}
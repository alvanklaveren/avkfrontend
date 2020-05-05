import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { MessageCategory } from '../models/messagecategory';

@Injectable({ providedIn: 'root' })
export class ForumService {


  avatarUrl = environment.backendUrl + 'forum/getAvatar/?codeForumUser=';

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

}
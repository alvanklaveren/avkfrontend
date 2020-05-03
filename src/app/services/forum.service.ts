import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ForumService {

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
  
}
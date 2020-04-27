import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ForumService {

  constructor(private http: HttpClient) {}

  getHomepageMessages(page:number, pageSize:number) {
    return this.http.post(environment.backendUrl + 'forum/getHomePageMessages', { page: page, pageSize: pageSize });
  }

}
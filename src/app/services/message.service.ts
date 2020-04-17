import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor(private http: HttpClient) {}

  getHomepageMessages() {
    return this.http.post(environment.backendUrl + 'message/homepage', {});
  }

}
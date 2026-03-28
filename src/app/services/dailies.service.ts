import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { MessageCategory } from '../models/messagecategory';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DailiesService {

  constructor(private http: HttpClient) {}

  getDailiesMessages(page:number, pageSize:number) {
    return this.http.post(environment.backendUrl + 'dailies/getDailies', { page: page, pageSize: pageSize });
  }

}
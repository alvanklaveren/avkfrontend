import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DailiesService {

  constructor(private http: HttpClient) {}

  getDailiesMessages(page:number, pageSize:number) {
    return this.http.post(environment.backendUrl + 'dailies/getDailies', { page: page, pageSize: pageSize });
  }

  getLatest() {
    return this.http.get(environment.backendUrl + 'dailies/latest', { responseType: 'blob' });
  }



  save(image: []) {
    return this.http.post(environment.backendUrl + 'dailies/save', { base64Image: image });
  }

}
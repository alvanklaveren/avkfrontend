import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "";
    this.tokenStorageService.getAccessToken().subscribe(res => {
      token = res as string;
    });

    if(token) {
      // Always add the Authorization token, so the backend can decide whether or not to continue with the roles given
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          // 'Accept'       : 'application/json', // ACCEPT ALL
          'Authorization': `${token}`,
        },
      });

    }

    return next.handle(req);
  }
}
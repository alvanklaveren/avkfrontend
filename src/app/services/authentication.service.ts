
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';

import { AuthService } from 'ngx-auth';

import { ForumUser } from '../models/forumuser';
import { Router } from '@angular/router';

interface IAccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements AuthService {

  public user = new BehaviorSubject(null);
  public tokenExpired = new BehaviorSubject(null);

  private admin = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private router: Router,
  ) { }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenService
      .getAccessToken().pipe(
        map((token) => !!token));
  }

  public setUser() {

    let sessionUser = this.tokenService.getUser();

    if (sessionUser) {
      this.http.post(environment.backendUrl + 'user/get', { id: sessionUser.id }).subscribe((response) => {
        let usr = response as ForumUser;        
        let user = Object.assign(new ForumUser(), usr);

        this.admin = this.hasRole(user, 'ROLE_ADMIN');
        this.user.next(user);
      }, (error) => {
        this.logout();
      });
    } else {
      this.logout();
    }
  }

  public getUser() {
    return this.user;
  }

  public getTokenUser() {
    return this.tokenService.getUser();
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * sessionStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenService.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<object>}
   */
  public refreshToken(): Observable<object> {
    return this.tokenService
      .getRefreshToken().pipe(
        switchMap((refreshToken: string) => {
          return this.http.post(environment.backendUrl + 'refresh', refreshToken );
        }),
        tap(this.saveAccessData.bind(this)),
        catchError((err) => {
          this.logout();

          return observableThrowError(err);
        }));
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {

    if (!sessionStorage.getItem('refreshToken')) {
      return false;
    } 

    if (response.status === 401) {
      
//      alert('send off');
      this.tokenExpired.next(true);
      return false;

    } else {
      if (response.status === 500) {
        //
      }
      return false;
    }
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {

    if (url.endsWith('/refresh')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(username: string, password: string) {
    return this.http.post(environment.backendUrl + 'login', { username: username, password: password });
  }

  /**
   * Logout
   */
  public logout(): void {
    this.admin = false;
    this.tokenService.clear();
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {IAccessData} data
   */
  public saveAccessData({ accessToken, refreshToken }: IAccessData) {
    this.tokenService.setAccessToken(accessToken);
    this.tokenService.setRefreshToken(refreshToken);
  }
 
  public isAdmin() {
    return this.admin;
  }

  public emailNewPassword(emailAddress: String) { 
    return this.http.post(environment.backendUrl + '/user/emailNewPassword', { emailAddress: emailAddress }, { observe: 'response' });
  }

  public hasRole(forumUser: ForumUser, role) {
    if (forumUser.classification.description === role) {
      return true;
    } else {
      return false;
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from './translation.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

const ISOA2 = 'isoA2';
const THEME = 'theme';
const LIST_TYPE = 'listType';
const AGREED_TO_COOKIE = 'agreedToCookie';
const AGREED_TO_COOKIE_ALIVE_DAYS = 1;

@Injectable({ providedIn: 'root' })
export class ContextService {


  constructor(private http: HttpClient, private translationService:TranslationService, 
              private cookieService: CookieService) { }

  public getGameListType(): string {
    let listType = localStorage.getItem(LIST_TYPE);
    if(!listType || listType === ''){ listType = 'flex';}
    return listType;
  }

  public setListType(listType: string): ContextService {
    return this.setLocalGlobal(LIST_TYPE, listType);
  }

  public getIsoA2(): string {
    let isoA2 = localStorage.getItem(ISOA2);
    if(!isoA2 || isoA2 === ''){ isoA2 = 'us';}
    return isoA2;
  }

  public setIsoA2(isoA2: string): ContextService {
    return this.setLocalGlobal(ISOA2, isoA2);
  }

  public getTheme(): string {
    let theme = localStorage.getItem(THEME);
    if(!theme || theme === ''){ theme = 'light';}
    return theme;
  }

  public setTheme(theme: string): ContextService {
    return this.setLocalGlobal(THEME, theme);
  }

  public hasAgreedToCookies(): boolean {
    let cookie = this.cookieService.get(AGREED_TO_COOKIE);
    console.log(cookie);
    if(cookie == null || cookie == undefined || cookie === 'undefined' || cookie === '') { 
      return false; 
    }    

    let existingCookieDate = moment(cookie);
    if(existingCookieDate == null || existingCookieDate == undefined) { return false; }

    if(moment.utc().subtract(AGREED_TO_COOKIE_ALIVE_DAYS, 'days').isAfter(existingCookieDate)){
      return false;
    }
    return true;
  }

  public setAgreedToCookies(): ContextService{
    let today = moment.utc();
    console.log(today.format());
    this.cookieService.set(AGREED_TO_COOKIE, today.format());
    return this;
  }

  public translate(original: string){
    let isoA2 = this.getIsoA2();
    return this.translationService.translate(original, isoA2);
  }

  public setSessionGlobal(key, value){
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, value);  
    return this;
  }

  public getSessionGlobal(key){
    return sessionStorage.getItem(key);
  }

  public setLocalGlobal(key, value){
    localStorage.removeItem(key);
    localStorage.setItem(key, value);  
    return this;
  }

  public getLocalGlobal(key){
    return localStorage.getItem(key);
  }

  public toNumber(text: string){
    if(isNaN(Number(text))){
      return undefined;
    } 
    return Number(text);
  }

  public setPageTitle(page: any, title: string) {
    this.translate(title).subscribe(res => {
      let response = res as any;
      page.title.setTitle("AVK - " + response.result);
    });
  }

}
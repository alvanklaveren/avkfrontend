import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from './translation.service';

const ISOA2 = 'isoA2';
const THEME = 'theme';
const LIST_TYPE = 'listType';
const AGREED_TO_COOKIE = 'agreedToCookie';

@Injectable({ providedIn: 'root' })
export class ContextService {


  constructor(private http: HttpClient, private translationService:TranslationService) { }

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
    return (sessionStorage.getItem(AGREED_TO_COOKIE) === 'y');
  }

  public setAgreedToCookies(): ContextService{
    return this.setSessionGlobal(AGREED_TO_COOKIE, 'y');
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
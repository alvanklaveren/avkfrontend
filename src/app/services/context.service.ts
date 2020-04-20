import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from './translation.service';

const ISOA2 = 'isoA2';
const AGREED_TO_COOKIE = 'agreedToCookie';

@Injectable({ providedIn: 'root' })
export class ContextService {


  constructor(private http: HttpClient, private translationService:TranslationService) { }

  public getIsoA2(): string {
    return sessionStorage.getItem(ISOA2);
  }

  public hasAgreedToCookies(): boolean {
    if(sessionStorage.getItem(AGREED_TO_COOKIE) === 'y'){
      return true;
    } 
    return false;
  }

  public setAgreedToCookies(): ContextService{
    this.setGlobal(AGREED_TO_COOKIE, 'y');
    return this;
  }

  public setIsoA2(isoA2: string): ContextService {
    this.setGlobal(ISOA2, isoA2);
    return this;
  }

  public translate(original: string){
    let isoA2 = sessionStorage.getItem(ISOA2);
    if(!isoA2 || isoA2 === '') { this.setIsoA2('us'); }
    return this.translationService.translate(original, isoA2);
  }

  private setGlobal(key, value){
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, value);  
    // TODO: could add saving to backend here.. so the language is stored regardless of the browser. 
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from './translation.service';

@Injectable({ providedIn: 'root' })
export class ContextService {

  public isoA2 = 'us';

  constructor(private http: HttpClient, private translationService:TranslationService) { }
  
  translate(original: string){
    console.log("translating using: " + this.isoA2);
    return this.translationService.translate(original, this.isoA2);
  }

  setIsoA2(value){
    this.isoA2 = value;
    console.log("new IsoA2: " + this.isoA2);
  }

}
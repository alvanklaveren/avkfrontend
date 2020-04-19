import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContextService } from './context.service';

@Injectable({ providedIn: 'root' })
export class TranslationService {

  constructor(private http: HttpClient) {}

  translate(original: string, isoA2?: string) {
    return this.http.post(environment.backendUrl + 'translation/translate', {original: original, isoA2: isoA2});
  }

}
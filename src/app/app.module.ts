import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutMeModule } from './components/aboutme/aboutme.module';
import { HomePageModule } from './components/homepage/homepage.module';

import { SharedModule } from './components/shared/shared.module';
import { GameShopModule } from './components/gameshop/gameshop.module';
import { ForumModule } from './components/forum/forum.module';
import { AdministratorPageModule } from './components/administrator/administrator.module';
import { ArticlesModule } from './components/articles/articles.module';
import { AuthInterceptor } from './auth.interceptor';
import { CookieModalComponent } from './cookiemodal.component';
import { CookieService } from 'ngx-cookie-service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, environment.backendUrl + 'translation/dictionary/', "");
}
@NgModule({
  declarations: [
    AppComponent,
    CookieModalComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    HomePageModule,
    AboutMeModule,
    GameShopModule,
    ForumModule,
    AdministratorPageModule,
    ArticlesModule,
  ],
  providers: [CookieService, {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor,  multi: true}],
  bootstrap: [AppComponent] 
})
export class AppModule { }

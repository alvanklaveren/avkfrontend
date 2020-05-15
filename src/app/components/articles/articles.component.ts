import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { ContextService } from '../../services/context.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})

export class Articles implements OnInit{
  @ViewChild('articleDiv', { static: true }) articleDiv: { nativeElement: { innerHTML: string; }; };

  selectedArticle = null;
  articleText: string = null;
  articleId: string = null;

  INDEX: string = 'index';
  
  javaArticles = [
    {id: 'REST-EASY', title: 'Using Rest-Easy for Restful services', document:'REST-EASY.html', order: 1},
    {id: 'SpringAndWicket', title: 'How to add Spring to your existing Wicket application Part 1: Setup', document:'SpringWicket.html', order: 2 },
    {id: 'OPENSHIFTv2-TOMCAT7', title: 'How to install a Java EE/Tomcat7 webapplication on OpenShift Online v2', document:'openshift-tomcat7.html', order: 3 },
    {id: 'OPENSHIFTv3-WILDFLY', title: 'How to install a Java EE/Wildfly webapplication on OpenShift Online v3', document:'openshift-wildfly.html', order: 4 },
  ] 

  webhostingArticles = [
    {id: 'Install-SSL-Certificate', title: 'Acquire and install an SSL certificate', 'document':'ssl-certificate.html', order: 5 },
    {id: 'HTTPS-over-port-443', title: 'How to get tomcat run over port 443 (https)', 'document':'https-over-443.html', order: 6 },
  ]

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private title:Title, 
              private contextService:ContextService){ }

  ngAfterViewInit() {

    this.articleId = this.route.snapshot.paramMap.get('articleId');

    if(this.articleId === this.INDEX){
      this.backToIndex();
      return;
    }

    let selectedArticle = this.getSelectedArticle();
    if(!selectedArticle){
      this.backToIndex();
      return;
    }
   
    this.replaceArticleDiv(this.articleId);
  }

  replaceArticleDiv(articleId){
    this.router.navigateByUrl('articles/' + articleId);
    this.http.get('./assets/articlepages/' + this.getSelectedArticle().document, {responseType: 'text'}).subscribe(filecontent => {
      this.articleText = filecontent;

      // doing it like this, allows the htmlsanitizer to skip this text, so we can use tags and attributes
      this.articleDiv.nativeElement.innerHTML = this.articleText; 
    });
  }

  previousArticle(){
    this.previousNextArticle(-1);
  }

  nextArticle(){
    this.previousNextArticle(1);
  }

  previousNextArticle(prevnext: number){
    if(!this.selectedArticle) {
      this.backToIndex();
    }
    
    let nextArticle = this.getArticleByOrder(this.selectedArticle.order + prevnext);

    if(!nextArticle) {
      this.backToIndex();
    } else {
      this.articleId = nextArticle.id;
      this.replaceArticleDiv(this.articleId);
    }
  }

  getSelectedArticle(){
    this.selectedArticle = this.javaArticles.find(article => article.id === this.articleId);
    console.log("selected article: ");
    console.log(this.selectedArticle);
    if(!this.selectedArticle) {
      this.selectedArticle = this.webhostingArticles.find(article => article.id === this.articleId);
    } 
    return this.selectedArticle;
  }

  getArticleByOrder(order: number){
    let article = this.javaArticles.find(article => article.order === order);
    console.log(article);
    if(!article) {
      article = this.webhostingArticles.find(article => article.order === order);
    } 
    return article;
  }

  backToIndex(){
    this.articleId = this.INDEX;
    this.articleText = '';
    this.articleDiv.nativeElement.innerHTML = this.articleText;
  }

  goToArticle(articleId){
    this.articleId = articleId;
    this.replaceArticleDiv(this.articleId);
  }

  ngOnInit(){
    
    this.contextService.setPageTitle(this, 'Articles'); 

  }

}

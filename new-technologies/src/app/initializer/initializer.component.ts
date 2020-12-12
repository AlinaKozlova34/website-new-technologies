import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../integration/services/article.service'
import {Interceptor} from "../interceptor/interceptor";

@Component({
  selector: 'app-initializer',
  templateUrl: './initializer.component.html',
  styleUrls: ['./initializer.component.css'],
  providers: [ ArticleService, Interceptor]
})
export class InitializerComponent implements OnInit {

  constructor(private httpService: ArticleService) { }

  ngOnInit(): void {
    this.httpService.getPreviewInformation().subscribe(info => {
      this.httpService.previewInformation = info;
    });
  }

}


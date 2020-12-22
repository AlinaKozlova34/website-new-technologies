import {Component, OnInit} from '@angular/core';
import {Data} from "../integration/models/data";
import {ActivatedRoute} from "@angular/router";
import { LocalStorage } from '../local-storage';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit {

  data: Data=null;
  id: string;
  url='';
  storage: LocalStorage;

  constructor(private route: ActivatedRoute) {
    this.storage = new LocalStorage();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.data = JSON.parse(this.storage.getItem('articles')).filter(item => item.id === this.id)[0];
      console.log(this.id);
    });

  }

}

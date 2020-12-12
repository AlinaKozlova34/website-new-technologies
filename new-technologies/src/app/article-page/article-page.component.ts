import {Component, OnInit} from '@angular/core';
import {CategoriesComponent} from '../categories/categories.component'
import {ArticleService} from "../integration/services/article.service";
import {Data} from "../integration/models/data";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
  providers: [ArticleService]
})
export class ArticlePageComponent implements OnInit {

  data: Data=null;
  id: string;
  url='';

  constructor(private httpService: ArticleService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    var text='';
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    /*this.httpService.getTextFromUrl('https://allafrica.com/stories/202012040063')
      .subscribe((result) => text=result.replace(/<[^>]+>/g, ''))*/
    //var htmlString= "<div><h1>Hello World</h1>\n<p>It's me, Mario</p></div>";
    //var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
    //console.log(this.data.title);
  }

}

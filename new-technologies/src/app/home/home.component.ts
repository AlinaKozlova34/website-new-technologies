import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { Data } from '../integration/models/data';
import { ArticleService } from '../integration/service/article.service';
import { LocalStorage } from '../local-storage';
import { interval, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService],
})
export class HomeComponent implements OnInit {
  tmpData: Data[];
  freshData: Data[];
  query: string;
  isModalWindowShown: boolean;
  modalWindowArticle: Data;
  categoryData: Data[];
  subscription: Subscription;
  currentCategory = 'all';
  @ViewChild(CategoriesComponent) viewChild: CategoriesComponent;
  storage: LocalStorage;
  date: Date;
  updateDate: string;

  constructor(private httpService: ArticleService, private datePipe: DatePipe) {
    this.isModalWindowShown = false;
    this.modalWindowArticle = null;
    this.storage = new LocalStorage();
    this.date = new Date();
    this.subscription = interval(600000 * 6).subscribe(() => this.updateNews());
  }

  ngOnInit(): void {
    this.freshData = JSON.parse(this.storage.getItem('articles'));
    if (this.freshData == null || this.freshData.length == 0) {
      this.updateNews();
    } else {
      this.filterCategory(this.currentCategory);
    }
    this.updateNews();
  }

  updateNews(): void {
    this.updateDate = this.datePipe.transform(this.date, 'hh:mm dd-MM-yyyy');
    console.log("Updating news");
    this.httpService
      .getPreviewInformation(true)
      .pipe(first())
      .subscribe((value) => {
        this.storage.setItem('articles', JSON.stringify(value));
        this.freshData = value;
        this.filterCategory(this.currentCategory);
      });
  }

  dataChangeHandler(data): void {
    console.log(data);
    this.currentCategory = data;
    this.filterCategory(data);
  }

  applySearch(): void {
    const keywords: string[] = this.query.split(/\s+/);
    keywords.forEach(function (keyword) {
      this.categoryData = this.categoryData.filter((res) => {
        return res.title.toLocaleLowerCase().match(keyword.toLocaleLowerCase());
      });
    }, this);
  }

  removeQuery(): void {
    this.query = '';
    this.categoryData = this.tmpData;
  }

  onCardClick(result): void {
    this.modalWindowArticle = result;
    this.isModalWindowShown = true;
  }

  closeModalWindoq(): void {
    console.log('closeModal');
    this.isModalWindowShown = false;
  }

  filterCategory(category): void {
    if (category === 'all') {
      this.categoryData = this.freshData;
    } else {
      this.categoryData = this.freshData.filter((article: Data) => {
        return article.category === category;
      });
    }
    this.tmpData = this.categoryData;
  }
}

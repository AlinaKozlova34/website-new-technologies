import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {CategoriesComponent} from '../categories/categories.component';
import {ModalNewsComponent} from '../modal-news/modal-news.component';
import {Data} from '../integration/models/data';
import {ArticleService} from '../integration/services/article.service';

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
  isModalShown: boolean; //todo переименовать
  modalArticle: Data;
  categoryData: Data[];

  currentCategory = 'all';
  @ViewChild(CategoriesComponent) viewChild: CategoriesComponent;

  constructor(private httpService: ArticleService) {
    this.isModalShown = false;
    this.modalArticle = null;
  }

  ngOnInit(): void {
    this.httpService.getPreviewInformation(true).subscribe((value) => {
      this.freshData = value;
      this.filterCategory(this.currentCategory);

    });
    this.httpService.previewInformationObserver.subscribe((value) => {
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
    const str: string[] = this.query.split(/\s+/);
    for (let i = 0; i < str.length; i++) { //todo forEach
      this.categoryData = this.categoryData.filter((res) => {
        return res.title.toLocaleLowerCase().match(str[i].toLocaleLowerCase());
      });
    }
  }

  removeQuery(): void {
    this.query = '';
    this.categoryData = this.tmpData;
  }

  onCardClick(result): void {
    this.modalArticle = result;
    this.isModalShown = true;
  }

  closeModal(): void {
    console.log('closeModal');
    this.isModalShown = false;
  }

  filterCategory(category): void {
    if (category === 'all') {
      this.categoryData = this.freshData;
    } else {
      this.categoryData = this.freshData.filter((article:Data) => {
        return (article.category === category)
      });
      this.tmpData = this.categoryData;
    }
  }
}

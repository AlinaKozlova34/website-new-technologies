import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Data } from '../models/data'
import {forkJoin, Subject} from 'rxjs'
import { Observable } from 'rxjs'
import { map} from "rxjs/operators";
import {NewsCatcherData} from '../models/newscatcherdata';
import {MediastackData} from '../models/mediastackdata';
import {DatePipe} from "@angular/common";
import { UUID } from 'angular2-uuid';
import { NewsApiData } from '../models/newsapidata'

@Injectable()
export class ArticleService {

  date: Date;
  currentDate: string;

  private mediastackUrl = 'http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&limit=100&languages=en';
  private newsCatcherUrl ='https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en';
  private newsApiUrl='https://newsapi.org/v2/top-headlines?apiKey=7bd7a25addaa402e917380e409830d22';

  previewInformationObserver: Subject<Data[]> = new Subject<Data[]>();

  private _previewInformation: Data[];

  get previewInformation(): Data[]{
    return this._previewInformation;
  }

  set previewInformation(value: Data[]){
    this._previewInformation = value;
    this.previewInformationObserver.next(value);
  }

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.date = new Date();
    this.currentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  getMediastackData(url: string, isFresh: boolean = false, category: string): Observable<Data[]>{
    let params = new HttpParams();
    if (isFresh) {
      params = params.set('date', `${this.currentDate}`);
    }
    return this.http.get<MediastackData[]>(url, {params: params})
      .pipe(map(res => {
        let mdata: MediastackData[] = res['data'];
        return mdata.map(function(data:any) {
          return {
            id: UUID.UUID(),
            author: data.author,
            title: data.title,
            description: data.description,
            url: data.url,
            source: data.source,
            image: data.image,
            category: category,
            publicationDate: data.published_at
          }
        });
      }));
  }

  getNewsCatcherData(url: string, isFresh: boolean = false, category: string): Observable<Data[]>{
    let params = new HttpParams();
    if(isFresh) {
      params = params.append('from', `${this.currentDate}`);
      params = params.append('to', `${this.currentDate}`);
    }
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'newscatcher.p.rapidapi.com')
      .set('x-rapidapi-key', 'f7d3f8d7aemshde00e16303ecfbdp1f4520jsna7f2ed5a3ac1');
    return this.http.get<NewsCatcherData[]>(url, {params: params, headers: headers})
      .pipe(map(res => {
        const ncdata: NewsCatcherData[] = res['articles'];
        return ncdata.map(function(data: NewsCatcherData) {
          return {
            id: UUID.UUID(),
            author: data.author,
            title: data.title,
            description: data.summary,
            url: data.link,
            source: data.clean_url,
            image: data.media,
            category: category,
            publicationDate: data.published_date
          }
        });
      }));
  }

  getNewsApiData(url): Observable<any>{
    return this.http.get(url).pipe(map(result => {
      const parsedResult: NewsApiData[] = result['articles']
      return parsedResult.map( (data:NewsApiData) => {
        return {
          id: UUID.UUID(),
          author: data.author,
          title: data.title,
          description: data.description,
          url: data.url,
          source: data.source.name,
          image: data.ulrToImage,
          category: 'medicine',
          publicationDate: data.publishedAt
        }
      });
    }));
  }

  getTextFromUrl(url: string): Observable<string>{
    return this.http.get<string>(url);
  }

  getPreviewInformation(isFresh: boolean = false): Observable<Data[]>{
    return forkJoin([
      //this.getMediastackData('assets/mediastack.json',false, ''),
      //this.getNewsCatcherData('assets/newscatcher.json',false, ''),
      //this.getNewsApiData('assets/newsapi.json'),
      this.getNewsApiData(`${this.newsApiUrl}&category=health`),
      this.getMediastackData(`${this.mediastackUrl}&categories=science&keywords=space`, isFresh, 'space'),
      this.getMediastackData(`${this.mediastackUrl}&categories=science&keywords=medicine`, isFresh, 'medicine'),
      this.getMediastackData(`${this.mediastackUrl}&categories=technology`, isFresh, 'technology'),
      this.getMediastackData(`${this.mediastackUrl}&categories=entertainment`, isFresh, 'entertainment'),
      this.getMediastackData(`${this.mediastackUrl}&keywords=programming`, isFresh, 'programming'),
      this.getMediastackData(`${this.mediastackUrl}&categories=technology&keywords=robot`, isFresh, 'robotics'),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=science`, isFresh, 'science'),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=robot`, isFresh, 'robotics'),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=space`, isFresh, 'space'),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=technology`, isFresh, 'technology')
    ]).pipe(
      map(results => results.reduce((all, itm) => all.concat(itm), []))
    )
  }
}

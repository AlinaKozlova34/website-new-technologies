import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Data } from '../models/data'
import {forkJoin, Subject} from 'rxjs'
import { Observable } from 'rxjs'
import { map} from "rxjs/operators";
import {NewsCatcherData} from "../models/newscatcherdata";
import {MediastackData} from "../models/mediastackdata";
import {DatePipe} from "@angular/common";

@Injectable()
export class HttpService{

  date = new Date()
  currentDate: string

  private mediastackUrl: string="http://api.mediastack.com/v1/news?access_key=&limit=100&languages=en"
  private newsCatcherUrl: string="https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en"

  static previewInformationObserver: Subject<Data[]>=new Subject<Data[]>()

  private _previewInformation: Data[];

  get previewInformation(): Data[]{
    return this._previewInformation;
  }

  set previewInformation(value: Data[]){
    this._previewInformation=value;
    HttpService.previewInformationObserver.next(value)
  }

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  getMediastackData(url: string, isFresh: boolean = false): Observable<Data[]>{
    let params=new HttpParams()
    if(isFresh) {
      params = params.set('date', `${this.currentDate}`)
    }
    return this.http.get<MediastackData[]>(url, {params:params})
      .pipe(map(res => {
      let mdata: MediastackData[] = res["data"];
      return mdata.map(function(data:any) {
        return {
          author: data.author,
          title: data.title,
          description: data.description,
          url: data.url,
          source: data.source,
          image: data.image,
          category: data.category,
          publicationDate: data.published_at
        };
      })
    }))
  }

  getNewsCatcherData(url: string, isFresh: boolean = false): Observable<Data[]>{
    let params=new HttpParams()
    if(isFresh) {
      params = params.append('from', `${this.currentDate}`)
      params = params.append('to', `${this.currentDate}`)
    }
    const headers = new HttpHeaders()
      .set("x-rapidapi-host", "newscatcher.p.rapidapi.com")
      .set("x-rapidapi-key", "");
    return this.http.get<NewsCatcherData[]>(url, {params:params, headers: headers})
      .pipe(map(res => {
        let ncdata: NewsCatcherData[] = res["articles"];
        return ncdata.map(function(data:NewsCatcherData) {
          return {
            author: data.author,
            title: data.title,
            description: data.summary,
            url: data.link,
            source: data.clean_url,
            image: data.media,
            category: data.topic,
            publicationDate: data.published_date
          };
        })
      }))
  }

  getPreviewInformation(isFresh: boolean = false): Observable<Data[]>{
    return forkJoin([
      //this.getMediastackData('assets/mediastack.json'),
      //this.getNewsCatcherData('assets/newscatcher.json'),
      this.getMediastackData(`${this.mediastackUrl}&categories=science&keywords=space`, isFresh),
      this.getMediastackData(`${this.mediastackUrl}&categories=science&keywords=medicine`, isFresh),
      this.getMediastackData(`${this.mediastackUrl}&categories=technology`, isFresh),
      this.getMediastackData(`${this.mediastackUrl}&categories=entertainment`, isFresh),
      this.getMediastackData(`${this.mediastackUrl}&keywords=programming`, isFresh),
      this.getMediastackData(`${this.mediastackUrl}&categories=technology&keywords=robot`, isFresh),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=science`, isFresh),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=robot`, isFresh),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=space`, isFresh),
      this.getNewsCatcherData(`${this.newsCatcherUrl}&q=technology`, isFresh)
    ]).pipe(
      map(results => results.reduce((all, itm) => all.concat(itm), []))
    )
  }
}

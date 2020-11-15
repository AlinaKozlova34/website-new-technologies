import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Data } from '../models/data'
import { forkJoin } from 'rxjs'
import { Observable } from 'rxjs'
import { map} from "rxjs/operators";

@Injectable()
export class HttpService{

  private _previewInformation: Data[];

  get previewInformation(): Data[]{
    return this._previewInformation;
  }

  set previewInformation(value: Data[]){
    this._previewInformation=value;
  }

  constructor(private http: HttpClient) {}

  getMediastackData(url: string): Observable<Data[]>{
    return this.http.get(url)
      .pipe(map(res => {
      let mdata = res["data"];
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

  getNewsCatcherData(url: string): Observable<Data[]>{
    const headers = new HttpHeaders()
      .set("x-rapidapi-host", "newscatcher.p.rapidapi.com")
      .set("x-rapidapi-key", "f7d3f8d7aemshde00e16303ecfbdp1f4520jsna7f2ed5a3ac1");
    return this.http.get(url, {headers: headers})
      .pipe(map(res => {
        let ncdata = res["articles"];
        return ncdata.map(function(data:any) {
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

  getPreviewInformation(): Observable<Data[]>{
    return forkJoin([
      this.getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&limit=10&keywords=space"),
      this.getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&limit=10&keywords=medicine"),
      this.getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=technology&languages=en&limit=10"),
      this.getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=entertainment&languages=en&date=2020-02-19&limit=10"),
      this.getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=technology&languages=en&date=2020-02-19&limit=10&keywords=programming"),
      this.getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=technology&languages=en&date=2020-02-19&limit=10&keywords=robot"),
      this.getNewsCatcherData("https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=science"),
      this.getNewsCatcherData("https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=robot"),
      this.getNewsCatcherData("https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=space"),
      this.getNewsCatcherData("https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=technology")
    ]).pipe(
      map(results => results.reduce((all, itm) => all.concat(itm), []))
    )
  }
}

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MediastackData } from '../models/mediastackdata'
import { forkJoin } from 'rxjs'
import { Observable } from 'rxjs'

@Injectable()
export class HttpService{

  private _information: MediastackData[];

  get information(): MediastackData[]{
    return this._information;
  }

  set information(value: MediastackData[]){
    this._information=value;
  }


  constructor(private http: HttpClient) {}

  getMediastackData(url: string){
    return this.http.get(url)
  }

  getNewsCatcherData(url: string){
    return this.http.get(url)
  }

  getPreviewInformation(): Observable<MediastackData[]>{
    return this.http.get<MediastackData[]>("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&date=2020-02-19&limit=10&keywords=space")
    /*return forkJoin([
      this.http.get("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&date=2020-02-19&limit=10&keywords=space"),
      this.http.get("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&date=2020-02-19&limit=10&keywords=medicine")
    ])*/
    //to array MediastackData[]
  }
}

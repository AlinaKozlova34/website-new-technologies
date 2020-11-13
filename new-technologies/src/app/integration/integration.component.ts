import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpService } from './services/http.service'
import { MediastackData } from './models/mediastackdata'
import { NewsCatcherData } from './models/newscatcherdata'
import { Data } from './models/data'

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css'],
    providers: [ HttpService]
})
export class IntegrationComponent implements OnInit {

  msdata: MediastackData[]
  ncdata: NewsCatcherData[]
  data: Data

  constructor(private httpService: HttpService) {}

  ngOnInit(){
      this.httpService
            .getMediastackData("http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&date=2020-02-19&limit=3&keywords=Discovered 5-Million-Year-Old")
            .subscribe((result) => { (this.msdata = result["data"])
            })


      this.httpService
            .getNewsCatcherData("https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=Technology City Chengdu")
            .subscribe((result) =>
              {this.ncdata = result["articles"]}
            )
  }
}


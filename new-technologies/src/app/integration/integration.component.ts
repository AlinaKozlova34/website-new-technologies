import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service'
import { Data } from './models/data'

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css'],
    providers: [ HttpService]
})
export class IntegrationComponent implements OnInit {

  data: Data[]
  data2: Data[]
  all_data: Data[]

  constructor(private httpService: HttpService) {}

  ngOnInit(){
    this.httpService
      .getMediastackData('assets/mediastack.json'/*"http://api.mediastack.com/v1/news?access_key=030d3dc822b864c37f82b73d296f1b3e&categories=science&languages=en&date=2020-02-19&limit=3&keywords=Discovered 5-Million-Year-Old"*/)
      .subscribe((result) => { this.data = result })


    this.httpService
      .getNewsCatcherData('assets/newscatcher.json'/*"https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=Technology City Chengdu"*/)
      .subscribe((result) => { this.data2 = result })

    this.httpService
      .getPreviewInformation()
      .subscribe((result) => { this.all_data = result })

  }
}


import {Component, OnInit} from '@angular/core';
import {Data} from "../integration/models/data";
import {HttpService} from "../integration/services/http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ HttpService]
})
export class HomeComponent implements OnInit {

  tmpData: Data[]
  freshData: Data[]
  query: string
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getPreviewInformation(true).subscribe(value => {this.freshData=value})
    HttpService.previewInformationObserver.subscribe(value => {
      this.freshData=value
      this.tmpData=value
    })
  }

  applySearch(): void{
    let str: string[] = this.query.split(/\s+/)
    for(let i =0; i<str.length; i++) {
      this.freshData = this.freshData.filter(res => {
        return res.title.toLocaleLowerCase().match(str[i].toLocaleLowerCase())
      })
    }
  }
  removeQuery(): void{
    this.query=""
    this.freshData=this.tmpData
  }

}

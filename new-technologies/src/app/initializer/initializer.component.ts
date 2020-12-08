import { Component, OnInit } from '@angular/core';
import { HttpService } from '../integration/services/http.service'
import {Interceptor} from "../interceptor/interceptor";

@Component({
  selector: 'app-initializer',
  templateUrl: './initializer.component.html',
  styleUrls: ['./initializer.component.css'],
  providers: [ HttpService, Interceptor]
})
export class InitializerComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getPreviewInformation().subscribe(info => {
      this.httpService.previewInformation = info;
    });
  }

}


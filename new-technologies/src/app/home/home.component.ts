import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from'../category/category.component'
import { ModalNewsComponent } from '../modal-news/modal-news.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items= ["awfs","dfdsf","dfjhnskhbfv", "gfdgdfg", "adsasd","sadaf"];

  constructor() { }

  ngOnInit(): void {
  }

}

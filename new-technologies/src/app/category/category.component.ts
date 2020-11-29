import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: string[] = ['all', 'science', 'entertainment', 'medicine', 'robotics', 'programming', 'space']

  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event: MatTabChangeEvent) : void {
    let clickedIndex = $event.index
    console.log("new category ", this.categories[clickedIndex])
    this.dataChanged.emit(this.categories[clickedIndex])
  }

}
